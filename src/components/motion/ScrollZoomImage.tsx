import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export interface ScrollZoomImageProps {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  /** Scale factor at [start entering bottom, center viewport, exit top]. Default: [0.90, 1.08, 0.94] */
  scaleRange?: [number, number, number];
  /** Opacity factor at [start entering, in view, still in view, exiting]. Default: [0.35, 1, 1, 0.35] */
  opacityRange?: [number, number, number, number];
  /** Enable scroll-linked fade transitions (default: true) */
  fadeEffect?: boolean;
  /** Subtle vertical parallax translation (default: true) */
  parallax?: boolean;
  /** Additional interactive zoom on hover (default: true) */
  hoverZoom?: boolean;
  caption?: string;
  overlay?: React.ReactNode;
  onClick?: () => void;
  priority?: boolean;
}

/**
 * ScrollZoomImage
 * Provides fluid scroll-driven zoom in/out and fade effect transitions
 * as the element traverses the viewport.
 */
export const ScrollZoomImage: React.FC<ScrollZoomImageProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-4/3',
  scaleRange = [0.90, 1.08, 0.94],
  opacityRange = [0.35, 1, 1, 0.35],
  fadeEffect = true,
  parallax = true,
  hoverZoom = true,
  caption,
  overlay,
  onClick,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasError, setHasError] = useState(false);
  const [retryPublic, setRetryPublic] = useState(false);

  // Bind scroll progress from when element enters bottom of viewport to when it leaves top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Spring physics for silky, stutter-free scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.18
  });

  // Continuous zoom in & out transform
  // Progress 0 (bottom enters) -> 0.5 (center) -> 1.0 (top leaves)
  const scaleTransform = useTransform(smoothProgress, [0, 0.5, 1], scaleRange);

  // Continuous fade in & out transform
  const opacityTransform = useTransform(
    smoothProgress, 
    [0, 0.22, 0.78, 1], 
    opacityRange
  );

  // Subtle Parallax Y translation to add depth
  const yTransform = useTransform(smoothProgress, [0, 1], [-18, 18]);

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

  const effectiveSrc = retryPublic && typeof src === 'string'
    ? `/images/${src.split('/').pop()}`
    : src;

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-[#F5F1EB] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-4 text-center ${containerClassName}`}
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

  // If prefers-reduced-motion is enabled, render standard static image
  if (shouldReduceMotion) {
    return (
      <div 
        ref={containerRef}
        onClick={onClick}
        className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}
      >
        <img
          src={effectiveSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${className}`}
        />
        {overlay}
        {caption && (
          <p className="mt-2 text-xs tracking-wider text-[#827C75] dark:text-[#A8A29A]">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden group transform-gpu ${aspectRatio} ${containerClassName}`}
    >
      {/* Scroll-driven Zoom In/Out & Fade wrapper */}
      <motion.div
        style={{
          scale: scaleTransform,
          opacity: fadeEffect ? opacityTransform : 1,
          y: parallax ? yTransform : 0,
          willChange: 'transform, opacity'
        }}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.img
          src={effectiveSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={handleError}
          referrerPolicy="no-referrer"
          whileHover={hoverZoom ? { scale: 1.05 } : undefined}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full object-cover transform-gpu ${className}`}
        />
      </motion.div>

      {/* Optional Overlay slot */}
      {overlay}

      {/* Optional Editorial Caption */}
      {caption && (
        <p className="mt-2 text-xs tracking-wider text-[#827C75] dark:text-[#A8A29A]">
          {caption}
        </p>
      )}
    </div>
  );
};
