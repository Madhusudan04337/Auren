/**
 * AUREN Consistent Motion System Tokens & Interaction Architecture
 * 
 * Performance & Accessibility Guarantees:
 * - Only GPU-friendly properties animated (transform: translate3d/scale/rotate, opacity, filter: blur)
 * - Zero layout reflow properties animated (no top/left/width/height/margin/padding anims)
 * - Strict adherence to WCAG 2.2 prefers-reduced-motion
 * - Consistent 60fps/120fps hardware-accelerated transitions
 */

export const MOTION_DURATIONS = {
  micro: 0.15,      // 150ms - toggles, tooltips, micro-indicators
  fast: 0.28,       // 280ms - button hovers, menu item highlights
  standard: 0.5,    // 500ms - card entries, modal fades, standard reveals
  deliberate: 0.8,  // 800ms - editorial text reveals, hero title staggers
  majestic: 1.2,    // 1200ms - full screen transitions, atmospheric ambient reveals
} as const;

export const MOTION_EASINGS = {
  // Editorial curve: immediate response with long, ultra-smooth luxury deceleration
  editorial: [0.16, 1, 0.3, 1] as const,
  // Smooth curve: balanced natural cubic bezier
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Snappy curve: quick interactive feedback
  snappy: [0.2, 0.8, 0.2, 1] as const,
  // Expressive curve: dramatic editorial entrances
  expressive: [0.76, 0, 0.24, 1] as const,
  // Soft spring: magnetic buttons & cursor follow
  springSoft: { stiffness: 180, damping: 24, mass: 0.8 },
  // Energetic spring: bouncy micro-interactions
  springBouncy: { stiffness: 320, damping: 20, mass: 0.5 },
  // Linear for scrubbed scroll effects
  linear: [0, 0, 1, 1] as const,
} as const;

export const MOTION_STAGGER = {
  tight: 0.04,      // 40ms - character & compact list items
  standard: 0.08,   // 80ms - grid items, feature cards
  deliberate: 0.14, // 140ms - major section headlines, editorial blocks
} as const;

export const PARALLAX_SPEEDS = {
  subtleBackground: 0.12, // Slow ambient drift
  ambientLayer: 0.25,     // Mid-background botanical illustrations / textures
  contentPrimary: 0.6,    // Foreground offset relative to scroll
  floatingAccent: 1.15,   // Elevated foreground badges & floating cards
} as const;

export const LAYER_DEPTH = {
  backgroundCanvas: 'z-0',
  ambientParallax: 'z-10',
  narrativeContent: 'z-20',
  pinnedStage: 'z-30',
  floatingControls: 'z-40',
  overlaysAndModals: 'z-50',
} as const;

export interface SectionAnimationSpec {
  sectionId: string;
  name: string;
  fadeTiming: string;
  easing: string;
  stagger: string;
  parallaxSpeed: string;
  scrollEffect: string;
  reveals: string;
  gpuProperties: string[];
}

export const SECTION_MOTION_SPECS: Record<string, SectionAnimationSpec> = {
  hero: {
    sectionId: 'hero',
    name: 'Hero Section',
    fadeTiming: '800ms fade-up with 1200ms atmospheric glow',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1) [Editorial]',
    stagger: '120ms between title words, 80ms between subheads and CTAs',
    parallaxSpeed: '0.15x on ambient background, 1.1x on floating badge card',
    scrollEffect: 'Scrubbed opacity exit & scale dampening (1.0 -> 0.96)',
    reveals: 'Split-word mask reveal from y: 32px; Image scale-down from 1.08 -> 1.0',
    gpuProperties: ['transform (translate3d, scale)', 'opacity'],
  },
  problem: {
    sectionId: 'problem',
    name: 'Problem Section',
    fadeTiming: '600ms entrance on viewport intersection (threshold: 0.25)',
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1) [Natural Smooth]',
    stagger: '100ms across 3 tension symptom comparison panels',
    parallaxSpeed: '0.3x counter-directional drift on scientific metric tags',
    scrollEffect: 'Scrubbed timeline progress indicator linked directly to scroll position',
    reveals: 'Clip-path wipe and horizontal tension bar expansion (width: 0% -> 100%)',
    gpuProperties: ['transform (translate3d, scaleX)', 'opacity'],
  },
  solution: {
    sectionId: 'solution',
    name: 'Solution Section',
    fadeTiming: '500ms crossfade between formulation phases',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1) [Editorial]',
    stagger: '60ms per milestone bullet point',
    parallaxSpeed: 'Pinned 100vh stage; scrubbed 3-stage vertical story track',
    scrollEffect: 'Pinned sticky visual stage with scrubbed milestone activation',
    reveals: 'Active phase crossfade + botanical molecular visualization depth zoom',
    gpuProperties: ['transform (translate3d, scale)', 'opacity', 'filter: blur()'],
  },
  features: {
    sectionId: 'features',
    name: 'Features Section',
    fadeTiming: '550ms fade-up staggered entry',
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1) [Snappy]',
    stagger: '80ms sequential cascade across the 4 feature cards',
    parallaxSpeed: '0.2x relative vertical offset on alternate columns',
    scrollEffect: 'Intersection triggered reveal with 3D cursor tilt on hover',
    reveals: 'Border highlight illumination & icon 3D elevation (z: 12px)',
    gpuProperties: ['transform (translate3d, rotateX, rotateY)', 'opacity'],
  },
  caseStudy: {
    sectionId: 'caseStudy',
    name: 'Case Study Section',
    fadeTiming: '700ms entrance with 900ms metric counter interpolation',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1) [Editorial]',
    stagger: '140ms between clinical before/after split & testimonial block',
    parallaxSpeed: '0.25x background watermark texture drift',
    scrollEffect: 'Interactive scrubbed before/after slider + pinned clinical metrics',
    reveals: 'Radial clip expansion & animated decimal number counter',
    gpuProperties: ['transform (translate3d)', 'opacity', 'clip-path'],
  },
  cta: {
    sectionId: 'cta',
    name: 'CTA Section',
    fadeTiming: '600ms atmospheric expansion',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1) [Editorial]',
    stagger: '70ms cascade: kicker -> headline -> magnetic button -> reassurance tokens',
    parallaxSpeed: '0.2x radial glow aura tracking',
    scrollEffect: 'Magnetic cursor attraction with spring physics (stiffness: 220, damping: 20)',
    reveals: 'Button scale punch on hover (1.02x) and luminous perimeter pulse',
    gpuProperties: ['transform (translate3d, scale)', 'opacity'],
  },
};
