import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export interface OrganicWaveBackgroundProps {
  variant?: 'hero' | 'editorial' | 'ambient' | 'subtle';
  className?: string;
  speed?: number;
  showOrbs?: boolean;
}

/**
 * OrganicWaveBackground
 * Renders layered fluid SVG waves and floating ambient organic shapes
 * with GPU-accelerated parallax scrolling effects, evoking biomimetic lipid bilayers,
 * liquid silk textures, and cellular water contours.
 */
export const OrganicWaveBackground: React.FC<OrganicWaveBackgroundProps> = ({
  variant = 'hero',
  className = '',
  speed = 0.2,
  showOrbs = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layered vertical parallax displacements
  const yWaveBack = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed * 120, speed * 120]
  );
  const yWaveMid = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [speed * 80, -speed * 80]
  );
  const yWaveFront = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed * 160, speed * 160]
  );
  const yOrb1 = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed * 200, speed * 100]
  );
  const yOrb2 = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [speed * 140, -speed * 180]
  );
  const rotateOrb = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-15, 25]
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 1. Floating Organic Ambient Glowing Orbs / Lipid Droplets (Parallax) */}
      {showOrbs && (
        <>
          {/* Top-Right Soft Amber/Gold Organic Glow */}
          <motion.div
            style={{ y: yOrb1, rotate: rotateOrb }}
            className="absolute -top-24 -right-24 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-[60%_40%_70%_30%/50%_60%_40%_50%] bg-gradient-to-br from-[#EFE3D3]/40 via-[#E5D7C3]/25 to-transparent dark:from-[#D4AF37]/10 dark:via-[#B89B6C]/5 dark:to-transparent blur-3xl opacity-80"
          />

          {/* Left Mid-Tier Cellular Lipid Emulsion Orb */}
          <motion.div
            style={{ y: yOrb2 }}
            className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-[40%_60%_50%_50%/60%_40%_60%_40%] bg-gradient-to-tr from-[#E8DDD0]/50 via-[#F2E8DC]/30 to-transparent dark:from-[#B89B6C]/10 dark:via-[#9C7F4A]/5 dark:to-transparent blur-3xl opacity-75"
          />

          {/* Bottom-Right Whispering Glow */}
          <motion.div
            style={{ y: yWaveMid }}
            className="absolute -bottom-20 right-1/4 w-72 h-72 sm:w-[380px] sm:h-[380px] rounded-[50%_50%_40%_60%/40%_60%_50%_50%] bg-gradient-to-tl from-[#F7EFE6]/40 via-[#EADECF]/20 to-transparent dark:from-[#D4AF37]/8 dark:via-transparent dark:to-transparent blur-2xl opacity-60"
          />
        </>
      )}

      {/* 2. Layered SVG Fluid Wave Contours */}
      {/* Background Deep Wave Ribbon */}
      <motion.div
        style={{ y: yWaveBack }}
        className="absolute inset-x-0 top-0 h-full opacity-35 dark:opacity-20 flex items-center justify-center pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full text-[#E5DFD5] dark:text-[#282520]"
        >
          <path
            d="M-40 220 C220 380 440 60 760 210 C1080 360 1260 120 1500 240 L1500 650 L-40 650 Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <path
            d="M-20 280 C260 140 520 420 840 240 C1160 80 1340 320 1480 260"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Mid-Tier Silky Wave Curvature */}
      <motion.div
        style={{ y: yWaveMid }}
        className="absolute inset-x-0 bottom-0 h-4/5 opacity-40 dark:opacity-25 pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full text-[#B89B6C] dark:text-[#D4AF37]"
        >
          <path
            d="M0 180 C320 80 540 280 860 160 C1180 40 1360 220 1460 170 L1460 450 L0 450 Z"
            fill="currentColor"
            fillOpacity="0.04"
          />
          <path
            d="M0 180 C320 80 540 280 860 160 C1180 40 1360 220 1460 170"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        </svg>
      </motion.div>

      {/* Front Subtle Wave Flow Ribbon */}
      {variant === 'hero' && (
        <motion.div
          style={{ y: yWaveFront }}
          className="absolute inset-x-0 -bottom-10 h-1/2 opacity-30 dark:opacity-15 pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full text-[#A08356] dark:text-[#D4AF37]"
          >
            <path
              d="M-20 140 C280 240 580 40 920 180 C1240 300 1380 120 1480 160"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
};
