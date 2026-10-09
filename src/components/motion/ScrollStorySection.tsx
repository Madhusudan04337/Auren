import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { MOTION_EASINGS } from '../../motion/motionTokens';

export interface StoryStep {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  visualImage: string;
  visualTag: string;
  accentColor?: string;
}

export interface ScrollStorySectionProps {
  steps: StoryStep[];
  headlineKicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Reusable Scroll Storytelling Section
 * Features:
 * - Pinned desktop stage on the right, scrubbed narrative timeline on the left
 * - Real-time scroll position tracking that syncs active step
 * - Smooth step jump triggers & progress gauge
 * - Mobile responsive stack with effortless readability
 */
export const ScrollStorySection: React.FC<ScrollStorySectionProps> = ({
  steps,
  headlineKicker = 'Cellular Synthesis',
  title = 'From Wild Alpine Flora to Deep Dermal Delivery',
  subtitle = 'Observe how our proprietary bio-fermentation isolates botanical active molecules and locks moisture across skin layers.',
  className = '',
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    mass: 0.1,
  });

  // Observe which narrative milestone is currently centered in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!stepRefs.current.length) return;
      const midPoint = window.innerHeight * 0.45;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= midPoint && rect.bottom >= midPoint) {
          setActiveStepIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    const target = stepRefs.current[index];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: topOffset, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <div ref={containerRef} className={`relative py-16 lg:py-28 ${className}`}>
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24 text-center">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#B89B6C] dark:text-[#D4AF37] mb-3 block">
          {headlineKicker}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#121212] dark:text-[#F5F3EF] max-w-3xl mx-auto mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#524E49] dark:text-[#A8A29A] max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Story Scrubber Controls */}
        <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-xs">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => scrollToStep(idx)}
              className={`px-4 py-1.5 text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer font-medium ${
                activeStepIndex === idx
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] shadow-sm'
                  : 'text-[#827C75] dark:text-[#736E67] hover:text-[#121212] dark:hover:text-[#F5F3EF]'
              }`}
            >
              Phase 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Narrative Story on Left, Pinned Stage on Right */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Milestones */}
          <div className="lg:col-span-6 space-y-24 lg:space-y-36 pb-20">
            {steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-white dark:bg-[#141414] border-[#B89B6C]/40 dark:border-[#D4AF37]/40 shadow-lg'
                      : 'bg-[#FAF8F5]/50 dark:bg-[#0E0E0E]/50 border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2E2E2E] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                      Phase 0{idx + 1}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#827C75] dark:text-[#736E67]">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#B89B6C] dark:text-[#D4AF37] font-medium mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-[#524E49] dark:text-[#A8A29A] leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>

                  {/* Scientific Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5DFD5]/60 dark:border-[#262626]">
                    {step.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="font-serif text-xl sm:text-2xl text-[#121212] dark:text-[#F5F3EF] font-medium">
                          {m.value}
                        </div>
                        <div className="text-xs text-[#827C75] dark:text-[#736E67] uppercase tracking-wider mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Inline visual shown on mobile only */}
                  <div className="lg:hidden mt-6 rounded-xl overflow-hidden aspect-[16/10] relative">
                    <img
                      src={step.visualImage}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-xs text-white uppercase tracking-wider font-medium">
                        {step.visualTag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pinned Desktop Stage */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#141414] shadow-xl p-3">
              
              {/* Scrubbed Overall Progress Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#E5DFD5]/40 dark:bg-[#262626] z-30">
                <motion.div
                  className="h-full bg-[#B89B6C] dark:bg-[#D4AF37]"
                  style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
                />
              </div>

              {/* Pinned Stage Canvas */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-[#0A0A0A]">
                {steps.map((step, idx) => {
                  const isCurrent = activeStepIndex === idx;

                  return (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 1.05,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0.01 : 0.65,
                        ease: MOTION_EASINGS.editorial,
                      }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <img
                        src={step.visualImage}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Ambient floating badge on stage */}
                      <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs tracking-wider uppercase font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                        {step.visualTag}
                      </div>

                      {/* Bottom Stage Details */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                          Microscopic Cellular Analysis · Phase 0{idx + 1}
                        </div>
                        <div className="font-serif text-2xl font-light">
                          {step.title}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stage Footer Spec Info */}
              <div className="p-4 bg-[#FAF8F5]/80 dark:bg-[#121212]/80 mt-2 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#827C75] dark:text-[#736E67]">
                    0{activeStepIndex + 1} / 0{steps.length}
                  </span>
                  <span className="text-[#524E49] dark:text-[#A8A29A]">
                    Active formulation step
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#B89B6C] dark:text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6C] dark:bg-[#D4AF37]" />
                  GPU-Accelerated Crossfade
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
