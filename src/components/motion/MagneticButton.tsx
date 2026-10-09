import React, { useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { MOTION_EASINGS } from '../../motion/motionTokens';

export interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  pullFactor?: number; // 0.1 to 0.4
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

/**
 * Reusable Magnetic Button with spring physics.
 * Pulls subtly toward cursor position within its bounding box.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  pullFactor = 0.28,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(0, MOTION_EASINGS.springSoft);
  const springY = useSpring(0, MOTION_EASINGS.springSoft);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * pullFactor;
    const distanceY = (e.clientY - centerY) * pullFactor;

    springX.set(distanceX);
    springY.set(distanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    springX.set(0);
    springY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  if (shouldReduceMotion) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        willChange: 'transform',
      }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-shadow ${className}`}
    >
      {/* Background glow expansion on hover */}
      <span
        className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
