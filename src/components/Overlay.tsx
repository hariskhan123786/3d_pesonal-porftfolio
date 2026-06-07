"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Transform scroll progress for Section 1 (Center)
  // Visible at start [0 - 0.25]
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -120]);

  // Transform scroll progress for Section 2 (Left Aligned)
  // Visible during [0.25 - 0.55]
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.55], [80, 0, 0, -80]);

  // Transform scroll progress for Section 3 (Right Aligned)
  // Visible during [0.55 - 0.85]
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.6, 0.78, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.6, 0.78, 0.85], [80, 0, 0, -80]);

  // Scroll down indicator opacity (fades out early)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Section 1: Intro (Centered) */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="max-w-4xl space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.3em] text-blue-500 font-mono"
          >
            Full Stack Web Developer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none"
          >
            HARIS KHAN <br />
            <span className="text-stroke-white text-transparent">PORTFOLIO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-neutral-400 font-light text-base md:text-xl max-w-lg mx-auto tracking-wide"
          >
            Turning ideas into interactive web experiences with custom code and modern architectures.
          </motion.p>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 flex flex-col items-center space-y-2 text-neutral-400 font-mono text-xs tracking-[0.2em]"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-neutral-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section 2: Statement 1 (Left aligned) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="fixed inset-0 flex items-center justify-start p-8 sm:p-16 md:p-24"
      >
        <div className="max-w-2xl text-left space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono">Core Vision</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            Crafting clean <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              and functional
            </span>{" "}
            <br />
            web solutions.
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-lg">
            Focusing on user-centric layouts, database architectures, and custom workflows that solve business challenges efficiently.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Statement 2 (Right aligned) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="fixed inset-0 flex items-center justify-end p-8 sm:p-16 md:p-24"
      >
        <div className="max-w-2xl text-right space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-mono">Execution Standards</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            Responsive, <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              reliable,
            </span>{" "}
            and <br />
            ready to code.
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-lg ml-auto">
            From design mockups to production-ready applications, I deliver optimized code templates, Laravel platforms, and backend operations.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
