import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Layers, Cpu, ShieldCheck, Code2 } from 'lucide-react';
import { MOTION_DURATIONS, MOTION_EASINGS, SECTION_MOTION_SPECS } from '../../motion/motionTokens';

interface StackArchitectureGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StackArchitectureGuide: React.FC<StackArchitectureGuideProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'tokens' | 'performance' | 'components'>('stack');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const codeSnippets = {
    fadeUp: `// Reusable FadeUpReveal.tsx with Framer Motion (Motion v12)
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const FadeUpReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  distance = 28,
  className = '',
}) => {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Editorial luxury ease
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};`,

    parallax: `// Reusable ParallaxLayer.tsx with GPU Transform & Spring Smoothing
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export const ParallaxLayer = ({
  children,
  speed = 0.25, // Multiplier: negative = counter-scroll, positive = along scroll
  className = '',
}) => {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-speed * 200, speed * 200]);
  const smoothY = useSpring(rawY, { damping: 28, stiffness: 180 });

  if (shouldReduce) return <div ref={ref} className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY, willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};`,

    scrollStory: `// Reusable ScrollStorySection.tsx with Pinned Desktop Stage
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'motion/react';

export const ScrollStorySection = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) setActiveStep(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Scrubbed Narrative Steps */}
      <div className="lg:col-span-6 space-y-32">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            ref={(el) => (stepRefs.current[idx] = el)}
            className={\`p-8 rounded-2xl transition-all duration-300 \${
              activeStep === idx ? 'bg-white shadow-xl border-amber-500' : 'opacity-50'
            }\`}
          >
            <h3 className="text-2xl font-serif">{step.title}</h3>
            <p className="mt-2 text-neutral-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Pinned Desktop Visual Stage */}
      <div className="hidden lg:block lg:col-span-6 sticky top-28 h-[480px]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900">
          {steps.map((step, idx) => (
            <motion.img
              key={step.id}
              src={step.image}
              initial={false}
              animate={{ opacity: activeStep === idx ? 1 : 0 }}
              transition={{ duration: shouldReduce ? 0.01 : 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#141414] rounded-3xl border border-[#E5DFD5] dark:border-[#262626] shadow-2xl flex flex-col overflow-hidden text-[#121212] dark:text-[#F5F3EF]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5]/70 dark:border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2E2E2E]">
              <Sparkles className="w-5 h-5 text-[#B89B6C] dark:text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-light">
                Motion Architecture & Implementation Stack
              </h2>
              <p className="text-xs text-[#827C75] dark:text-[#A8A29A]">
                Production specification, ecosystem stack comparison, and reusable component patterns.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF8F5] dark:hover:bg-[#1E1E1E] text-[#827C75] dark:text-[#A8A29A] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5DFD5]/60 dark:border-[#262626] px-6 bg-[#FAF8F5] dark:bg-[#0E0E0E] text-xs font-medium">
          {[
            { id: 'stack', label: 'Stack Recommendation', icon: Layers },
            { id: 'tokens', label: 'Motion Tokens System', icon: Sparkles },
            { id: 'performance', label: 'Performance & WCAG', icon: ShieldCheck },
            { id: 'components', label: 'Component Code', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#B89B6C] dark:border-[#D4AF37] text-[#121212] dark:text-white font-semibold'
                    : 'border-transparent text-[#827C75] dark:text-[#736E67] hover:text-[#121212] dark:hover:text-[#F5F3EF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: STACK RECOMMENDATION */}
          {activeTab === 'stack' && (
            <div className="space-y-6 text-sm">
              <div className="p-4 rounded-2xl bg-[#B89B6C]/10 dark:bg-[#D4AF37]/10 border border-[#B89B6C]/30 dark:border-[#D4AF37]/30">
                <span className="font-serif font-medium text-[#121212] dark:text-[#F5F3EF]">
                  Recommended Modern Stack: Framer Motion (Motion v12) + Optional Lenis
                </span>
                <p className="text-xs text-[#524E49] dark:text-[#A8A29A] mt-1 leading-relaxed">
                  For React 19 web applications with component-driven state, <strong>Motion (formerly Framer Motion)</strong> provides declarative lifecycle hooks (`useScroll`, `useTransform`, `useSpring`, `useInView`), native gestures, and automatic layout transitions without DOM-fighting or cleanup boilerplate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Framer Motion */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base font-semibold">Framer Motion / Motion v12</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Top Choice for React
                    </span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• Declarative JSX syntax (`motion.div`, `whileInView`, `whileHover`).</li>
                    <li>• Built-in `useReducedMotion()` for instant zero-friction accessibility.</li>
                    <li>• Seamless exit animations with `AnimatePresence`.</li>
                    <li>• Zero sync issues with React reconciliation or virtual DOM re-renders.</li>
                  </ul>
                </div>

                {/* GSAP + ScrollTrigger */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base font-semibold">GSAP + ScrollTrigger</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      Best for Complex Timelines
                    </span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• Unmatched multi-timeline orchestration (scrubbing nested sequences).</li>
                    <li>• Handles complex pin pinning across arbitrary parent DOM boundaries.</li>
                    <li>• Requires `useGSAP()` or explicit context cleanup to avoid memory leaks.</li>
                    <li>• Slightly heavier bundle (~45kB+ with ScrollTrigger plugin).</li>
                  </ul>
                </div>

                {/* Lenis Smooth Scroll */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base font-semibold">Lenis (Studio Freight)</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      Best Smooth Scroll Layer
                    </span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• Normalizes wheel velocity across Windows mice, Mac trackpads, and mobile.</li>
                    <li>• Keeps native keyboard navigation and accessibility intact.</li>
                    <li>• Integrates directly with `useScroll` or `ScrollTrigger.update()`.</li>
                    <li>• Lightweight (~3kB), does not hijack native document layout.</li>
                  </ul>
                </div>

                {/* CSS Scroll-Driven Animations */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base font-semibold">CSS Scroll-Driven Animations</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Zero-JS Native Standard
                    </span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• Zero JavaScript footprint (`animation-timeline: view()` or `scroll()`).</li>
                    <li>• Runs purely on the browser compositor thread off the main thread.</li>
                    <li>• Modern Chrome/Edge/Safari support (use @supports for progressive fallback).</li>
                    <li>• Ideal for linear parallax textures and read progress bars.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOTION TOKENS */}
          {activeTab === 'tokens' && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] mb-3">
                  Motion Durations & Scales
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(MOTION_DURATIONS).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626]">
                      <div className="font-mono text-[10px] uppercase text-[#827C75] dark:text-[#736E67]">{key}</div>
                      <div className="font-serif text-lg font-semibold text-[#B89B6C] dark:text-[#D4AF37] mt-1">{val * 1000}ms</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] mb-3">
                  Curated Easing Curves
                </h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm">Editorial Luxury Deceleration</span>
                      <p className="text-[#827C75] dark:text-[#736E67]">Used for headline split reveals, image curtains, and hero entrances.</p>
                    </div>
                    <code className="font-mono text-[11px] bg-white dark:bg-black px-2.5 py-1 rounded border border-[#E5DFD5] dark:border-[#2E2E2E]">
                      cubic-bezier(0.16, 1, 0.3, 1)
                    </code>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm">Natural Smooth</span>
                      <p className="text-[#827C75] dark:text-[#736E67]">Standard cubic bezier for cards, modals, and container crossfades.</p>
                    </div>
                    <code className="font-mono text-[11px] bg-white dark:bg-black px-2.5 py-1 rounded border border-[#E5DFD5] dark:border-[#2E2E2E]">
                      cubic-bezier(0.25, 0.1, 0.25, 1)
                    </code>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm">Snappy Interactive</span>
                      <p className="text-[#827C75] dark:text-[#736E67]">Quick responsive feedback for hover states and button presses.</p>
                    </div>
                    <code className="font-mono text-[11px] bg-white dark:bg-black px-2.5 py-1 rounded border border-[#E5DFD5] dark:border-[#2E2E2E]">
                      cubic-bezier(0.2, 0.8, 0.2, 1)
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] mb-3">
                  Section-Specific Motion Matrix
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#E5DFD5] dark:border-[#262626]">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[10px] uppercase font-mono text-[#827C75] dark:text-[#736E67]">
                      <tr>
                        <th className="p-3">Section</th>
                        <th className="p-3">Fade & Timing</th>
                        <th className="p-3">Parallax / Scroll Effect</th>
                        <th className="p-3">GPU Properties</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DFD5]/60 dark:divide-[#262626] text-[11px]">
                      {Object.values(SECTION_MOTION_SPECS).map((s) => (
                        <tr key={s.sectionId} className="hover:bg-[#FAF8F5]/50 dark:hover:bg-[#1A1A1A]/50">
                          <td className="p-3 font-semibold">{s.name}</td>
                          <td className="p-3 text-[#524E49] dark:text-[#A8A29A]">{s.fadeTiming}</td>
                          <td className="p-3 text-[#524E49] dark:text-[#A8A29A]">{s.scrollEffect}</td>
                          <td className="p-3 font-mono text-[#B89B6C] dark:text-[#D4AF37]">{s.gpuProperties.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERFORMANCE & WCAG */}
          {activeTab === 'performance' && (
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <span className="font-semibold text-sm">GPU Hardware Acceleration Rules</span>
                  </div>
                  <ul className="text-xs space-y-2 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• <strong>Whitelisted Properties:</strong> Exclusively animate <code className="text-[#B89B6C] dark:text-[#D4AF37]">transform</code> (translate3d, scale, rotate) and <code className="text-[#B89B6C] dark:text-[#D4AF37]">opacity</code>.</li>
                    <li>• <strong>Layout Thrashing Ban:</strong> Never animate <code className="text-red-500">top, left, width, height, margin, padding</code>. These force DOM recalculation and layout reflow on every frame.</li>
                    <li>• <strong>will-change Discipline:</strong> Apply <code className="font-mono">will-change: transform</code> only during active view transitions to conserve GPU memory.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <span className="font-semibold text-sm">Accessibility (WCAG 2.2 Compliance)</span>
                  </div>
                  <ul className="text-xs space-y-2 text-[#524E49] dark:text-[#A8A29A]">
                    <li>• <strong>prefers-reduced-motion:</strong> Always wrap animations with <code className="text-[#B89B6C] dark:text-[#D4AF37]">useReducedMotion()</code> or CSS media query <code className="font-mono">@media (prefers-reduced-motion: reduce)</code>.</li>
                    <li>• <strong>Instant Non-Distracting Fallback:</strong> When reduced motion is preferred, render elements at <code className="font-mono">opacity: 1</code> with zero translation displacement.</li>
                    <li>• <strong>No Continuous Auto-Spin:</strong> Avoid continuous non-essential spinning or pulsing without a pause control.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626]">
                <h4 className="font-serif text-sm font-semibold mb-2">Image Asset Lazy-Loading Strategy</h4>
                <p className="text-xs text-[#524E49] dark:text-[#A8A29A] leading-relaxed">
                  All off-screen images use native <code className="font-mono">loading="lazy"</code> and decoded asynchronously via <code className="font-mono">decoding="async"</code>. High-priority above-the-fold hero imagery is marked with explicit fetch priority and aspect-ratio reservation to avoid Cumulative Layout Shift (CLS score = 0).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COMPONENT CODE */}
          {activeTab === 'components' && (
            <div className="space-y-6">
              {[
                { key: 'fadeUp', title: '1. Reusable FadeUpReveal Component', code: codeSnippets.fadeUp },
                { key: 'parallax', title: '2. Reusable ParallaxLayer Component', code: codeSnippets.parallax },
                { key: 'scrollStory', title: '3. Reusable ScrollStorySection Component', code: codeSnippets.scrollStory },
              ].map((item) => (
                <div key={item.key} className="rounded-2xl overflow-hidden border border-[#E5DFD5] dark:border-[#262626] bg-[#0E0E0E] text-white">
                  <div className="px-4 py-3 bg-[#1A1A1A] border-b border-[#2E2E2E] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#E5DFD5] font-semibold">{item.title}</span>
                    <button
                      onClick={() => handleCopy(item.key, item.code)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
                    >
                      {copiedKey === item.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === item.key ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto text-neutral-300 leading-relaxed max-h-72">
                    <code>{item.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#E5DFD5]/60 dark:border-[#262626] bg-[#FAF8F5] dark:bg-[#0E0E0E] flex items-center justify-between text-xs text-[#827C75] dark:text-[#736E67]">
          <span>GPU Compositor Optimized · Motion v12 & React 19 Compatible</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] font-medium cursor-pointer hover:opacity-90"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
