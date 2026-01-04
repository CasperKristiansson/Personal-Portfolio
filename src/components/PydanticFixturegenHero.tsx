import {
  Canvas,
  extend,
  type ThreeEvent,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  type DependencyList,
  type FC,
  type MutableRefObject,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

extend({ ThreeLine: THREE.Line });

type HeroVariant = "hero" | "card";

type ModuleId =
  | "models"
  | "discovery"
  | "sandbox"
  | "strategies"
  | "providers"
  | "builder"
  | "splitmix64"
  | "emitters"
  | "artifacts";

type ModuleConfig = {
  id: ModuleId;
  label: string;
  headingId?: string;
  size: [number, number, number];
  position: THREE.Vector3;
  activation: number;
  labelPriority: "primary" | "secondary";
  accent?: "core" | "shield" | "hub";
};

type WireConfig = {
  from: ModuleId;
  to: ModuleId;
  curve: THREE.CatmullRomCurve3;
};

type RigConfig = {
  modules: ModuleConfig[];
  wires: WireConfig[];
  trunkCurve: THREE.CatmullRomCurve3;
  outputCurves: THREE.CatmullRomCurve3[];
  rackSlots: THREE.Vector3[];
  tileEntries: THREE.Vector3[];
  rack: ModuleConfig;
  outputCount: number;
  slotCount: number;
  isCompact: boolean;
};

type Rgb = { r: number; g: number; b: number };

type Palette = {
  background: string;
  wire: { color: THREE.Color; opacity: number; css: string };
  wireMuted: { color: THREE.Color; opacity: number; css: string };
  active: { color: THREE.Color; opacity: number; css: string };
  packet: { color: THREE.Color; opacity: number; css: string };
  label: { color: THREE.Color; opacity: number; css: string };
  labelMuted: { color: THREE.Color; opacity: number; css: string };
};

type PydanticFixturegenHeroProps = {
  variant?: HeroVariant;
  className?: string;
  interactive?: boolean;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const parseHex = (value: string): Rgb | null => {
  const hex = value.replace("#", "").trim();
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return { r, g, b };
  }
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
};

const parseRgb = (value: string): Rgb | null => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    return null;
  }
  const parts = match[1]
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((part) => Number.isFinite(part));
  if (parts.length < 3) {
    return null;
  }
  return { r: parts[0], g: parts[1], b: parts[2] };
};

const parseColor = (value: string): Rgb | null => {
  if (!value) {
    return null;
  }
  if (value.startsWith("#")) {
    return parseHex(value);
  }
  if (value.startsWith("rgb")) {
    return parseRgb(value);
  }
  return null;
};

const rgbToCss = (rgb: Rgb, alpha: number) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

const rgbToThree = (rgb: Rgb) =>
  new THREE.Color(rgb.r / 255, rgb.g / 255, rgb.b / 255);

const luminance = (rgb: Rgb) => {
  const toLinear = (channel: number) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * toLinear(rgb.r) +
    0.7152 * toLinear(rgb.g) +
    0.0722 * toLinear(rgb.b)
  );
};

const pickColor = (
  style: CSSStyleDeclaration,
  candidates: string[],
  fallback: string,
) => {
  for (const candidate of candidates) {
    const value = style.getPropertyValue(candidate).trim();
    if (value) {
      return value;
    }
  }
  return fallback;
};

