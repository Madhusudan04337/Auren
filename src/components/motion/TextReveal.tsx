import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_EASINGS } from '../../motion/motionTokens';

export interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  mode?: 'words' | 'characters';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Editorial Text Reveal with masked overflow clip.
 * Renders words or characters rising out of an overflow-hidden mask.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.65,
  mode = 'words',
  as = 'div'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = (motion as any)[as] || motion.div;

  if (shouldReduceMotion) {
    const PlainTag = as as any;
    return <PlainTag className={className}>{text}</PlainTag>;
  }

  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
      rotateX: -15,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: '800px' }}
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden pb-[0.08em] mr-[0.25em] last:mr-0"
        >
          <motion.span
            variants={childVariants}
            className={`inline-block origin-bottom ${wordClassName}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {item}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
