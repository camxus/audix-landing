"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES: { segments: { text: string; accent?: boolean }[] }[] = [
  {
    segments: [
      { text: "Own", accent: true },
      { text: " music, " },
      { text: "Support", accent: true },
      { text: " artists" },
    ],
  },
  {
    segments: [
      { text: "Invest", accent: true },
      { text: " in your favourite artists" },
    ],
  },
];

export default function HeroTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LINES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const line = LINES[index];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "4.5rem",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            color: "#F0F0EE",
            marginTop: "0.6rem",
            marginBottom: 0,
          }}
        >
          {line.segments.map((seg, i) => (
            <span
              key={i}
              style={{
                color: seg.accent ? "#7F77DD" : "#F0F0EE",
              }}
            >
              {seg.text}
            </span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