const derivePalette = (element: HTMLElement | null): Palette => {
  const fallbackBackground = "#0b1224";
  const fallbackForeground = "#e2e8f0";
  const fallbackAccent = "#38bdf8";

  if (!element || typeof window === "undefined") {
    const foreground = parseColor(fallbackForeground) ?? {
      r: 226,
      g: 232,
      b: 240,
    };
    const accent = parseColor(fallbackAccent) ?? {
      r: 56,
      g: 189,
      b: 248,
    };
    const baseAlpha = 0.4;
    return {
      background: fallbackBackground,
      wire: {
        color: rgbToThree(foreground),
        opacity: baseAlpha,
        css: rgbToCss(foreground, baseAlpha),
      },
      wireMuted: {
        color: rgbToThree(foreground),
        opacity: 0.2,
        css: rgbToCss(foreground, 0.2),
      },
      active: {
        color: rgbToThree(accent),
        opacity: 0.78,
        css: rgbToCss(accent, 0.78),
      },
      packet: {
        color: rgbToThree(accent),
        opacity: 0.88,
        css: rgbToCss(accent, 0.88),
      },
      label: {
        color: rgbToThree(foreground),
        opacity: 0.68,
        css: rgbToCss(foreground, 0.68),
      },
      labelMuted: {
        color: rgbToThree(foreground),
        opacity: 0.45,
        css: rgbToCss(foreground, 0.45),
      },
    };
  }

  const computed = getComputedStyle(element);
  const backgroundValue = pickColor(
    computed,
    ["--background", "--color-background"],
    computed.backgroundColor || fallbackBackground,
  );
  const foregroundValue = pickColor(
    computed,
    ["--foreground", "--color-text"],
    computed.color || fallbackForeground,
  );
  const mutedValue = pickColor(
    computed,
    ["--muted", "--color-text-muted"],
    foregroundValue,
  );
  const accentValue = pickColor(
    computed,
    ["--accent", "--primary", "--color-primary", "--color-primary-light"],
    foregroundValue,
  );

  const background =
    parseColor(backgroundValue) ?? parseColor(fallbackBackground) ?? {
      r: 11,
      g: 18,
      b: 36,
    };
  const foreground =
    parseColor(foregroundValue) ?? parseColor(fallbackForeground) ?? {
      r: 226,
      g: 232,
      b: 240,
    };
  const muted =
    parseColor(mutedValue) ?? parseColor(foregroundValue) ?? foreground;
  const accent =
    parseColor(accentValue) ?? parseColor(fallbackAccent) ?? foreground;

  const bgLuminance = luminance(background);
  const baseAlpha = THREE.MathUtils.lerp(0.45, 0.25, clamp(bgLuminance));
  const wireOpacity = baseAlpha;
  const wireMutedOpacity = Math.max(0.16, baseAlpha - 0.12);
  const activeOpacity = Math.min(baseAlpha + 0.35, 0.85);
  const packetOpacity = Math.min(activeOpacity + 0.12, 0.92);
  const labelOpacity = Math.min(baseAlpha + 0.28, 0.78);
  const labelMutedOpacity = Math.max(0.35, labelOpacity - 0.18);

  return {
    background: backgroundValue,
    wire: {
      color: rgbToThree(foreground),
      opacity: wireOpacity,
      css: rgbToCss(foreground, wireOpacity),
    },
    wireMuted: {
      color: rgbToThree(muted),
      opacity: wireMutedOpacity,
      css: rgbToCss(muted, wireMutedOpacity),
    },
    active: {
      color: rgbToThree(accent),
      opacity: activeOpacity,
      css: rgbToCss(accent, activeOpacity),
    },
    packet: {
      color: rgbToThree(accent),
      opacity: packetOpacity,
      css: rgbToCss(accent, packetOpacity),
    },
    label: {
      color: rgbToThree(foreground),
      opacity: labelOpacity,
      css: rgbToCss(foreground, labelOpacity),
    },
    labelMuted: {
      color: rgbToThree(muted),
      opacity: labelMutedOpacity,
      css: rgbToCss(muted, labelMutedOpacity),
    },
  };
};

