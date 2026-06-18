"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MeshGradient = dynamic(
  () =>
    import("@paper-design/shaders-react").then((m) => ({
      default: m.MeshGradient,
    })),
  { ssr: false },
);

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function AnimatedGradient() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #0d0b1f 0%, #1a1540 30%, #2a2060 55%, #0d0b1f 100%)",
        backgroundSize: "300% 300%",
        animation: "audixGradientShift 10s ease infinite",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 70% 45%, rgba(127,119,221,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 50% at 30% 70%, rgba(29,20,90,0.3) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export default function ShaderBackground() {
  const [webgl, setWebGL] = useState(false);
  const [hideFallback, setHideFallback] = useState(false);

  useEffect(() => {
    const supported = canUseWebGL();

    setWebGL(supported);

    if (supported) {
      const timeout = setTimeout(() => {
        setHideFallback(true);
      }, 1700);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <motion.div
      className="animate-fadein-1000"
      transition={{
        duration: 1,
      }}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* Mesh gradient underneath */}
      {webgl && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <MeshGradient
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            colors={["#0d0b1f", "#1a1540", "#7F77DD", "#141414"]}
            speed={0.3}
          />
        </motion.div>
      )}

      {/* Fallback stays visible until shader has had time to initialize */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: hideFallback ? 0 : 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <AnimatedGradient />
      </motion.div>
    </motion.div>
  );
}
