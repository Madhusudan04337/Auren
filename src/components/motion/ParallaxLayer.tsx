import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Speed factor: negative moves opposite to scroll, positive moves with scroll. e.g. 0.2, -0.15 */
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  /** Optional container reference to compute relative viewport scroll, defaults to global window scroll */
  targetRef?: React.RefObject<HTMLElement | null>;
  springDamping?: number;
  springStiffness?: number;
}

/**
 * Reusable GPU-accelerated Parallax Layer component.
 * Uses useScroll + useTransform + useSpring for 60fps/120fps hardware acceleration.
 * Avoids layout thrashing by operating exclusively on transform: translate3d.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.25,
  direction = 'vertical',
  className = '',
  style = {},
  targetRef,
  springDamping = 30,
  springStiffness = 200,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const internalRef = useRef<HTMLDivElement>(null);
  const activeRef = targetRef || internalRef;

  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ['start end', 'end start'],
  });

  // Calculate pixel displacement range based on speed multiplier
  // At speed 0.2, moves from -60px to +60px as it passes through viewport
  const maxDisplacement = speed * 260;
  const rawTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [-maxDisplacement, maxDisplacement]
  );

  // Smooth out jitter with a subtle spring
  const smoothTransform = useSpring(rawTransform, {
    damping: springDamping,
    stiffness: springStiffness,
    mass: 0.2,
  });

  if (shouldReduceMotion) {
    return (
      <div ref={internalRef} className={className} style={style}>
        {children}
      </div>
    );
  }

  const transformStyle = direction === 'vertical'
    ? { y: smoothTransform }
    : { x: smoothTransform };

  return (
    <motion.div
      ref={internalRef}
      className={className}
      style={{
        ...style,
        ...transformStyle,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};