const supportsWebGL = () => {
  if (typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
};

const createTextTexture = (text: string, color: string) => {
  if (typeof document === "undefined") {
    return null;
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const pixelRatio =
    typeof window === "undefined"
      ? 2
      : Math.min(window.devicePixelRatio || 2, 3);
  const fontSize = 28 * pixelRatio;
  const paddingX = 16 * pixelRatio;
  const paddingY = 9 * pixelRatio;
  const fontFamily = '"Plus Jakarta Sans", system-ui, sans-serif';
  const fontWeight = 600;

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);
  const width = Math.ceil(metrics.width + paddingX * 2);
  const height = Math.ceil(fontSize + paddingY * 2);

  canvas.width = width;
  canvas.height = height;
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.fillText(text, paddingX, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return { texture, width, height };
};

type TextLabelProps = {
  text: string;
  position: [number, number, number];
  color: string;
  scale?: number;
  registerMaterial?: (material: THREE.SpriteMaterial) => void;
};

const TextLabel: FC<TextLabelProps> = ({
  text,
  position,
  color,
  scale = 1,
  registerMaterial,
}) => {
  const textureData = useMemo(() => createTextTexture(text, color), [text, color]);
  useEffect(() => {
    return () => {
      textureData?.texture.dispose();
    };
  }, [textureData]);
  if (!textureData) {
    return null;
  }

  const scaleFactor = 0.0048;
  return (
    <sprite
      position={position}
      scale={[
        textureData.width * scaleFactor * scale,
        textureData.height * scaleFactor * scale,
        1,
      ]}
    >
      <spriteMaterial
        ref={(material: THREE.SpriteMaterial | null) => {
          if (material && registerMaterial) {
            registerMaterial(material);
          }
        }}
        map={textureData.texture}
        transparent
        opacity={0}
        depthTest={false}
        depthWrite={false}
      />
    </sprite>
  );
};

const buildRigConfig = (
  variant: HeroVariant,
  isMobile: boolean,
  isLowPower: boolean,
): RigConfig => {
  const isCompact = variant === "card" || isMobile || isLowPower;
  const spacing = isCompact ? 1.85 : 2.05;
  const baseX = isCompact ? -7.1 : -8.0;
  const rackOffset = isCompact ? 0.5 : 0.8;

  const moduleDefs: Omit<ModuleConfig, "position">[] = [
    {
      id: "models",
      label: "Models",
      headingId: "architecture",
      size: [1.7, 0.42, 1.1],
      activation: 0.05,
      labelPriority: "primary",
    },
    {
      id: "discovery",
      label: "Discovery (AST)",
      headingId: "architecture",
      size: [1.55, 0.55, 1.05],
      activation: 0.18,
      labelPriority: "secondary",
    },
    {
      id: "sandbox",
      label: "Sandbox",
      headingId: "reliability-safety",
      size: [1.6, 0.75, 1.05],
      activation: 0.32,
      labelPriority: "secondary",
      accent: "shield",
    },
    {
      id: "strategies",
      label: "Strategies",
      headingId: "architecture",
      size: [1.35, 0.45, 0.95],
      activation: 0.46,
      labelPriority: "secondary",
    },
    {
      id: "providers",
      label: "Providers",
      headingId: "architecture",
      size: [1.35, 0.45, 0.95],
      activation: 0.56,
      labelPriority: "secondary",
    },
    {
      id: "builder",
      label: "Builder",
      headingId: "determinism-control",
      size: [1.55, 0.6, 1.05],
      activation: 0.66,
      labelPriority: "secondary",
    },
    {
      id: "splitmix64",
      label: "SplitMix64",
      headingId: "determinism-control",
      size: [1.1, 0.68, 0.98],
      activation: 0.76,
      labelPriority: "primary",
      accent: "core",
    },
    {
      id: "emitters",
      label: "Emitters",
      headingId: "generation-emitters",
      size: [1.35, 0.55, 0.92],
      activation: 0.88,
      labelPriority: "primary",
      accent: "hub",
    },
    {
      id: "artifacts",
      label: "Artifacts",
      headingId: "generation-emitters",
      size: [2.2, 1.4, 1.15],
      activation: 0.96,
      labelPriority: "primary",
    },
  ];

  const modules = moduleDefs.map((module, index) => {
    const offset = module.id === "artifacts" ? rackOffset : 0;
    return {
      ...module,
      position: new THREE.Vector3(baseX + index * spacing + offset, 0, 0),
    };
  });

  const wires = modules.slice(0, -1).map((module, index) => {
    const next = modules[index + 1];
    const start = new THREE.Vector3(
      module.position.x + module.size[0] / 2,
      module.position.y + 0.05,
      module.position.z - 0.06,
    );
    const end = new THREE.Vector3(
      next.position.x - next.size[0] / 2,
      next.position.y + 0.05,
      next.position.z - 0.06,
    );
    const lift = 0.12 + (index % 2) * 0.05;
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + lift,
      (start.z + end.z) / 2 + 0.14,
    );
    return {
      from: module.id,
      to: next.id,
      curve: new THREE.CatmullRomCurve3([start, mid, end]),
    };
  });

  const trunkPoints = modules
    .filter((module) => module.id !== "artifacts")
    .map(
      (module, index) =>
        new THREE.Vector3(
          module.position.x,
          module.position.y + 0.12 + (index % 2) * 0.02,
          module.position.z - 0.12,
        ),
    );

  const trunkCurve = new THREE.CatmullRomCurve3(trunkPoints);

  const rack = modules.find((module) => module.id === "artifacts")!;
  const slotCount = isCompact ? 6 : 8;
  const slotAreaHeight = rack.size[1] - 0.3;
  const slotSpacing = slotAreaHeight / (slotCount - 1);
  const slotStartY = rack.position.y - slotAreaHeight / 2 + 0.15;
  const slotX = rack.position.x + rack.size[0] / 2 - 0.25;
  const slotZ = rack.position.z + rack.size[2] / 2 - 0.12;

  const rackSlots = Array.from({ length: slotCount }, (_, index) =>
    new THREE.Vector3(slotX, slotStartY + index * slotSpacing, slotZ),
  );

  const tileEntries = rackSlots.map(
    (slot) =>
      new THREE.Vector3(slot.x - 0.85, slot.y + 0.02, slot.z - 0.12),
  );

  const outputCount = isCompact ? 3 : 4;
  const outputIndices = Array.from({ length: outputCount }, (_, index) =>
    Math.round((index * (slotCount - 1)) / (outputCount - 1)),
  );

  const emitter = modules.find((module) => module.id === "emitters")!;
  const outputStart = new THREE.Vector3(
    emitter.position.x + emitter.size[0] / 2,
    emitter.position.y + 0.18,
    emitter.position.z + 0.08,
  );

  const outputCurves = outputIndices.map((slotIndex, index) => {
    const target = rackSlots[slotIndex];
    const mid = new THREE.Vector3(
      (outputStart.x + target.x) / 2,
      outputStart.y + 0.16 + index * 0.02,
      outputStart.z + 0.22,
    );
    return new THREE.CatmullRomCurve3([outputStart, mid, target]);
  });

  return {
    modules,
    wires,
    trunkCurve,
    outputCurves,
    rackSlots,
    tileEntries,
    rack,
    outputCount,
    slotCount,
    isCompact,
  };
};

const createLineGeometry = (curve: THREE.Curve<THREE.Vector3>, segments = 36) => {
  const points = curve.getPoints(segments);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setDrawRange(0, 0);
  return { geometry, count: points.length };
};

const PydanticFixturegenFallback: FC<{ palette: Palette }> = ({
  palette,
}) => {
  const modules = Array.from({ length: 8 }, (_, index) => ({
    x: 80 + index * 120,
    y: 300,
    w: 90,
    h: 48,
  }));
  const rack = { x: 1040, y: 250, w: 140, h: 160 };

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1280 720"
      role="img"
      aria-label="Deterministic pipeline rig"
    >
      <rect
        x={0}
        y={0}
        width={1280}
        height={720}
        fill="transparent"
      />
      {modules.map((module, index) => (
        <rect
          key={index}
          x={module.x}
          y={module.y}
          width={module.w}
          height={module.h}
          fill="none"
          stroke={palette.wire.css}
          strokeWidth={2}
        />
      ))}
      <rect
        x={rack.x}
        y={rack.y}
        width={rack.w}
        height={rack.h}
        fill="none"
        stroke={palette.wire.css}
        strokeWidth={2}
      />
      {modules.slice(0, -1).map((module, index) => (
        <line
          key={`wire-${index}`}
          x1={module.x + module.w}
          y1={module.y + module.h / 2}
          x2={modules[index + 1].x}
          y2={modules[index + 1].y + modules[index + 1].h / 2}
          stroke={palette.wire.css}
          strokeWidth={2}
        />
      ))}
      <circle
        cx={modules[6].x + modules[6].w / 2}
        cy={modules[6].y + modules[6].h / 2}
        r={26}
        stroke={palette.active.css}
        strokeWidth={2}
        fill="none"
      />
      {Array.from({ length: 4 }, (_, index) => (
        <line
          key={`fan-${index}`}
          x1={modules[7].x + modules[7].w}
          y1={modules[7].y + modules[7].h / 2}
          x2={rack.x}
          y2={rack.y + 20 + index * 40}
          stroke={palette.active.css}
          strokeWidth={1.5}
          strokeOpacity={0.8}
        />
      ))}
    </svg>
  );
};

