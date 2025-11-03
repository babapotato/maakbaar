"use client";

import { Canvas } from "@react-three/fiber";
import { ShaderPlane, EnergyRing } from "@/components/ui/background-paper-shaders";

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ShaderPlane position={[0, 0, 0]} color1="#0ea5e9" color2="#ffffff" />
        <EnergyRing radius={0.9} position={[0, 0, 0.1]} />
      </Canvas>
    </div>
  );
}


