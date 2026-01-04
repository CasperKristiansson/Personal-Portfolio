import { clsx } from "clsx";
import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  type FC,
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type HeroVariant = "hero" | "card";

type PythonVersionPatchPrHeroProps = {
  variant?: HeroVariant;
  className?: string;
  interactive?: boolean;
};

type Rgb = { r: number; g: number; b: number };

type Palette = {
  gradient: string;
  panelBg: string;
  panelBorder: string;
  panelGlow: string;
  panelShadow: string;
  textPrimary: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  accentSoft: string;
  highlightBg: string;
  highlightBorder: string;
  scanBar: string;
  scanGlow: string;
  diffAddBg: string;
  diffAddText: string;
  diffRemoveBg: string;
  diffRemoveText: string;
  diffBorder: string;
  chipBg: string;
  chipText: string;
  chipBorder: string;
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  captionText: string;
};

type PinConfig = {
  id: string;
  label: string;
  oldValue: string;
  newValue: string;
};

type PinState = PinConfig & {
  highlightOpacity: MotionValue<number>;
  labelOpacity: MotionValue<number>;
  updateOpacity: MotionValue<number>;
};

const PIN_DEFS: PinConfig[] = [
  {
    id: "dockerfile",
    label: "Dockerfile",
    oldValue: "3.12.1-slim",
    newValue: "3.12.2-slim",
  },
  {
    id: "workflow",
    label: "workflow",
    oldValue: '"3.12.1"',
    newValue: '"3.12.2"',
  },
  {
    id: "pyproject",
    label: "pyproject",
    oldValue: "3.12.1",
    newValue: "3.12.2",
  },
  {
    id: "python-version",
    label: ".python-version",
    oldValue: "3.12.1",
    newValue: "3.12.2",
  },
  {
    id: "runtime",
    label: "runtime",
    oldValue: "3.12.1",
    newValue: "3.12.2",
  },
];

const clamp = (value: number, min = -1, max = 1) =>
  Math.min(max, Math.max(min, value));