const RigAnimator: FC<{ active: boolean }> = ({ active }) => {
  const { invalidate } = useThree();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const loop = () => {
      invalidate();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [active, invalidate]);

  return null;
};

const InvalidateOnChange: FC<{ deps: DependencyList }> = ({
  deps,
}) => {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [invalidate, deps]);
  return null;
};

type RigSceneProps = {
  palette: Palette;
  config: RigConfig;
  cameraZoom: number;
  active: boolean;
  reducedMotion: boolean;
  hoveredModule: ModuleId | null;
  interactive: boolean;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  onModuleHover: (id: ModuleId | null) => void;
  onModuleClick: (id: ModuleId) => void;
};

const RigScene: FC<RigSceneProps> = ({
  palette,
  config,
  cameraZoom,
  active,
  reducedMotion,
  hoveredModule,
  interactive,
  pointerRef,
  onModuleHover,
  onModuleClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moduleMaterials = useRef<THREE.LineBasicMaterial[]>([]);
  const wireMaterials = useRef<THREE.LineBasicMaterial[]>([]);
  const fanLineMaterials = useRef<THREE.LineBasicMaterial[]>([]);
  const labelMaterials = useRef<THREE.SpriteMaterial[]>([]);
  const packetMeshes = useRef<THREE.Mesh[]>([]);
  const fanMeshes = useRef<THREE.Mesh[]>([]);
  const tileMeshes = useRef<THREE.Mesh[]>([]);
  const stampMaterials = useRef<THREE.SpriteMaterial[]>([]);
  const hoverRef = useRef<ModuleId | null>(null);
  const bootStartRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const { camera, size, invalidate } = useThree();

  const packetOffsets = useMemo(() => {
    const count = config.isCompact ? 6 : 10;
    return Array.from({ length: count }, (_, index) => index / count);
  }, [config.isCompact]);

  const baseCamera = useMemo(() => new THREE.Vector3(0, 0, 12), []);
  const rigRotation = useMemo(() => new THREE.Euler(-0.52, -0.78, 0), []);
  const moduleEdges = useMemo(
    () =>
      config.modules.map(
        (module) =>
          new THREE.EdgesGeometry(new THREE.BoxGeometry(...module.size)),
      ),
    [config.modules],
  );
  const coreEdges = useMemo(
    () =>
      config.modules.map((module) =>
        module.accent === "core"
          ? new THREE.EdgesGeometry(
              new THREE.BoxGeometry(
                module.size[0] * 0.6,
                module.size[1] * 0.6,
                module.size[2] * 0.6,
              ),
            )
          : null,
      ),
    [config.modules],
  );
  const shieldEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.35)),
    [],
  );
  const hubEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.35)),
    [],
  );
  const wireLines = useMemo(
    () => config.wires.map((wire) => createLineGeometry(wire.curve, 28)),
    [config.wires],
  );
  const fanLines = useMemo(
    () =>
      config.outputCurves.map((curve) => {
        const line = createLineGeometry(curve, 22);
        line.geometry.setDrawRange(0, line.count);
        return line;
      }),
    [config.outputCurves],
  );
  const splitmixModule = useMemo(
    () => config.modules.find((module) => module.id === "splitmix64"),
    [config.modules],
  );

  useEffect(() => {
    hoverRef.current = hoveredModule;
  }, [hoveredModule]);

  useEffect(() => {
    camera.position.copy(baseCamera);
    if (camera instanceof THREE.OrthographicCamera) {
      // eslint-disable-next-line react-hooks/immutability -- three.js camera updates are imperative.
      camera.zoom = cameraZoom;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
    invalidate();
  }, [camera, baseCamera, cameraZoom, invalidate]);

  useEffect(() => {
    return () => {
      shieldEdges.dispose();
      hubEdges.dispose();
      moduleEdges.forEach((edge) => edge.dispose());
      coreEdges.forEach((edge) => edge?.dispose());
      wireLines.forEach(({ geometry }) => geometry.dispose());
      fanLines.forEach(({ geometry }) => geometry.dispose());
    };
  }, [
    shieldEdges,
    hubEdges,
    moduleEdges,
    coreEdges,
    wireLines,
    fanLines,
  ]);

  useEffect(() => {
    if (!groupRef.current) {
      return undefined;
    }

    const updateScale = () => {
      const baseScale = config.isCompact ? 0.95 : 1.05;
      const targetWidth = config.isCompact ? 480 : 760;
      const scale = Math.min(1, size.width / targetWidth) * baseScale;
      groupRef.current?.scale.setScalar(scale);
    };

    const timeoutId = window.setTimeout(updateScale, 120);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [size.width, size.height, config.isCompact]);

  useFrame((_, delta) => {
    if (reducedMotion) {
      return;
    }
    if (!active) {
      return;
    }

    const step = Math.min(delta, 0.05);
    timeRef.current += step;
    const currentTime = timeRef.current;

    if (bootStartRef.current === null) {
      bootStartRef.current = currentTime;
    }

    const bootDuration = 1.1;
    const bootProgress = clamp(
      (currentTime - bootStartRef.current) / bootDuration,
    );
    const loopTime = Math.max(0, currentTime - bootStartRef.current - 0.95);
    const loopDuration = 5.2;
    const loopPhase = (loopTime % loopDuration) / loopDuration;

    const hoverId = hoverRef.current;

    config.wires.forEach((wire, index) => {
      const wireLine = wireLines[index];
      if (!wireLine) {
        return;
      }
      const progressWindow = 1 / config.wires.length;
      const wireProgress = clamp(
        (bootProgress - index * progressWindow) / progressWindow,
      );
      const { geometry, count } = wireLine;
      geometry.setDrawRange(0, Math.max(2, Math.floor(count * wireProgress)));
      const material = wireMaterials.current[index];
      if (material) {
        const isActive = hoverId === wire.from || hoverId === wire.to;
        material.color.copy(
          isActive ? palette.active.color : palette.wire.color,
        );
        material.opacity =
          (isActive ? palette.active.opacity : palette.wire.opacity) *
          (0.5 + wireProgress * 0.5);
      }
    });

    const fanProgress = clamp((bootProgress - 0.78) / 0.2);
    fanLineMaterials.current.forEach((material) => {
      const isActive = hoverId === "emitters" || hoverId === "artifacts";
      material.color.copy(
        isActive ? palette.active.color : palette.wireMuted.color,
      );
      material.opacity =
        (isActive ? palette.active.opacity : palette.wireMuted.opacity) *
        fanProgress;
    });

    config.modules.forEach((module, index) => {
      const material = moduleMaterials.current[index];
      if (!material) {
        return;
      }
      const moduleProgress = clamp((bootProgress - module.activation) / 0.18);
      const isActive = hoverId === module.id;
      const pulse = Math.sin(moduleProgress * Math.PI) * 0.12;
      material.color.copy(
        isActive ? palette.active.color : palette.wire.color,
      );
      material.opacity =
        (isActive ? palette.active.opacity : palette.wire.opacity) *
          (0.4 + moduleProgress * 0.6) +
        pulse;
    });

    labelMaterials.current.forEach((material, index) => {
      const module = config.modules[index];
      if (!module) {
        return;
      }
      const moduleProgress = clamp((bootProgress - module.activation) / 0.2);
      material.opacity = palette.label.opacity * moduleProgress;
    });

    const packetMeshesCurrent = packetMeshes.current;
    packetMeshesCurrent.forEach((mesh, index) => {
      const progress = (loopTime / loopDuration + packetOffsets[index]) % 1;
      mesh.position.copy(config.trunkCurve.getPointAt(progress));
      mesh.visible = bootProgress > 0.8;
    });

    fanMeshes.current.forEach((mesh, index) => {
      const fanStart = 0.68 + index * 0.03;
      const fanWindow = 0.18;
      const phase = (loopPhase - fanStart) / fanWindow;
      if (phase >= 0 && phase <= 1) {
        mesh.visible = bootProgress > 0.85;
        mesh.position.copy(config.outputCurves[index].getPointAt(phase));
      } else {
        mesh.visible = false;
      }
    });

    const tileInterval = loopDuration / config.slotCount;
    const cycleIndex = Math.floor(loopTime / tileInterval);
    const slotProgress = (loopTime % tileInterval) / tileInterval;

    tileMeshes.current.forEach((mesh, index) => {
      const entry = config.tileEntries[index];
      const target = config.rackSlots[index];
      const age = (cycleIndex - index + config.slotCount) % config.slotCount;
      const baseOpacity = clamp(1 - age * 0.12, 0.25, 0.9);
      const material = mesh.material as THREE.Material & { opacity?: number };
      if (material && "opacity" in material) {
        material.opacity = baseOpacity;
      }

      if (index === cycleIndex % config.slotCount && slotProgress < 0.35) {
        const progress = clamp(slotProgress / 0.35);
        mesh.position.lerpVectors(entry, target, progress);
      } else {
        mesh.position.copy(target);
      }
      mesh.visible = bootProgress > 0.9;
    });

    stampMaterials.current.forEach((material, index) => {
      const stampWindow = 0.6 / loopDuration;
      const stampStart = 0.74 + index * 0.01;
      const stampPhase = (loopPhase - stampStart) / stampWindow;
      if (stampPhase >= 0 && stampPhase <= 1 && bootProgress > 0.9) {
        material.opacity =
          palette.labelMuted.opacity *
          (1 - Math.abs(stampPhase - 0.5) * 2);
      } else {
        material.opacity = 0;
      }
    });

    if (ringRef.current) {
      const ringPhase = loopPhase;
      const ringScale = 1 + ringPhase * 2.2;
      const ringOpacity =
        ringPhase <= 0.6 ? (1 - ringPhase / 0.6) * 0.6 : 0;
      ringRef.current.scale.setScalar(ringScale);
      const ringMaterial = ringRef.current
        .material as THREE.Material & { opacity?: number };
      if (ringMaterial && "opacity" in ringMaterial) {
        ringMaterial.opacity = ringOpacity;
      }
      ringRef.current.visible = bootProgress > 0.85;
    }

    if (!reducedMotion && interactive && groupRef.current) {
      const { x, y } = pointerRef.current;
      const targetX = rigRotation.x + y * 0.06;
      const targetY = rigRotation.y + x * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.08,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.08,
      );
    }
  });

  useEffect(() => {
    if (!reducedMotion) {
      return;
    }

    const hoverId = hoveredModule;
    config.wires.forEach((wire, index) => {
      const wireLine = wireLines[index];
      if (!wireLine) {
        return;
      }
      const { geometry, count } = wireLine;
      geometry.setDrawRange(0, count);
      const material = wireMaterials.current[index];
      if (material) {
        const isActive = hoverId === wire.from || hoverId === wire.to;
        material.color.copy(
          isActive ? palette.active.color : palette.wire.color,
        );
        material.opacity = isActive
          ? palette.active.opacity
          : palette.wire.opacity;
      }
    });

    fanLineMaterials.current.forEach((material) => {
      const isActive = hoverId === "emitters" || hoverId === "artifacts";
      material.color.copy(
        isActive ? palette.active.color : palette.wireMuted.color,
      );
      material.opacity = isActive
        ? palette.active.opacity
        : palette.wireMuted.opacity;
    });

    config.modules.forEach((module, index) => {
      const material = moduleMaterials.current[index];
      if (!material) {
        return;
      }
      const isActive = hoverId === module.id;
      material.color.copy(
        isActive ? palette.active.color : palette.wire.color,
      );
      material.opacity = isActive ? palette.active.opacity : palette.wire.opacity;
    });

    labelMaterials.current.forEach((material) => {
      material.opacity = palette.label.opacity;
    });

    packetMeshes.current.forEach((mesh, index) => {
      mesh.position.copy(config.trunkCurve.getPointAt(packetOffsets[index]));
      mesh.visible = false;
    });

    fanMeshes.current.forEach((mesh) => {
      mesh.visible = false;
    });

    tileMeshes.current.forEach((mesh, index) => {
      mesh.position.copy(config.rackSlots[index]);
      const material = mesh.material as THREE.Material & { opacity?: number };
      if (material && "opacity" in material) {
        material.opacity = 0.55;
      }
      mesh.visible = true;
    });

    stampMaterials.current.forEach((material) => {
      material.opacity = 0;
    });

    if (ringRef.current) {
      ringRef.current.visible = false;
    }
  }, [reducedMotion, palette, config, packetOffsets, hoveredModule, wireLines]);

  const showSecondaryLabels = !config.isCompact;

  return (
    <group ref={groupRef} rotation={rigRotation}>
      {config.wires.map((wire, index) => {
        const wireLine = wireLines[index];
        if (!wireLine) {
          return null;
        }
        const { geometry } = wireLine;
        return (
          <threeLine key={`${wire.from}-${wire.to}`} geometry={geometry}>
            <lineBasicMaterial
              ref={(material: THREE.LineBasicMaterial | null) => {
                if (material) {
                  wireMaterials.current[index] = material;
                }
              }}
              color={palette.wire.color}
              transparent
              opacity={0}
            />
          </threeLine>
        );
      })}

      {config.outputCurves.map((_, index) => {
        const fanLine = fanLines[index];
        if (!fanLine) {
          return null;
        }
        const { geometry } = fanLine;
        return (
          <threeLine key={`fan-line-${index}`} geometry={geometry}>
            <lineBasicMaterial
              ref={(material: THREE.LineBasicMaterial | null) => {
                if (material) {
                  fanLineMaterials.current[index] = material;
                }
              }}
              color={palette.wireMuted.color}
              transparent
              opacity={0}
            />
          </threeLine>
        );
      })}

      {config.modules.map((module, index) => {
        const edges = moduleEdges[index];
        const labelVisible =
          module.labelPriority === "primary" || showSecondaryLabels;
        const labelPosition: [number, number, number] = [
          module.position.x,
          module.position.y + module.size[1] / 2 + 0.35,
          module.position.z + 0.05,
        ];

        return (
          <group key={module.id} position={module.position}>
            <lineSegments geometry={edges}>
              <lineBasicMaterial
                ref={(material: THREE.LineBasicMaterial | null) => {
                  if (material) {
                    moduleMaterials.current[index] = material;
                  }
                }}
                color={palette.wire.color}
                transparent
                opacity={0}
              />
            </lineSegments>

            {module.accent === "core" && (
              <lineSegments geometry={coreEdges[index] ?? edges}>
                <lineBasicMaterial
                  color={palette.active.color}
                  transparent
                  opacity={palette.active.opacity * 0.7}
                />
              </lineSegments>
            )}

            {module.accent === "shield" && (
              <lineSegments
                geometry={shieldEdges}
                position={[0, module.size[1] / 2 + 0.25, 0]}
              >
                <lineBasicMaterial
                  color={palette.active.color}
                  transparent
                  opacity={palette.active.opacity * 0.6}
                />
              </lineSegments>
            )}

            {module.accent === "hub" && (
              <lineSegments
                geometry={hubEdges}
                position={[module.size[0] / 2 - 0.2, 0.1, 0]}
              >
                <lineBasicMaterial
                  color={palette.active.color}
                  transparent
                  opacity={palette.active.opacity * 0.6}
                />
              </lineSegments>
            )}

            {labelVisible && (
              <TextLabel
                text={module.label}
                position={labelPosition}
                color={palette.label.css}
                scale={config.isCompact ? 0.88 : 1.02}
                registerMaterial={(material) => {
                  labelMaterials.current[index] = material;
                }}
              />
            )}

            {interactive && module.headingId && (
              <mesh
                position={[0, 0, 0]}
                onPointerOver={(event: ThreeEvent<PointerEvent>) => {
                  event.stopPropagation();
                  onModuleHover(module.id);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(event: ThreeEvent<PointerEvent>) => {
                  event.stopPropagation();
                  onModuleHover(null);
                  document.body.style.cursor = "auto";
                }}
                onClick={(event: ThreeEvent<PointerEvent>) => {
                  event.stopPropagation();
                  onModuleClick(module.id);
                }}
              >
                <boxGeometry
                  args={[module.size[0] + 0.2, module.size[1] + 0.2, 1.4]}
                />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
            )}
          </group>
        );
      })}

      {splitmixModule && (
        <mesh ref={ringRef} position={splitmixModule.position}>
          <ringGeometry args={[0.45, 0.52, 48]} />
          <meshBasicMaterial
            color={palette.active.color}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {packetOffsets.map((_, index) => (
        <mesh
          key={`packet-${index}`}
          ref={(mesh: THREE.Mesh | null) => {
            if (mesh) {
              packetMeshes.current[index] = mesh;
            }
          }}
        >
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshBasicMaterial
            color={palette.packet.color}
            transparent
            opacity={palette.packet.opacity}
          />
        </mesh>
      ))}

      {config.outputCurves.map((_, index) => (
        <mesh
          key={`fan-${index}`}
          ref={(mesh: THREE.Mesh | null) => {
            if (mesh) {
              fanMeshes.current[index] = mesh;
            }
          }}
        >
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshBasicMaterial
            color={palette.active.color}
            transparent
            opacity={palette.active.opacity}
          />
        </mesh>
      ))}

      {config.rackSlots.map((slot, index) => (
        <mesh
          key={`tile-${index}`}
          ref={(mesh: THREE.Mesh | null) => {
            if (mesh) {
              tileMeshes.current[index] = mesh;
            }
          }}
          position={slot}
        >
          <boxGeometry args={[0.46, 0.16, 0.05]} />
          <meshBasicMaterial
            color={palette.wire.color}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      <TextLabel
        text="seed"
        position={[
          config.rack.position.x + 0.3,
          config.rack.position.y + config.rack.size[1] / 2 + 0.25,
          config.rack.position.z + 0.2,
        ]}
        color={palette.labelMuted.css}
        scale={0.65}
        registerMaterial={(material) => {
          stampMaterials.current[0] = material;
        }}
      />
      <TextLabel
        text="version"
        position={[
          config.rack.position.x + 0.6,
          config.rack.position.y + config.rack.size[1] / 2 + 0.42,
          config.rack.position.z + 0.2,
        ]}
        color={palette.labelMuted.css}
        scale={0.6}
        registerMaterial={(material) => {
          stampMaterials.current[1] = material;
        }}
      />
      <TextLabel
        text="digest"
        position={[
          config.rack.position.x + 0.9,
          config.rack.position.y + config.rack.size[1] / 2 + 0.25,
          config.rack.position.z + 0.2,
        ]}
        color={palette.labelMuted.css}
        scale={0.6}
        registerMaterial={(material) => {
          stampMaterials.current[2] = material;
        }}
      />
    </group>
  );
};

const headingMap: Record<ModuleId, string | undefined> = {
  models: "architecture",
  discovery: "architecture",
  sandbox: "reliability-safety",
  strategies: "architecture",
  providers: "architecture",
  builder: "determinism-control",
  splitmix64: "determinism-control",
  emitters: "generation-emitters",
  artifacts: "generation-emitters",
};

export const PydanticFixturegenHero: FC<PydanticFixturegenHeroProps> = ({
  variant = "hero",
  className,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [palette, setPalette] = useState<Palette>(() =>
    derivePalette(null),
  );
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<ModuleId | null>(null);
  const [canRender] = useState(() => supportsWebGL());
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory ?? 8;
    return cores <= 4 || memory <= 4;
  }, []);

  const rigConfig = useMemo(
    () => buildRigConfig(variant, isMobile, isLowPower),
    [variant, isMobile, isLowPower],
  );
  const cameraZoom = rigConfig.isCompact ? 49 : 54;

  const shouldAnimate = isVisible && !reducedMotion;
  const containerClassName = [
    "relative h-full w-full [&>canvas]:!block [&>canvas]:!h-full [&>canvas]:!w-full [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const updatePalette = () => {
      setPalette(derivePalette(element));
    };

    updatePalette();
    window.addEventListener("resize", updatePalette);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updatePalette);

    return () => {
      window.removeEventListener("resize", updatePalette);
      mediaQuery.removeEventListener("change", updatePalette);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || reducedMotion || event.pointerType === "touch") {
      return;
    }
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    pointerRef.current = { x: clamp(x, -1, 1), y: clamp(-y, -1, 1) };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    document.body.style.cursor = "auto";
  };

  const handleModuleClick = (moduleId: ModuleId) => {
    const headingId = headingMap[moduleId];
    if (!headingId) {
      return;
    }
    const element = document.getElementById(headingId);
    if (!element) {
      return;
    }
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label="Wireframe deterministic pipeline machine"
    >
      {canRender ? (
        <Canvas
          className="absolute inset-0"
          dpr={
            typeof window === "undefined"
              ? 1
              : Math.min(window.devicePixelRatio, 1.5)
          }
          frameloop="demand"
          orthographic
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 12], zoom: cameraZoom, near: 0.1, far: 100 }}
        >
          <RigScene
            palette={palette}
            config={rigConfig}
            cameraZoom={cameraZoom}
            active={shouldAnimate}
            reducedMotion={!!reducedMotion}
            hoveredModule={hoveredModule}
            interactive={interactive}
            pointerRef={pointerRef}
            onModuleHover={setHoveredModule}
            onModuleClick={handleModuleClick}
          />
          <RigAnimator active={shouldAnimate} />
          <InvalidateOnChange deps={[hoveredModule, palette, rigConfig]} />
        </Canvas>
      ) : (
        <PydanticFixturegenFallback palette={palette} />
      )}
    </div>
  );
};
