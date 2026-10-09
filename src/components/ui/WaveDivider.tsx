import React from 'react';

export interface WaveDividerProps {
  position?: 'top' | 'bottom';
  className?: string;
  variant?: 'wave' | 'gentle' | 'asymmetric' | 'crest';
  fillClass?: string;
  strokeClass?: string;
  heightClass?: string;
  flipX?: boolean;
}

/**
 * WaveDivider
 * Renders smooth organic SVG curved wave dividers between sections to eliminate boxy lines
 * and transition smoothly between tone shifts in the luxury aesthetic.
 */
export const WaveDivider: React.FC<WaveDividerProps> = ({
  position = 'bottom',
  className = '',
  variant = 'wave',
  fillClass = 'text-[#FAF8F5] dark:text-[#0C0C0C]',
  strokeClass = 'text-[#E5DFD5]/70 dark:text-[#262626]/70',
  heightClass = 'h-10 sm:h-14 lg:h-20',
  flipX = false,
}) => {
  // SVG path definitions for organic waves
  let pathD = '';
  let strokeD = '';

  if (variant === 'wave') {
    // Undulating silky wave
    pathD = position === 'bottom'
      ? 'M0,0 C320,55 580,10 920,45 C1240,75 1380,25 1440,35 L1440,80 L0,80 Z'
      : 'M0,80 C320,25 580,70 920,35 C1240,5 1380,55 1440,45 L1440,0 L0,0 Z';
    strokeD = position === 'bottom'
      ? 'M0,0 C320,55 580,10 920,45 C1240,75 1380,25 1440,35'
      : 'M0,80 C320,25 580,70 920,35 C1240,5 1380,55 1440,45';
  } else if (variant === 'gentle') {
    // Soft wide organic curve
    pathD = position === 'bottom'
      ? 'M0,15 C420,60 1020,0 1440,35 L1440,80 L0,80 Z'
      : 'M0,65 C420,20 1020,80 1440,45 L1440,0 L0,0 Z';
    strokeD = position === 'bottom'
      ? 'M0,15 C420,60 1020,0 1440,35'
      : 'M0,65 C420,20 1020,80 1440,45';
  } else if (variant === 'asymmetric') {
    // Elegant sweeping curve reminiscent of cosmetic emulsion spreading
    pathD = position === 'bottom'
      ? 'M0,0 C260,70 640,-10 1060,50 C1280,80 1390,40 1440,30 L1440,80 L0,80 Z'
      : 'M0,80 C260,10 640,90 1060,30 C1280,0 1390,40 1440,50 L1440,0 L0,0 Z';
    strokeD = position === 'bottom'
      ? 'M0,0 C260,70 640,-10 1060,50 C1280,80 1390,40 1440,30'
      : 'M0,80 C260,10 640,90 1060,30 C1280,0 1390,40 1440,50';
  } else {
    // Gentle crest
    pathD = position === 'bottom'
      ? 'M0,25 C360,75 720,15 1080,60 C1260,80 1380,50 1440,40 L1440,80 L0,80 Z'
      : 'M0,55 C360,5 720,65 1080,20 C1260,0 1380,30 1440,40 L1440,0 L0,0 Z';
    strokeD = position === 'bottom'
      ? 'M0,25 C360,75 720,15 1080,60 C1260,80 1380,50 1440,40'
      : 'M0,55 C360,5 720,65 1080,20 C1260,0 1380,30 1440,40';
  }

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none z-10 ${
        position === 'top' ? '-mb-px' : '-mt-px'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full ${heightClass} block ${flipX ? 'scale-x-[-1]' : ''}`}
      >
        <path d={pathD} fill="currentColor" className={fillClass} />
        {strokeClass && (
          <path
            d={strokeD}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={strokeClass}
          />
        )}
      </svg>
    </div>
  );
};