const parseColor = (value: string): Rgb | null => {
  if (!value || value === "transparent") {
    return null;
  }
  if (value.startsWith("#")) {
    const hex = value.replace("#", "").trim();
    if (hex.length === 3) {
      const [rChar, gChar, bChar] = hex;
      if (!rChar || !gChar || !bChar) {
        return null;
      }
      const r = parseInt(rChar + rChar, 16);
      const g = parseInt(gChar + gChar, 16);
      const b = parseInt(bChar + bChar, 16);
      return { r, g, b };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    return null;
  }
  const [, values] = match;
  if (!values) {
    return null;
  }
  const parts = values
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((part) => Number.isFinite(part));
  if (parts.length < 3) {
    return null;
  }
  const [r, g, b] = parts;
  if (r === undefined || g === undefined || b === undefined) {
    return null;
  }
  return { r, g, b };
};

const mix = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const toRgba = (rgb: Rgb, alpha = 1) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

const pickCss = (
  style: CSSStyleDeclaration,
  names: string[],
  fallback: string,
) => {
  for (const name of names) {
    const value = style.getPropertyValue(name).trim();
    if (value) {
      return value;
    }
  }
  return fallback;
};

const derivePalette = (element: HTMLElement | null): Palette => {
  if (!element || typeof window === "undefined") {
    const fallback = { r: 14, g: 20, b: 38 };
    const fallbackText = { r: 226, g: 232, b: 240 };
    const fallbackAccent = { r: 56, g: 189, b: 248 };
    return {
      gradient: `linear-gradient(140deg, ${toRgba(
        fallback,
        0.96,
      )} 0%, ${toRgba(mix(fallback, fallbackAccent, 0.2), 0.9)} 45%, ${toRgba(
        fallback,
        0.98,
      )} 100%), radial-gradient(120% 120% at 20% 20%, ${toRgba(
        fallbackAccent,
        0.2,
      )} 0%, transparent 55%), radial-gradient(90% 90% at 80% 30%, ${toRgba(
        mix(fallbackAccent, fallbackText, 0.2),
        0.16,
      )} 0%, transparent 60%)`,
      panelBg: toRgba(mix(fallback, fallbackText, 0.06), 0.92),
      panelBorder: toRgba(mix(fallbackText, fallback, 0.2), 0.4),
      panelGlow: toRgba(mix(fallbackText, fallbackAccent, 0.35), 0.18),
      panelShadow: toRgba(mix(fallback, fallbackAccent, 0.2), 0.5),
      textPrimary: toRgba(fallbackText, 0.92),
      textMuted: toRgba(mix(fallbackText, fallback, 0.35), 0.8),
      textSubtle: toRgba(mix(fallbackText, fallback, 0.45), 0.7),
      accent: toRgba(fallbackAccent, 0.95),
      accentSoft: toRgba(fallbackAccent, 0.2),
      highlightBg: toRgba(mix(fallbackAccent, fallbackText, 0.2), 0.22),
      highlightBorder: toRgba(mix(fallbackAccent, fallbackText, 0.1), 0.6),
      scanBar: `linear-gradient(180deg, transparent 0%, ${toRgba(
        fallbackAccent,
        0.75,
      )} 40%, ${toRgba(fallbackAccent, 0.1)} 65%, transparent 100%)`,
      scanGlow: toRgba(fallbackAccent, 0.35),
      diffAddBg: toRgba(mix(fallbackAccent, fallback, 0.2), 0.2),
      diffAddText: toRgba(fallbackAccent, 0.9),
      diffRemoveBg: toRgba(mix(fallbackText, fallback, 0.2), 0.18),
      diffRemoveText: toRgba(mix(fallbackText, fallback, 0.1), 0.85),
      diffBorder: toRgba(mix(fallbackText, fallback, 0.25), 0.3),
      chipBg: toRgba(mix(fallback, fallbackText, 0.08), 0.4),
      chipText: toRgba(fallbackText, 0.88),
      chipBorder: toRgba(mix(fallbackText, fallback, 0.2), 0.35),
      tooltipBg: toRgba(mix(fallback, fallbackText, 0.08), 0.9),
      tooltipText: toRgba(fallbackText, 0.9),
      tooltipBorder: toRgba(mix(fallbackText, fallback, 0.2), 0.35),
      cardBg: toRgba(mix(fallback, fallbackText, 0.08), 0.92),
      cardBorder: toRgba(mix(fallbackText, fallback, 0.2), 0.35),
      cardShadow: toRgba(mix(fallback, fallbackAccent, 0.2), 0.45),
      captionText: toRgba(mix(fallbackText, fallback, 0.4), 0.85),
    };
  }

  const computed = getComputedStyle(element);
  const bodyStyle = getComputedStyle(document.body);

  const backgroundValue = pickCss(
    computed,
    [
      "--background",
      "--color-background",
      "--color-background-soft",
      "--color-background-highlight",
    ],
    computed.backgroundColor || bodyStyle.backgroundColor,
  );
  const foregroundValue = pickCss(
    computed,
    ["--foreground", "--color-text", "--color-text-muted"],
    computed.color || bodyStyle.color,
  );
  const mutedValue = pickCss(
    computed,
    ["--muted", "--color-text-muted", "--color-text-subtle"],
    foregroundValue,
  );
  const accentValue = pickCss(
    computed,
    [
      "--accent",
      "--primary",
      "--color-primary",
      "--color-primary-light",
    ],
    foregroundValue,
  );

  const background =
    parseColor(backgroundValue) ??
    parseColor(bodyStyle.backgroundColor) ?? { r: 14, g: 20, b: 38 };
  const foreground =
    parseColor(foregroundValue) ??
    parseColor(bodyStyle.color) ?? { r: 226, g: 232, b: 240 };
  const muted = parseColor(mutedValue) ?? mix(foreground, background, 0.45);
  const accent = parseColor(accentValue) ?? mix(foreground, background, 0.2);

  const panelSurface = mix(background, foreground, 0.06);
  const panelGlow = mix(foreground, accent, 0.35);
  const accentSoft = toRgba(accent, 0.2);
  const highlight = mix(accent, foreground, 0.2);
  const diffRemoveBase = mix(foreground, background, 0.2);

  return {
    gradient: `linear-gradient(140deg, ${toRgba(
      background,
      0.96,
    )} 0%, ${toRgba(mix(background, accent, 0.18), 0.9)} 45%, ${toRgba(
      mix(background, foreground, 0.04),
      0.98,
    )} 100%), radial-gradient(120% 120% at 20% 20%, ${toRgba(
      accent,
      0.22,
    )} 0%, transparent 55%), radial-gradient(90% 90% at 80% 30%, ${toRgba(
      mix(accent, foreground, 0.25),
      0.16,
    )} 0%, transparent 60%)`,
    panelBg: toRgba(panelSurface, 0.92),
    panelBorder: toRgba(mix(foreground, background, 0.2), 0.4),
    panelGlow: toRgba(panelGlow, 0.18),
    panelShadow: toRgba(mix(background, accent, 0.2), 0.45),
    textPrimary: toRgba(foreground, 0.92),
    textMuted: toRgba(mix(muted, foreground, 0.2), 0.8),
    textSubtle: toRgba(mix(muted, foreground, 0.1), 0.7),
    accent: toRgba(accent, 0.95),
    accentSoft,
    highlightBg: toRgba(highlight, 0.22),
    highlightBorder: toRgba(mix(accent, foreground, 0.1), 0.6),
    scanBar: `linear-gradient(180deg, transparent 0%, ${toRgba(
      accent,
      0.75,
    )} 40%, ${toRgba(accent, 0.1)} 65%, transparent 100%)`,
    scanGlow: toRgba(accent, 0.35),
    diffAddBg: toRgba(mix(accent, background, 0.2), 0.2),
    diffAddText: toRgba(accent, 0.9),
    diffRemoveBg: toRgba(diffRemoveBase, 0.18),
    diffRemoveText: toRgba(mix(foreground, background, 0.1), 0.85),
    diffBorder: toRgba(mix(foreground, background, 0.25), 0.3),
    chipBg: toRgba(mix(background, foreground, 0.08), 0.4),
    chipText: toRgba(foreground, 0.88),
    chipBorder: toRgba(mix(foreground, background, 0.2), 0.35),
    tooltipBg: toRgba(mix(background, foreground, 0.08), 0.9),
    tooltipText: toRgba(foreground, 0.9),
    tooltipBorder: toRgba(mix(foreground, background, 0.2), 0.35),
    cardBg: toRgba(mix(background, foreground, 0.08), 0.92),
    cardBorder: toRgba(mix(foreground, background, 0.2), 0.35),
    cardShadow: toRgba(mix(background, accent, 0.2), 0.45),
    captionText: toRgba(mix(muted, foreground, 0.2), 0.85),
  };
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
};

const useInView = (ref: RefObject<HTMLElement | null>) => {
  const ioUnsupported = typeof IntersectionObserver === "undefined";
  const [isInView, setIsInView] = useState(ioUnsupported);
  const [hasEntered, setHasEntered] = useState(ioUnsupported);

  useEffect(() => {
    const element = ref.current;
    if (!element || ioUnsupported) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (inView) {
          setHasEntered(true);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, ioUnsupported]);

  return { isInView, hasEntered };
};

const usePinMotion = (
  loopProgress: MotionValue<number>,
  pin: PinConfig,
  index: number,
  scanStart: number,
  scanEnd: number,
  resolveStart: number,
  resolveEnd: number,
  scanStep: number,
  updateStep: number,
  highlightDuration: number,
  updateDuration: number,
) => {
  const highlightStart = scanStart + scanStep * (index + 1);
  const highlightEnd = Math.min(scanEnd, highlightStart + highlightDuration);
  const highlightOpacity = useTransform(
    loopProgress,
    [
      highlightStart,
      highlightStart + highlightDuration * 0.25,
      highlightEnd - highlightDuration * 0.2,
      highlightEnd,
    ],
    [0, 1, 1, 0],
  );
  const labelOpacity = useTransform(
    loopProgress,
    [
      highlightStart,
      highlightStart + highlightDuration * 0.2,
      highlightEnd - highlightDuration * 0.2,
      highlightEnd,
    ],
    [0, 1, 1, 0],
  );
  const updateStart = resolveStart + updateStep * (index + 1);
  const updateEnd = Math.min(resolveEnd, updateStart + updateDuration);
  const updateOpacity = useTransform(
    loopProgress,
    [updateStart, updateEnd, 1],
    [0, 1, 1],
  );

  return { ...pin, highlightOpacity, labelOpacity, updateOpacity };
};

const useCounterOpacity = (
  loopProgress: MotionValue<number>,
  start: number,
  end: number,
  fade: number,
) =>
  useTransform(
    loopProgress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  );

type PinTokenProps = {
  pin: PinState;
  palette: Palette;
  reducedMotion: boolean;
  highlightShiftX?: MotionValue<number>;
  highlightShiftY?: MotionValue<number>;
  enableHoverDetails?: boolean;
};

const PinToken: FC<PinTokenProps> = ({
  pin,
  palette,
  reducedMotion,
  highlightShiftX,
  highlightShiftY,
  enableHoverDetails = false,
}) => {
  const oldOpacity = useTransform(pin.updateOpacity, (value) => 1 - value);
  const hoverDetailsEnabled = enableHoverDetails && reducedMotion;

  return (
    <span
      className={clsx(
        "relative inline-flex items-center",
        hoverDetailsEnabled && "group",
      )}
    >
      <motion.span
        className={clsx(
          "absolute -inset-x-1 -inset-y-0.5 rounded-md",
          hoverDetailsEnabled &&
            `
              opacity-0 transition duration-200
              group-hover:opacity-100
            `,
        )}
        style={
          reducedMotion
            ? {
                backgroundColor: palette.highlightBg,
                boxShadow: `0 0 0 1px ${palette.highlightBorder}`,
                opacity: hoverDetailsEnabled ? undefined : 0,
              }
            : {
                backgroundColor: palette.highlightBg,
                boxShadow: `0 0 0 1px ${palette.highlightBorder}`,
                opacity: pin.highlightOpacity,
                x: highlightShiftX ?? 0,
                y: highlightShiftY ?? 0,
              }
        }
      />
      <span className="relative z-10 inline-flex whitespace-nowrap">
        <motion.span
          style={{ opacity: reducedMotion ? 0 : oldOpacity }}
          className="relative"
        >
          {pin.oldValue}
        </motion.span>
        <motion.span
          style={{ opacity: reducedMotion ? 1 : pin.updateOpacity }}
          className="absolute top-0 left-0"
        >
          {pin.newValue}
        </motion.span>
      </span>
      <motion.span
        className={`
          pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2
          rounded-full border px-2 py-0.5 text-[9px] font-semibold
          tracking-[0.2em] uppercase
        `}
        style={
          reducedMotion
            ? { opacity: 0 }
            : {
                opacity: pin.labelOpacity,
                backgroundColor: palette.chipBg,
                color: palette.chipText,
                borderColor: palette.chipBorder,
                x: highlightShiftX ?? 0,
                y: highlightShiftY ?? 0,
              }
        }
      >
        {pin.label}
      </motion.span>
      {hoverDetailsEnabled && (
        <span
          className={`
            pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2
            rounded-full border px-2 py-0.5 text-[9px] font-semibold
            tracking-[0.2em] uppercase opacity-0 transition duration-200
            group-hover:opacity-100
          `}
          style={{
            backgroundColor: palette.tooltipBg,
            color: palette.tooltipText,
            borderColor: palette.tooltipBorder,
          }}
        >
          byte-level rewrite
        </span>
      )}
    </span>
  );
};

export const PythonVersionPatchPrHero: FC<
  PythonVersionPatchPrHeroProps
> = ({ variant = "hero", className, interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 640px)");
  const { isInView, hasEntered } = useInView(containerRef);
  const [palette, setPalette] = useState<Palette>(() =>
    derivePalette(null),
  );
  const [showGuardrail, setShowGuardrail] = useState(true);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const parallaxY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const overlayX = useSpring(pointerX, { stiffness: 80, damping: 22 });
  const overlayY = useSpring(pointerY, { stiffness: 80, damping: 22 });
  const loopProgress = useMotionValue(0);
  const loopControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const lastProgressRef = useRef(0);

  const showStatic = shouldReduceMotion || variant === "card";
  const allowMotion = !showStatic && isInView;
  const enableHoverDetails = variant === "hero";
  const enableChipHover = variant === "hero";

  const scanDuration = 2.2;
  const resolveDuration = 1.3;
  const diffDuration = 1.2;
  const prDuration = 3.9;
  const loopDuration =
    scanDuration + resolveDuration + diffDuration + prDuration;
  const scanStart = 0;
  const scanEnd = scanDuration / loopDuration;
  const resolveStart = scanEnd;
  const resolveEnd = (scanDuration + resolveDuration) / loopDuration;
  const diffStart = resolveEnd;
  const diffEnd = (scanDuration + resolveDuration + diffDuration) / loopDuration;
  const prStart = diffEnd;
  const prEnd =
    (scanDuration + resolveDuration + diffDuration + prDuration) / loopDuration;

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setPalette(derivePalette(containerRef.current));
  }, []);

  useEffect(() => {
    if (showStatic || !hasEntered) {
      loopControlsRef.current?.stop();
      loopControlsRef.current = null;
      return;
    }

    if (isInView) {
      if (!loopControlsRef.current) {
        loopProgress.set(0);
        loopControlsRef.current = animate(loopProgress, 1, {
          duration: loopDuration,
          ease: "linear",
          repeat: Infinity,
        });
      } else {
        loopControlsRef.current.play();
      }
    } else {
      loopControlsRef.current?.pause();
    }

    return () => {
      loopControlsRef.current?.stop();
      loopControlsRef.current = null;
    };
  }, [hasEntered, isInView, loopDuration, loopProgress, showStatic]);

  useMotionValueEvent(loopProgress, "change", (value) => {
    const last = lastProgressRef.current;
    if (last > 0.9 && value < 0.1) {
      setShowGuardrail((prev) => !prev);
    }
    lastProgressRef.current = value;
  });

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!interactive || showStatic || !isInView) {
        return;
      }
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      pointerX.set(clamp(x * 2 - 1));
      pointerY.set(clamp(y * 2 - 1));
    },
    [interactive, isInView, pointerX, pointerY, showStatic],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const scrollToHeading = useCallback((id: string) => {
    if (typeof document === "undefined") {
      return;
    }
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    const applyFlash = () => {
      target.classList.remove("heading-flash");
      void target.offsetWidth;
      target.classList.add("heading-flash");
      window.setTimeout(() => target.classList.remove("heading-flash"), 650);
    };
    const rect = target.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
    if (inView) {
      applyFlash();
    } else if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            applyFlash();
            observer.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      observer.observe(target);
      window.setTimeout(() => observer.disconnect(), 1400);
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const fade = 0.03;
  const scanOpacity = useTransform(
    loopProgress,
    [scanStart, scanStart + fade, scanEnd - fade, scanEnd],
    [0, 1, 1, 0],
  );
  const scanX = useTransform(
    loopProgress,
    [scanStart, scanEnd],
    ["-12%", "110%"],
  );
  const resolveOpacity = useTransform(
    loopProgress,
    [resolveStart, resolveStart + fade, resolveEnd - fade, resolveEnd],
    [0, 1, 1, 0],
  );
  const diffOpacity = useTransform(
    loopProgress,
    [diffStart, diffStart + fade, diffEnd - fade, diffEnd],
    [0, 1, 1, 0],
  );
  const prOpacity = useTransform(
    loopProgress,
    [prStart, prStart + fade, prEnd - fade, prEnd],
    [0, 1, 1, 0],
  );
  const prScale = useTransform(loopProgress, [prStart, prStart + 0.05], [0.96, 1]);
  const auditOpacity = useTransform(
    loopProgress,
    [prStart + 0.08, prStart + 0.16, prStart + 0.3],
    [0, 1, 0],
  );

  const scanStep = (scanEnd - scanStart) / (PIN_DEFS.length + 1);
  const updateStep = (resolveEnd - resolveStart) / (PIN_DEFS.length + 1);
  const highlightDuration = scanStep * 0.85;
  const updateDuration = updateStep * 0.85;
  const counterFade = Math.min(fade, scanStep * 0.45);

  const pinDockerfileDef = PIN_DEFS[0]!;
  const pinWorkflowDef = PIN_DEFS[1]!;
  const pinPyprojectDef = PIN_DEFS[2]!;
  const pinPythonVersionDef = PIN_DEFS[3]!;
  const pinRuntimeDef = PIN_DEFS[4]!;

  const pinDockerfile = usePinMotion(
    loopProgress,
    pinDockerfileDef,
    0,
    scanStart,
    scanEnd,
    resolveStart,
    resolveEnd,
    scanStep,
    updateStep,
    highlightDuration,
    updateDuration,
  );
  const pinWorkflow = usePinMotion(
    loopProgress,
    pinWorkflowDef,
    1,
    scanStart,
    scanEnd,
    resolveStart,
    resolveEnd,
    scanStep,
    updateStep,
    highlightDuration,
    updateDuration,
  );
  const pinPyproject = usePinMotion(
    loopProgress,
    pinPyprojectDef,
    2,
    scanStart,
    scanEnd,
    resolveStart,
    resolveEnd,
    scanStep,
    updateStep,
    highlightDuration,
    updateDuration,
  );
  const pinPythonVersion = usePinMotion(
    loopProgress,
    pinPythonVersionDef,
    3,
    scanStart,
    scanEnd,
    resolveStart,
    resolveEnd,
    scanStep,
    updateStep,
    highlightDuration,
    updateDuration,
  );
  const pinRuntime = usePinMotion(
    loopProgress,
    pinRuntimeDef,
    4,
    scanStart,
    scanEnd,
    resolveStart,
    resolveEnd,
    scanStep,
    updateStep,
    highlightDuration,
    updateDuration,
  );

  const pinLookup: {
    dockerfile: PinState;
    workflow: PinState;
    pyproject: PinState;
    "python-version": PinState;
    runtime: PinState;
  } = {
    dockerfile: pinDockerfile,
    workflow: pinWorkflow,
    pyproject: pinPyproject,
    "python-version": pinPythonVersion,
    runtime: pinRuntime,
  };

  const counter0 = useCounterOpacity(
    loopProgress,
    scanStart,
    scanStart + scanStep,
    counterFade,
  );
  const counter1 = useCounterOpacity(
    loopProgress,
    scanStart + scanStep,
    scanStart + scanStep * 2,
    counterFade,
  );
  const counter2 = useCounterOpacity(
    loopProgress,
    scanStart + scanStep * 2,
    scanStart + scanStep * 3,
    counterFade,
  );
  const counter3 = useCounterOpacity(
    loopProgress,
    scanStart + scanStep * 3,
    scanStart + scanStep * 4,
    counterFade,
  );
  const counter4 = useCounterOpacity(
    loopProgress,
    scanStart + scanStep * 4,
    scanStart + scanStep * 5,
    counterFade,
  );
  const counter5 = useCounterOpacity(
    loopProgress,
    scanStart + scanStep * 5,
    scanEnd,
    counterFade,
  );
  const counterStages = [counter0, counter1, counter2, counter3, counter4, counter5];

  const guardrailOpacity = useTransform(
    loopProgress,
    [resolveStart + 0.05, resolveStart + 0.14, resolveEnd - 0.05, resolveEnd],
    [0, 1, 1, 0],
  );

  const tiltX = useTransform(parallaxY, [-1, 1], [6, -6]);
  const tiltY = useTransform(parallaxX, [-1, 1], [-8, 8]);
  const panelShiftX = useTransform(parallaxX, [-1, 1], [-6, 6]);
  const panelShiftY = useTransform(parallaxY, [-1, 1], [-4, 4]);
  const bgShiftX = useTransform(parallaxX, [-1, 1], [-18, 18]);
  const bgShiftY = useTransform(parallaxY, [-1, 1], [-16, 16]);
  const overlayShiftX = useTransform(overlayX, [-1, 1], [-8, 8]);
  const overlayShiftY = useTransform(overlayY, [-1, 1], [-6, 6]);
  const highlightShiftX = useTransform(overlayX, [-1, 1], [-4, 4]);
  const highlightShiftY = useTransform(overlayY, [-1, 1], [-3, 3]);
  const highlightProps: Partial<
    Pick<PinTokenProps, "highlightShiftX" | "highlightShiftY">
  > = allowMotion ? { highlightShiftX, highlightShiftY } : {};

  const lines = [
    { id: "dockerfile-label", content: "// Dockerfile", muted: true },
    {
      id: "dockerfile",
      content: (
        <>
          FROM python:
            <PinToken
              pin={pinLookup.dockerfile}
              palette={palette}
              reducedMotion={showStatic}
              {...highlightProps}
              enableHoverDetails={enableHoverDetails}
            />
        </>
      ),
    },
    { id: "workflow-label", content: "// .github/workflows/ci.yml", muted: true },
    {
      id: "workflow",
      content: (
        <>
          python-version:{" "}
          <PinToken
            pin={pinLookup.workflow}
            palette={palette}
            reducedMotion={showStatic}
            {...highlightProps}
            enableHoverDetails={enableHoverDetails}
          />
        </>
      ),
    },
    { id: "pyproject-label", content: "// pyproject.toml", muted: true },
    {
      id: "pyproject",
      content: (
        <>
          requires-python = {"\"=="}
          <PinToken
            pin={pinLookup.pyproject}
            palette={palette}
            reducedMotion={showStatic}
            {...highlightProps}
            enableHoverDetails={enableHoverDetails}
          />
          {"\""}
        </>
      ),
    },
    { id: "python-version-label", content: "// .python-version", muted: true },
    {
      id: "python-version",
      content: (
        <PinToken
          pin={pinLookup["python-version"]}
          palette={palette}
          reducedMotion={showStatic}
          {...highlightProps}
          enableHoverDetails={enableHoverDetails}
        />
      ),
    },
    { id: "runtime-label", content: "// runtime.txt", muted: true },
    {
      id: "runtime",
      content: (
        <>
          python-
          <PinToken
            pin={pinLookup.runtime}
            palette={palette}
            reducedMotion={showStatic}
            {...highlightProps}
            enableHoverDetails={enableHoverDetails}
          />
        </>
      ),
    },
  ];

  const diffLines = isCompact
    ? [
        {
          id: "diff-1",
          prefix: "-",
          text: "FROM python:3.12.1-slim",
          type: "remove" as const,
        },
        {
          id: "diff-2",
          prefix: "+",
          text: "FROM python:3.12.2-slim",
          type: "add" as const,
        },
      ]
    : [
        {
          id: "diff-1",
          prefix: "-",
          text: "FROM python:3.12.1-slim",
          type: "remove" as const,
        },
        {
          id: "diff-2",
          prefix: "+",
          text: "FROM python:3.12.2-slim",
          type: "add" as const,
        },
        {
          id: "diff-3",
          prefix: "-",
          text: "python-version: \"3.12.1\"",
          type: "remove" as const,
        },
        {
          id: "diff-4",
          prefix: "+",
          text: "python-version: \"3.12.2\"",
          type: "add" as const,
        },
      ];

  const changeMatrix = [
    { file: "Dockerfile", from: "3.12.1-slim", to: "3.12.2-slim" },
    { file: "workflow", from: "3.12.1", to: "3.12.2" },
    { file: "runtime.txt", from: "3.12.1", to: "3.12.2" },
  ];

  return (
    <div
      ref={containerRef}
      className={clsx("relative flex h-full w-full flex-col", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: palette.gradient,
          x: allowMotion ? bgShiftX : 0,
          y: allowMotion ? bgShiftY : 0,
        }}
      />
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <motion.div
          className={clsx(
            "relative flex w-[70%] max-w-[360px] origin-center flex-col",
            variant === "card" && "w-[62%] max-w-[260px]",
          )}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1200,
            rotateX: allowMotion ? tiltX : 0,
            rotateY: allowMotion ? tiltY : 0,
            x: allowMotion ? panelShiftX : 0,
            y: allowMotion ? panelShiftY : 0,
          }}
        >
          <motion.div
            className="relative"
            initial={
              showStatic
                ? false
                : { opacity: 0, scale: 0.98, y: 12, clipPath: "inset(100% 0 0 0)" }
            }
            animate={
              hasEntered || showStatic
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    clipPath: "inset(0 0 0 0)",
                  }
                : {
                    opacity: 0,
                    scale: 0.98,
                    y: 12,
                    clipPath: "inset(100% 0 0 0)",
                  }
            }
            transition={
              showStatic
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
            }
          >
            <div
              className={`
                relative aspect-[3/4] w-full overflow-hidden rounded-[28px]
                border
              `}
              style={{
                backgroundColor: palette.panelBg,
                borderColor: palette.panelBorder,
                boxShadow: `0 28px 70px -40px ${palette.panelShadow}`,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${palette.panelGlow}, transparent 55%)`,
                }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className={`
                  flex items-center justify-between px-4 pt-4 pb-2 text-[10px]
                  tracking-[0.35em] uppercase
                `}>
                  <span style={{ color: palette.textSubtle }}>CPython Scan</span>
                  <span style={{ color: palette.textSubtle }}>v1</span>
                </div>
                <div
                  className={`
                    relative flex-1 px-4 pb-4 font-mono text-[12px]
                    leading-relaxed
                  `}
                  style={{ color: palette.textPrimary }}
                >
                  {variant === "hero" && (
                    <motion.div
                      className={`
                        absolute top-12 left-3 z-20 flex items-center gap-2
                        rounded-full border px-2.5 py-1 text-[9px] font-semibold
                        tracking-[0.2em] uppercase
                      `}
                      style={
                        showStatic
                          ? {
                              opacity: 0.8,
                              borderColor: palette.chipBorder,
                              backgroundColor: palette.chipBg,
                              color: palette.chipText,
                            }
                          : {
                              opacity: scanOpacity,
                              borderColor: palette.chipBorder,
                              backgroundColor: palette.chipBg,
                              color: palette.chipText,
                            }
                      }
                    >
                      <span>Pins found:</span>
                      <span className="relative h-3 w-3">
                        {counterStages.map((opacity, index) => (
                          <motion.span
                            key={`pins-${index}`}
                            className="absolute inset-0"
                            style={{
                              opacity:
                                showStatic && index !== PIN_DEFS.length
                                  ? 0
                                  : showStatic
                                    ? 1
                                    : opacity,
                            }}
                          >
                            {index}
                          </motion.span>
                        ))}
                      </span>
                    </motion.div>
                  )}
                  <motion.div
                    className={`
                      pointer-events-none absolute inset-y-12 left-0 w-[2px]
                    `}
                    style={{
                      backgroundImage: palette.scanBar,
                      boxShadow: `0 0 18px ${palette.scanGlow}`,
                      opacity: showStatic ? 0 : scanOpacity,
                      x: allowMotion ? scanX : 0,
                      y: allowMotion ? overlayShiftY : 0,
                    }}
                  />
                  <div className="space-y-1">
                    {lines.map((line, index) => (
                      <motion.div
                        key={line.id}
                        className={clsx(
                          "overflow-hidden",
                          line.muted && "text-[11px]",
                        )}
                        initial={
                          showStatic
                            ? false
                            : { clipPath: "inset(0 100% 0 0)" }
                        }
                        animate={
                          hasEntered || showStatic
                            ? { clipPath: "inset(0 0 0 0)" }
                            : { clipPath: "inset(0 100% 0 0)" }
                        }
                        transition={
                          showStatic
                            ? { duration: 0 }
                            : {
                                duration: 0.5,
                                delay: 0.28 + index * 0.04,
                                ease: [0.2, 0.8, 0.2, 1],
                              }
                        }
                        style={line.muted ? { color: palette.textMuted } : {}}
                      >
                        {line.content}
                        {index === lines.length - 1 && !showStatic && (
                          <motion.span
                            className={`
                              ml-1 inline-block h-3 w-1.5 rounded-sm
                              align-middle
                            `}
                            initial={{ opacity: 0 }}
                            animate={
                              hasEntered
                                ? { opacity: [0, 1, 0] }
                                : { opacity: 0 }
                            }
                            transition={{ delay: 0.95, duration: 0.4 }}
                            style={{ backgroundColor: palette.accent }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className={`
                      absolute top-14 right-4 rounded-full border px-2 py-1
                      text-[9px] font-semibold tracking-[0.2em] uppercase
                    `}
                    style={
                      showStatic
                        ? {
                            opacity: 0.9,
                            borderColor: palette.chipBorder,
                            backgroundColor: palette.chipBg,
                            color: palette.chipText,
                          }
                        : {
                            opacity: resolveOpacity,
                            borderColor: palette.chipBorder,
                            backgroundColor: palette.chipBg,
                            color: palette.chipText,
                          }
                    }
                  >
                    Resolve latest stable patch
                  </motion.div>
                  <motion.button
                    type="button"
                    onClick={() => scrollToHeading("reliability-safety")}
                    className={clsx(
                      `
                        absolute bottom-4 left-4 rounded-full border px-2.5 py-1
                        text-[9px] font-semibold tracking-[0.2em] uppercase
                      `,
                      enableChipHover && `
                        transition
                        hover:opacity-100
                      `,
                    )}
                    style={
                      showGuardrail
                        ? {
                            opacity: showStatic ? 0.9 : guardrailOpacity,
                            borderColor: palette.chipBorder,
                            backgroundColor: palette.chipBg,
                            color: palette.chipText,
                            pointerEvents: showStatic ? "auto" : "auto",
                          }
                        : { opacity: 0, pointerEvents: "none" }
                    }
                    aria-label="Go to reliability and safety"
                  >
                    pre-release blocked
                  </motion.button>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={() => scrollToHeading("what-it-does")}
                className={clsx(
                  `
                    absolute right-4 bottom-4 rounded-full border px-2.5 py-1
                    text-[9px] font-semibold tracking-[0.2em] uppercase
                  `,
                  enableChipHover && `
                    transition
                    hover:opacity-100
                  `,
                )}
                style={{
                  opacity: showStatic ? 0.9 : scanOpacity,
                  borderColor: palette.chipBorder,
                  backgroundColor: palette.chipBg,
                  color: palette.chipText,
                }}
                aria-label="Go to what it does"
              >
                Scanner
              </motion.button>
              <motion.div
                className={`
                  pointer-events-none absolute right-4 bottom-6 left-4
                  rounded-xl border px-3 py-2 font-mono text-[10px]
                `}
                style={{
                  opacity: showStatic ? 1 : diffOpacity,
                  borderColor: palette.diffBorder,
                  backgroundColor: palette.cardBg,
                  x: allowMotion ? overlayShiftX : 0,
                  y: allowMotion ? overlayShiftY : 0,
                }}
              >
                {diffLines.map((line) => (
                  <div
                    key={line.id}
                    className="flex items-start gap-2"
                    style={{
                      color:
                        line.type === "add"
                          ? palette.diffAddText
                          : palette.diffRemoveText,
                      backgroundColor:
                        line.type === "add"
                          ? palette.diffAddBg
                          : palette.diffRemoveBg,
                    }}
                  >
                    <span>{line.prefix}</span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          <motion.button
            type="button"
            onClick={() => scrollToHeading("architecture-highlights")}
            className={`
              group absolute top-10 -right-6 w-[72%] rounded-2xl border px-4
              py-3 text-left text-[11px] shadow-lg
            `}
            style={{
              opacity: showStatic ? 1 : prOpacity,
              scale: showStatic ? 1 : prScale,
              borderColor: palette.cardBorder,
              backgroundColor: palette.cardBg,
              boxShadow: `0 22px 40px -30px ${palette.cardShadow}`,
              x: allowMotion ? overlayShiftX : 0,
              y: allowMotion ? overlayShiftY : 0,
            }}
            aria-label="Go to architecture highlights"
          >
            <div className="flex items-center justify-between">
              <span className={`
                text-[10px] font-semibold tracking-[0.2em] uppercase
              `} style={{ color: palette.textSubtle }}>
                Pull request
              </span>
              <motion.span
                className={`
                  rounded-full border px-2 py-0.5 text-[9px] font-semibold
                  tracking-[0.2em] uppercase
                `}
                style={{
                  opacity: showStatic ? 0.9 : auditOpacity,
                  borderColor: palette.chipBorder,
                  backgroundColor: palette.chipBg,
                  color: palette.chipText,
                }}
              >
                Audit-ready
              </motion.span>
            </div>
            <div className="mt-2 text-[12px] font-semibold" style={{ color: palette.textPrimary }}>
              chore/bump-python-3.12
            </div>
            <div className="text-[11px]" style={{ color: palette.textMuted }}>
              Automated patch bump
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "files: 4",
                "changes: 4",
                showGuardrail ? "skip reason: pre-release blocked" : null,
              ]
                .filter(Boolean)
                .map((chip) => (
                  <span
                    key={chip}
                    className={`
                      rounded-full border px-2 py-0.5 text-[9px] font-semibold
                      tracking-[0.2em] uppercase
                    `}
                    style={{
                      borderColor: palette.chipBorder,
                      backgroundColor: palette.chipBg,
                      color: palette.chipText,
                    }}
                  >
                    {chip}
                  </span>
                ))}
            </div>
            <div className="mt-3 space-y-1">
              {changeMatrix
                .slice(0, isCompact ? 2 : 3)
                .map((row) => (
                  <div
                    key={row.file}
                    className="grid grid-cols-[auto,1fr,1fr] gap-2 text-[10px]"
                    style={{ color: palette.textSubtle }}
                  >
                    <span>{row.file}</span>
                    <span>{row.from}</span>
                    <span>{row.to}</span>
                  </div>
                ))}
            </div>
            <span
              className={`
                pointer-events-none absolute -top-6 left-4 rounded-full border
                px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] uppercase
                opacity-0 transition duration-200
                group-hover:opacity-100
              `}
              style={{
                backgroundColor: palette.tooltipBg,
                color: palette.tooltipText,
                borderColor: palette.tooltipBorder,
              }}
            >
              deterministic PR body
            </span>
          </motion.button>
        </motion.div>
      </div>
      {variant === "hero" && (
        <div className="relative z-20 pb-3 text-center text-[12px] font-medium">
          <span style={{ color: palette.captionText }}>
            Scans pins. Resolves latest patch. Opens an auditable PR.
          </span>
        </div>
      )}
    </div>
  );
};
