import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
  /** Whether to enable scroll-driven zoom in/out and fade transitions. Defaults to true. */
  scrollZoom?: boolean;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  containerClassName = '',
  scrollZoom = true,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryPublic, setRetryPublic] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Silky spring physics for smooth scroll scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.18
  });

  // Zoom in & out on scroll:
  // Progress 0 (entering from bottom) -> 0.5 (center of viewport) -> 1.0 (exiting top)
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.06, 0.94]);

  // Fade transition on scroll:
  // Starts at 0.4 -> reaches full opacity 1.0 in view -> fades gently to 0.45 as it scrolls away
  const opacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [0.45, 1, 1, 0.45]);

  // If initial src fails, try resolving from public/images/
  const handleError = () => {
    if (!retryPublic && typeof src === 'string') {
      const filename = src.split('/').pop();
      if (filename) {
        setRetryPublic(true);
        return;
      }
    }
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-[#F5F1EB] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-4 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-[#B89B6C] dark:text-[#D4AF37] mb-2 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="font-serif text-xs text-[#121212] dark:text-[#F5F3EF] font-medium tracking-wide">
          {alt || 'AUREN Creation'}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#121212]/50 dark:text-[#F5F3EF]/50 mt-0.5">
          {fallbackText || 'Haute Formulation'}
        </span>
      </div>
    );
  }

  const effectiveSrc = retryPublic && typeof src === 'string'
    ? `/images/${src.split('/').pop()}`
    : src;

  // If prefers-reduced-motion is true or scrollZoom is explicitly disabled, render plain image
  if (shouldReduceMotion || !scrollZoom) {
    return (
      <img
        src={effectiveSrc}
        alt={alt}
        onError={handleError}
        referrerPolicy="no-referrer"
        className={className}
        {...props}
      />
    );
  }

  // Scroll Zoom In / Out and Fade effect transitions
  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${containerClassName}`}
    >
      <motion.div
        style={{
          scale,
          opacity,
          willChange: 'transform, opacity'
        }}
        className="w-full h-full transform-gpu"
      >
        <img
          src={effectiveSrc}
          alt={alt}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`w-full h-full transform-gpu ${className}`}
          {...props}
        />
      </motion.div>
    </div>
  );
};
