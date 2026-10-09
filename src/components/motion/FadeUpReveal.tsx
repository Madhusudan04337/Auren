import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../motion/motionTokens';

export interface FadeUpRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportOnce?: boolean;
  threshold?: number;
  easing?: readonly [number, number, number, number] | any;
  staggerChildren?: number;
  as?: keyof typeof motion;
}

/**
 * Reusable, GPU-accelerated Fade-Up Reveal component.
 * - Respects user's prefers-reduced-motion automatically.
 * - Uses only hardware-accelerated transform: translate3d and opacity.
 */
export const FadeUpReveal: React.FC<FadeUpRevealProps> = ({
  children,
  delay = 0,
  duration = MOTION_DURATIONS.standard,
  distance = 28,
  className = '',
  viewportOnce = true,
  threshold = 0.15,
  easing = MOTION_EASINGS.editorial,
  staggerChildren,
  as = 'div'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion as any)[as] || motion.div;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: easing,
        ...(staggerChildren ? { staggerChildren, delayChildren: delay } : {})
      }
    }
  };

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, amount: threshold }}
      variants={containerVariants}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </MotionComponent>
  );
};
