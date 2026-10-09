import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_EASINGS } from '../../motion/motionTokens';

export interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  duration?: number;
  aspectRatio?: string;
  caption?: string;
}

/**
 * Reusable luxury image reveal with hardware-accelerated curtain clip and subtle scale-down.
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  delay = 0.1,
  duration = 0.85,
  aspectRatio = 'aspect-[4/5]',
  caption,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${aspectRatio} ${imgClassName}`}
        />
        {caption && (
          <p className="mt-2 text-xs tracking-wider text-[#827C75] dark:text-[#A8A29A]">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Curtain Mask Reveal */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration,
          delay,
          ease: MOTION_EASINGS.editorial,
        }}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: duration * 1.25,
            delay,
            ease: MOTION_EASINGS.editorial,
          }}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${aspectRatio} ${imgClassName}`}
          style={{ willChange: 'transform' }}
        />
      </motion.div>
      {caption && (
        <p className="mt-2 text-xs tracking-wider text-[#827C75] dark:text-[#A8A29A]">
          {caption}
        </p>
      )}
    </div>
  );
};
