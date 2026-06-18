"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LABELS = [
  "Own limited music releases.",
  "Support artists. Share their growth.",
  "Your collection is your portfolio.",
  "Live value from real fan demand.",
  "Music drops with real scarcity.",
];

export default function FeatureLabel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LABELS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "1.5em",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{
            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
            fontWeight: 400,
            color: "#888884",
            display: "block",
          }}
        >
          {LABELS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
