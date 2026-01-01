import React, { useEffect, useRef } from "react";

type StarLayer = "far" | "mid" | "near";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  twinkleAmplitude: number;
  color: string;
  glow: number;
  layer: StarLayer;
  featured: boolean;
};

type ShootingStar = {
  active: boolean;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  speed: number;
  duration: number;
  elapsed: number;
  tail: number;
};

type HeroStarfieldCanvasProps = {
  containerRef: React.RefObject<HTMLElement | null>;
};

const SEED = "casper-starfield";
const SHOOTING_SPEED_FACTOR = 0.5;

const createSeededRandom = (seed: string) => {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    const t = (h ^= h >>> 16) >>> 0;
    return t / 4294967296;
  };
};

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

export const HeroStarfieldCanvas: React.FC<HeroStarfieldCanvasProps> = ({
  containerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const featuredRef = useRef<number[]>([]);
  const featuredNeighborsRef = useRef<Map<number, number[]>>(new Map());
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef({ index: -1, fade: 0 });
  const shootingStarRef = useRef<ShootingStar>({
    active: false,
    startX: 0,
    startY: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    duration: 0,
    elapsed: 0,
    tail: 0,
  });
  const nextShootingTimeRef = useRef<number>(0);
  const shootingStartTimeRef = useRef<number>(0);
  const shootingBurstCountRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const reduceMotionRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const scheduleNextShootingStar = (now: number) => {
      if (reduceMotionRef.current) {
        nextShootingTimeRef.current = Number.POSITIVE_INFINITY;
        return;
      }
      if (!shootingStartTimeRef.current) {
        shootingStartTimeRef.current = now;
      }
      const elapsed = now - shootingStartTimeRef.current;
      const isEarly = elapsed < 12000;
      const minDelay = isEarly ? 900 : 16000;
      const maxDelay = isEarly ? 2600 : 38000;
      const random = createSeededRandom(
        `${SEED}-shooting-${Math.floor(now)}`
      );
      let delay = lerp(minDelay, maxDelay, random());
      if (isEarly && shootingBurstCountRef.current < 2) {
        delay = lerp(400, 1200, random());
        shootingBurstCountRef.current += 1;
      }
      nextShootingTimeRef.current = now + delay;
    };

    const buildStars = () => {
      const { width, height } = sizeRef.current;
      const area = width * height;
      const random = createSeededRandom(`${SEED}-${width}x${height}`);

      const farCount = Math.floor(area * 0.00018);
      const midCount = Math.floor(area * 0.000085);
      const nearCount = Math.floor(area * 0.000035);

      const palette = [
        "rgba(255, 255, 255, 1)",
        "rgba(248, 248, 186, 1)",
        "rgba(255, 255, 210, 1)",
      ];

      const twinkleScale = reduceMotionRef.current ? 0.04 : 0.18;

      const createStars = (
        count: number,
        layer: StarLayer,
        radiusRange: [number, number],
        alphaRange: [number, number],
        glowRange: [number, number],
        featuredChance: number
      ) => {
        return Array.from({ length: count }, () => {
          const radius = lerp(radiusRange[0], radiusRange[1], random());
          const alpha = lerp(alphaRange[0], alphaRange[1], random());
          const twinkleSpeed = lerp(0.6, 1.4, random());
          const twinklePhase = random() * Math.PI * 2;
          const color = palette[Math.floor(random() * palette.length)];
          const glow = lerp(glowRange[0], glowRange[1], random());
          const featured =
            !reduceMotionRef.current && random() < featuredChance;

          return {
            x: random(),
            y: random(),
            radius,
            alpha,
            twinkleSpeed,
            twinklePhase,
            twinkleAmplitude: twinkleScale,
            color,
            glow,
            layer,
            featured,
          };
        });
      };

      const farStars = createStars(
        farCount,
        "far",
        [0.4, 1.1],
        [0.2, 0.55],
        [0, 0],
        0
      );
      const midStars = createStars(
        midCount,
        "mid",
        [0.9, 1.8],
        [0.4, 0.7],
        [0, 2],
        0.14
      );
      const nearStars = createStars(
        nearCount,
        "near",
        [1.4, 2.8],
        [0.55, 0.9],
        [4, 12],
        0.32
      );

      const stars = [...farStars, ...midStars, ...nearStars];
      starsRef.current = stars;

      const featuredIndices = stars
        .map((star, index) => (star.featured ? index : -1))
        .filter((index) => index !== -1);
      featuredRef.current = featuredIndices;

      const neighbors = new Map<number, number[]>();
      featuredIndices.forEach((index) => {
        const star = stars[index];
        const distances = featuredIndices
          .filter((other) => other !== index)
          .map((other) => {
            const otherStar = stars[other];
            const dx = (star.x - otherStar.x) * width;
            const dy = (star.y - otherStar.y) * height;
            return { index: other, dist: Math.hypot(dx, dy) };
          })
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3)
          .map(({ index: neighborIndex }) => neighborIndex);
        neighbors.set(index, distances);
      });
      featuredNeighborsRef.current = neighbors;
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reduceMotionRef.current = mediaQuery.matches;
      buildStars();
      scheduleNextShootingStar(performance.now());
    };
    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointerRef.current = { x: width * 0.5, y: height * 0.5 };
      buildStars();
    };

    resize();
    scheduleNextShootingStar(performance.now());

    const handlePointerMove = (event: PointerEvent) => {
      const { width, height } = sizeRef.current;
      const normalizedX = event.clientX / width - 0.5;
      const normalizedY = event.clientY / height - 0.5;
      pointerTargetRef.current = {
        x: normalizedX,
        y: normalizedY,
      };
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerLeave = () => {
      pointerTargetRef.current = { x: 0, y: 0 };
      pointerRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    const observerTarget = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTime = performance.now();
          animate(lastTime);
        } else if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget) {
      observer.observe(observerTarget);
    }

    let lastTime = performance.now();

    const drawStar = (
      star: Star,
      offsetX: number,
      offsetY: number,
      time: number
    ) => {
      const { width, height } = sizeRef.current;
      const x = star.x * width + offsetX;
      const y = star.y * height + offsetY;
      if (x < -50 || x > width + 50 || y < -50 || y > height + 50) {
        return;
      }

      const twinkle =
        Math.sin(time * star.twinkleSpeed + star.twinklePhase) *
        star.twinkleAmplitude;
      const alpha = star.alpha * (1 + twinkle);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      if (star.glow > 0) {
        ctx.shadowBlur = star.glow;
        ctx.shadowColor = star.color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnections = (offsets: Record<StarLayer, [number, number]>) => {
      if (reduceMotionRef.current) {
        hoverRef.current.index = -1;
        hoverRef.current.fade = 0;
        return;
      }

      const { width, height } = sizeRef.current;
      const pointer = pointerRef.current;
      const hoverRadius = 180;

      let closestIndex = -1;
      let closestDistance = Infinity;

      featuredRef.current.forEach((index) => {
        const star = starsRef.current[index];
        const [offsetX, offsetY] = offsets[star.layer];
        const x = star.x * width + offsetX;
        const y = star.y * height + offsetY;
        const distance = Math.hypot(pointer.x - x, pointer.y - y);
        if (distance < hoverRadius && distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      const hoverTarget = closestIndex;
      const hover = hoverRef.current;
      hover.index = hoverTarget;
      hover.fade = lerp(hover.fade, hoverTarget === -1 ? 0 : 1, 0.04);
      const connectionFade = hover.fade * hover.fade;

      if (hover.index === -1 || hover.fade < 0.05) {
        return;
      }

      const star = starsRef.current[hover.index];
      const [offsetX, offsetY] = offsets[star.layer];
      const baseX = star.x * width + offsetX;
      const baseY = star.y * height + offsetY;

      const neighbors =
        featuredNeighborsRef.current.get(hover.index) ?? [];
      ctx.save();
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
      neighbors.forEach((neighborIndex) => {
        const neighbor = starsRef.current[neighborIndex];
        const [neighborOffsetX, neighborOffsetY] = offsets[neighbor.layer];
        const nx = neighbor.x * width + neighborOffsetX;
        const ny = neighbor.y * height + neighborOffsetY;
        const distance = Math.hypot(baseX - nx, baseY - ny);
        const intensity = Math.max(0, 1 - distance / 260) * connectionFade;
        if (intensity <= 0) {
          return;
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * intensity})`;
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.9 * intensity;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = 14 + 16 * intensity;
        ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.save();
      ctx.globalAlpha = connectionFade;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.arc(baseX, baseY, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.restore();
    };

    const drawShootingStar = (delta: number) => {
      if (reduceMotionRef.current) {
        return;
      }
      const now = performance.now();
      const shootingStar = shootingStarRef.current;

      if (!shootingStar.active && now >= nextShootingTimeRef.current) {
        const { width, height } = sizeRef.current;
        const random = createSeededRandom(`${SEED}-shoot-${now}`);
        const startX = lerp(width * 0.1, width * 0.9, random());
        const startY = lerp(height * 0.1, height * 0.45, random());
        const angle = lerp(Math.PI * 0.15, Math.PI * 0.35, random());
        const speed = lerp(600, 900, random()) * SHOOTING_SPEED_FACTOR;
        const duration = lerp(0.7, 1.2, random()) / SHOOTING_SPEED_FACTOR;
        shootingStarRef.current = {
          active: true,
          startX,
          startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          speed,
          duration,
          elapsed: 0,
          tail: lerp(180, 280, random()),
        };
        scheduleNextShootingStar(now);
      }

      if (!shootingStar.active) {
        return;
      }

      shootingStar.elapsed += delta;
      const progress = shootingStar.elapsed / shootingStar.duration;
      if (progress >= 1) {
        shootingStar.active = false;
        return;
      }

      const fadeIn = Math.min(progress / 0.15, 1);
      const fadeOut = Math.min((1 - progress) / 0.2, 1);
      const visibility = Math.min(fadeIn, fadeOut);

      const currentX =
        shootingStar.startX + shootingStar.vx * shootingStar.elapsed;
      const currentY =
        shootingStar.startY + shootingStar.vy * shootingStar.elapsed;
      const directionX = shootingStar.vx / shootingStar.speed;
      const directionY = shootingStar.vy / shootingStar.speed;
      const tailX = currentX - directionX * shootingStar.tail;
      const tailY = currentY - directionY * shootingStar.tail;

      const gradient = ctx.createLinearGradient(
        tailX,
        tailY,
        currentX,
        currentY
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(
        0.6,
        `rgba(255, 255, 255, ${0.4 * visibility})`
      );
      gradient.addColorStop(
        1,
        `rgba(255, 255, 255, ${0.8 * visibility})`
      );

      ctx.save();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 * visibility;
      ctx.lineCap = "round";
      ctx.shadowBlur = 8 * visibility;
      ctx.shadowColor = `rgba(255, 255, 255, ${0.6 * visibility})`;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      ctx.restore();
    };

    const animate = (time: number) => {
      if (!isVisibleRef.current) {
        return;
      }

      const delta = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      const target = pointerTargetRef.current;
      if (reduceMotionRef.current) {
        parallaxRef.current = { x: 0, y: 0 };
      } else {
        parallaxRef.current = {
          x: lerp(parallaxRef.current.x, target.x, 0.08),
          y: lerp(parallaxRef.current.y, target.y, 0.08),
        };
      }

      const parallaxX = parallaxRef.current.x;
      const parallaxY = parallaxRef.current.y;

      const offsets: Record<StarLayer, [number, number]> = {
        far: [parallaxX * 4, parallaxY * 4],
        mid: [parallaxX * 8, parallaxY * 8],
        near: [parallaxX * 14, parallaxY * 14],
      };

      starsRef.current.forEach((star) => {
        const [offsetX, offsetY] = offsets[star.layer];
        drawStar(star, offsetX, offsetY, time / 1000);
      });

      drawConnections(offsets);
      drawShootingStar(delta);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", updateReducedMotion);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
