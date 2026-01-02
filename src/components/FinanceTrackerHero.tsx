import React from "react";
import clsx from "clsx";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useReducedMotion } from "framer-motion";

type FinanceTrackerHeroProps = {
  className?: string;
};

export const FinanceTrackerHero: React.FC<FinanceTrackerHeroProps> = ({
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={clsx("relative h-full w-full overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0 }}
          pixelDensity={1.5}
        >
          <ShaderGradient
            animate={prefersReducedMotion ? "off" : "on"}
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.1}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff945e"
            color2="#dbccb8"
            color3="#b9bee1"
            envPreset="lobby"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="plane"
            uAmplitude={1}
            uDensity={2.2}
            uFrequency={5.5}
            uSpeed={0.2}
            uStrength={4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/25 to-slate-950/45" />
        <div className="relative z-10 flex h-full w-full max-w-4xl flex-col items-center gap-8 px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-lg font-semibold tracking-tight text-white drop-shadow-[0_14px_45px_rgba(0,0,0,0.35)]">
              Money clarity in one calm space
            </h1>
            <h2 className="text-sm font-medium text-white/90">
              Track accounts, budgets, and goals with a focused, beautiful
              overview.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
