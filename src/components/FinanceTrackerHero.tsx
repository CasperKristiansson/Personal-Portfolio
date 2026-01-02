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
            axesHelper="off"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.1}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff945e"
            color2="#dbccb8"
            color3="#b9bee1"
            destination="onCanvas"
            embedMode="off"
            envPreset="lobby"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="on"
            lightType="3d"
            pixelDensity={1.5}
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
      </div>
    </div>
  );
};
