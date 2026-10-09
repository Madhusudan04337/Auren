import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Eye, 
  Sliders, 
  Clock, 
  Zap, 
  RefreshCw,
  Droplets,
  Wind,
  Sun,
  Award
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { FadeUpReveal } from '../components/motion/FadeUpReveal';
import { ParallaxLayer } from '../components/motion/ParallaxLayer';
import { TextReveal } from '../components/motion/TextReveal';
import { MagneticButton } from '../components/motion/MagneticButton';
import { ScrollStorySection, StoryStep } from '../components/motion/ScrollStorySection';
import { MotionControlPanel } from '../components/motion/MotionControlPanel';
import { StackArchitectureGuide } from '../components/motion/StackArchitectureGuide';
import { 
  MOTION_DURATIONS, 
  MOTION_EASINGS, 
  SECTION_MOTION_SPECS 
} from '../motion/motionTokens';
import { 
  HERO_IMAGE, 
  CLOUD_BARRIER_IMAGE, 
  MORNING_RITUAL_IMAGE, 
  SKIN_TINT_IMAGE, 
  NOIR_FRAGRANCE_IMAGE,
  PRODUCTS 
} from '../data/products';
import { useCart } from '../context/CartContext';

interface MotionStoryPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct?: (product: any) => void;
}

export const MotionStoryPage: React.FC<MotionStoryPageProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const systemReducedMotion = useReducedMotion();
  const [reducedMotionSimulated, setReducedMotionSimulated] = useState(false);
  const [speedScale, setSpeedScale] = useState(1.0);
  const [showInspector, setShowInspector] = useState(false);
  const [isStackGuideOpen, setIsStackGuideOpen] = useState(false);
  const [activeSectionKey, setActiveSectionKey] = useState('hero');

  // Interactive Case Study Before / After Slider state
  const [sliderPosition, setSliderPosition] = useState(52); // percentage
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Overall page scroll progress
  const { scrollYProgress } = useScroll();
  const smoothPageProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  const isMotionDisabled = systemReducedMotion || reducedMotionSimulated;

  // The 3 formulation story steps for Section 3 (Solution / Scroll Story)
  const formulationSteps: StoryStep[] = [
    {
      id: 'step-01',
      badge: 'Botanical Stem Cell Harvest',
      title: 'Wild Alpine Edelweiss Stem Cell Isolation',
      subtitle: 'High-Altitude Ultraviolet Adaptation Matrix',
      description: 'Hand-foraged from the Swiss Valais Alps at 3,000 meters elevation, Edelweiss cells synthesize high concentrations of leontopodic acid to withstand extreme UV radiation and sub-zero desiccation. We isolate these intact active compounds via clean supercritical CO2 extraction.',
      metrics: [
        { label: 'Free Radical Scavenging', value: '3.8x Vit C' },
        { label: 'Cellular Purity Rating', value: '99.4%' },
      ],
      visualImage: HERO_IMAGE,
      visualTag: 'Cryogenic Cellular Extraction',
    },
    {
      id: 'step-02',
      badge: 'Sub-Micron Bio-Delivery',
      title: 'Liposomal Bioactive Encapsulation',
      subtitle: 'Deep Stratum Corneum Translocation',
      description: 'Raw plant actives degrade on the surface of compromised skin. We encapsulate active leontopodic molecules within biocompatible phytosterols and phospholipid bilayers sized at 80 nanometers, allowing seamless passage past damaged stratum layers directly to depleted cell walls.',
      metrics: [
        { label: 'Dermal Translocation', value: '4.6x Higher' },
        { label: 'Delivery Integrity', value: '72 Hours' },
      ],
      visualImage: CLOUD_BARRIER_IMAGE,
      visualTag: 'Phytosterol Nano-Matrix',
    },
    {
      id: 'step-03',
      badge: 'Ceramide Fusion',
      title: 'Biomimetic Lipid Matrix Lock',
      subtitle: 'Multi-Tiered Golden 3:1:1 Intercellular Cement',
      description: 'We reconstruct intercellular lipid bilayers using a physiologically balanced ratio of Ceramides (NP, AP, EOP), cholesterol, and free fatty acids. Cloud Barrier Cream wraps the stratum corneum in featherweight protection, locking in moisture while allowing cellular respiration.',
      metrics: [
        { label: 'TEWL Water Retention', value: '+94.2%' },
        { label: 'Barrier Density Increase', value: '2.4x' },
      ],
      visualImage: MORNING_RITUAL_IMAGE,
      visualTag: 'Physiological Lipid Sealing',
    },
  ];

  const featureCards = [
    {
      id: 'feat-1',
      title: 'Ceramide Tri-Complex',
      tag: 'Lipid Architecture',
      description: 'Identical to human stratum corneum ceramides (EOP, NP, AP). Rebuilds micro-fissures in compromised moisture barriers.',
      metric: '3:1:1 Ratio',
      icon: Layers,
    },
    {
      id: 'feat-2',
      title: 'Sugarcane Squalane',
      tag: 'Bio-Fermented Emollient',
      description: 'Zero-weight, non-comedogenic biomimetic lipid that replenishes elasticity without clogging cellular pore channels.',
      metric: '100% Plant Sourced',
      icon: Droplets,
    },
    {
      id: 'feat-3',
      title: 'Alpine Lichen & Moss',
      tag: 'Desiccation Resilience',
      description: 'Adaptogenic flora capable of surviving total winter hydration loss, delivering immediate cellular barrier recovery.',
      metric: '-42% Erythema',
      icon: Wind,
    },
    {
      id: 'feat-4',
      title: 'Beta-Glucan & Niacinamide',
      tag: 'Anti-Inflammatory Shield',
      description: 'Multi-molecular soothe matrix that reduces histamine reactivity, evening stratum tone within 14 days.',
      metric: '99% Tolerance',
      icon: Sun,
    },
  ];

  const handleAddCloudBarrier = () => {
    const product = PRODUCTS.find(p => p.id === 'auren-01') || PRODUCTS[0];
    addToCart(product, '50 ml');
  };

  return (
    <div ref={containerRef} className="relative bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#121212] dark:text-[#F5F3EF] overflow-hidden transition-colors duration-200">
      
      {/* Top Global Scroll Progress Bar (Scrubbed) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#B89B6C] dark:bg-[#D4AF37] z-50 origin-left"
        style={{ scaleX: smoothPageProgress }}
      />

      {/* Floating Motion Spec Telemetry Overlay (When Inspector is active) */}
      {showInspector && (
        <div className="fixed top-20 left-6 z-40 max-w-sm p-4 rounded-2xl bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border border-[#B89B6C]/40 dark:border-[#D4AF37]/40 shadow-xl text-xs font-mono animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DFD5] dark:border-[#262626]">
            <span className="text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Live Motion Telemetry
            </span>
            <span className="text-[10px] uppercase text-[#827C75]">
              Active: {activeSectionKey}
            </span>
          </div>
          <div className="space-y-1 text-[#524E49] dark:text-[#A8A29A] text-[11px]">
            <div><strong>Fade:</strong> {SECTION_MOTION_SPECS[activeSectionKey]?.fadeTiming}</div>
            <div><strong>Easing:</strong> {SECTION_MOTION_SPECS[activeSectionKey]?.easing}</div>
            <div><strong>Stagger:</strong> {SECTION_MOTION_SPECS[activeSectionKey]?.stagger}</div>
            <div><strong>Parallax:</strong> {SECTION_MOTION_SPECS[activeSectionKey]?.parallaxSpeed}</div>
            <div><strong>GPU Props:</strong> {SECTION_MOTION_SPECS[activeSectionKey]?.gpuProperties.join(', ')}</div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: HERO SECTION
          - Text reveal with masked overflow
          - Staggered entry
          - Multi-layer parallax background
          - Scrubbed scroll indicator
          - Kinetic magnetic CTA
      ========================================================================= */}
      <section 
        id="hero"
        onMouseEnter={() => setActiveSectionKey('hero')}
        className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Parallax Layer 1: Ambient Background Aura (Speed: 0.12x) */}
        <ParallaxLayer speed={0.12} className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#B89B6C]/10 via-[#FAF8F5]/0 to-[#B89B6C]/5 dark:from-[#D4AF37]/8 dark:via-transparent dark:to-transparent blur-3xl" />
        </ParallaxLayer>

        {/* Parallax Layer 2: Subtle Botanical Ring Watermark (Speed: -0.18x) */}
        <ParallaxLayer speed={-0.18} className="absolute top-12 right-10 lg:right-24 pointer-events-none opacity-20 dark:opacity-10 hidden sm:block">
          <div className="w-80 h-80 rounded-full border border-dashed border-[#B89B6C] dark:border-[#D4AF37]" />
        </ParallaxLayer>

        <div className="relative max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Column: Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Kicker Tag */}
            <FadeUpReveal delay={0.1} duration={0.5} distance={16}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#181818] border border-[#E5DFD5] dark:border-[#262626] text-xs font-mono uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                Botanical Cellular Science · Motion Story
              </div>
            </FadeUpReveal>

            {/* Split Headline Mask Reveal */}
            <div className="py-2">
              <TextReveal
                text="The Architecture of Deep Cellular Moisture"
                as="h1"
                mode="words"
                stagger={0.05}
                duration={0.75}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#121212] dark:text-[#F5F3EF] leading-[1.08] tracking-tight"
                wordClassName="text-[#121212] dark:text-[#F5F3EF]"
              />
            </div>

            {/* Subtitle with Fade Up */}
            <FadeUpReveal delay={0.3} duration={0.6} distance={24}>
              <p className="text-base sm:text-lg text-[#524E49] dark:text-[#A8A29A] font-light max-w-xl leading-relaxed">
                Witness how high-altitude Alpine botanicals, liposomal encapsulation, and biomimetic ceramides synthesize to restore depleted lipid barriers.
              </p>
            </FadeUpReveal>

            {/* CTA Group with Kinetic Magnetic Button */}
            <FadeUpReveal delay={0.45} duration={0.6} distance={28}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton
                  onClick={handleAddCloudBarrier}
                  className="px-7 py-3.5 rounded-full bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] font-medium text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:bg-[#262626] dark:hover:bg-white"
                >
                  Acquire Formulation · $189
                  <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <button
                  onClick={() => setIsStackGuideOpen(true)}
                  className="px-6 py-3.5 rounded-full border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                  Inspect Motion Specs
                </button>
              </div>
            </FadeUpReveal>

            {/* Reassurance Metrics */}
            <FadeUpReveal delay={0.6} duration={0.5} distance={20}>
              <div className="pt-8 border-t border-[#E5DFD5]/60 dark:border-[#262626] flex items-center gap-6 sm:gap-10 text-xs text-[#827C75] dark:text-[#736E67]">
                <div>
                  <span className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] font-medium block">
                    72 Hours
                  </span>
                  Moisture Lock
                </div>
                <div className="h-6 w-px bg-[#E5DFD5] dark:bg-[#262626]" />
                <div>
                  <span className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] font-medium block">
                    +94%
                  </span>
                  Barrier Thickness
                </div>
                <div className="h-6 w-px bg-[#E5DFD5] dark:bg-[#262626]" />
                <div>
                  <span className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] font-medium block">
                    Zero
                  </span>
                  Synthetic Fillers
                </div>
              </div>
            </FadeUpReveal>

          </div>

          {/* Right Hero Column: Multi-Layer Parallax Showcase (Speed: 0.35x and 1.15x) */}
          <div className="lg:col-span-5 relative">
            <ParallaxLayer speed={0.3} className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#E5DFD5] dark:border-[#262626] bg-[#141414]">
                <img
                  src={CLOUD_BARRIER_IMAGE}
                  alt="Auren Cloud Barrier Formulation"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mb-1">
                    Formulation No. 01 · Cloud Barrier Cream
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-light">
                    Biomimetic Ceramide Emulsion
                  </div>
                </div>
              </div>
            </ParallaxLayer>

            {/* Parallax Layer 3: Floating Elevated Depth Badge (Speed: 1.15x) */}
            <ParallaxLayer speed={1.15} className="absolute -bottom-6 -left-6 z-20 hidden sm:block">
              <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border border-[#E5DFD5] dark:border-[#2E2E2E] shadow-2xl max-w-[220px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                    Clinical Trial Verified
                  </span>
                </div>
                <p className="text-xs text-[#524E49] dark:text-[#A8A29A] leading-snug">
                  Double-blind 28-day efficacy testing conducted in Zurich, Switzerland.
                </p>
              </div>
            </ParallaxLayer>

          </div>

        </div>

        {/* Scrubbed Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-70">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#827C75] dark:text-[#736E67]">
            Scroll to Explore
          </span>
          <div className="w-4 h-7 rounded-full border border-[#827C75]/50 dark:border-[#736E67]/50 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-[#B89B6C] dark:bg-[#D4AF37]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROBLEM SECTION
          - Scrubbed comparison: Healthy vs Depleted Barrier
          - Staggered tension symptom panels
          - Environmental barrier degradation metrics
      ========================================================================= */}
      <section
        id="problem"
        onMouseEnter={() => setActiveSectionKey('problem')}
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD5]/70 dark:border-[#222222] bg-[#FAF8F5]/80 dark:bg-[#0A0A0A]"
      >
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <FadeUpReveal delay={0.1}>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#B89B6C] dark:text-[#D4AF37] block mb-3">
                The Epidermal Vulnerability
              </span>
            </FadeUpReveal>

            <FadeUpReveal delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] dark:text-[#F5F3EF] tracking-tight mb-4">
                The Modern Barrier Crisis: Synthetic Overload & Environmental Depletion
              </h2>
            </FadeUpReveal>

            <FadeUpReveal delay={0.3}>
              <p className="text-sm sm:text-base text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed">
                Modern skin suffers from an invisible structural rupture: artificial heating, particulate pollution, and harsh surfactant cleansers strip away the essential intercellular ceramides that hold cells together.
              </p>
            </FadeUpReveal>
          </div>

          {/* 3 Interactive Symptom Cards with Staggered Fade Up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: '+340%',
                label: 'Trans-Epidermal Water Loss (TEWL)',
                title: 'Accelerated Moisture Evaporation',
                description: 'Micro-fissures in the lipid matrix allow deep hydration to evaporate continuously into dry ambient air, causing chronic tightness and flaking.',
                level: 'High Tension',
                percent: 85,
              },
              {
                metric: '68%',
                label: 'Ceramide Bilayer Depletion',
                title: 'Loss of Intercellular Mortar',
                description: 'Surfactants leach essential fatty acids out of the stratum corneum, creating disorganized lipid bilayers that lose their defensive seal.',
                level: 'Structural Decay',
                percent: 68,
              },
              {
                metric: '4.2x',
                label: 'Free Radical Cellular Stress',
                title: 'Reactive Oxidative Breakdown',
                description: 'Unfiltered particulate matter and blue light penetrate the compromised skin mantle, causing premature collagen breakdown and redness.',
                level: 'Inflammatory Cascade',
                percent: 92,
              },
            ].map((card, idx) => (
              <FadeUpReveal key={idx} delay={0.15 * idx} duration={0.6}>
                <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2E2E2E] text-rose-600 dark:text-rose-400 font-semibold">
                        {card.level}
                      </span>
                      <span className="text-xs text-[#827C75] dark:text-[#736E67] font-mono">
                        0{idx + 1} / 03
                      </span>
                    </div>

                    <div className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] dark:text-[#F5F3EF] mb-1">
                      {card.metric}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] mb-4">
                      {card.label}
                    </div>

                    <h3 className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] mb-2 font-medium">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#524E49] dark:text-[#A8A29A] leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>

                  {/* Scrubbed tension gauge bar */}
                  <div className="mt-6 pt-4 border-t border-[#E5DFD5]/60 dark:border-[#262626]">
                    <div className="flex justify-between text-[11px] font-mono mb-1 text-[#827C75] dark:text-[#736E67]">
                      <span>Barrier Stress Index</span>
                      <span>{card.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DFD5]/50 dark:bg-[#262626] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${card.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 + idx * 0.1, ease: MOTION_EASINGS.editorial }}
                        className="h-full bg-gradient-to-r from-[#B89B6C] to-rose-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </FadeUpReveal>
            ))}
          </div>

          {/* Deep Insight Callout */}
          <FadeUpReveal delay={0.4} distance={20}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-[#121212] border border-[#E5DFD5] dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase text-[#B89B6C] dark:text-[#D4AF37] tracking-wider font-semibold">
                  The Critical Dermatology Insight
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#121212] dark:text-[#F5F3EF]">
                  Water alone cannot hydrate skin without the structural lipid mortar to prevent evaporation.
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('solution');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="whitespace-nowrap px-6 py-3 rounded-full bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] text-xs uppercase tracking-widest font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
              >
                Inspect Solution
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeUpReveal>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SOLUTION SECTION (SCROLL STORYTELLING)
          - Pinned desktop stage
          - Scrubbed narrative milestones
          - 3-Phase Botanical Cellular Biotechnology
      ========================================================================= */}
      <section 
        id="solution"
        onMouseEnter={() => setActiveSectionKey('solution')}
        className="border-t border-[#E5DFD5]/70 dark:border-[#222222]"
      >
        <ScrollStorySection
          steps={formulationSteps}
          headlineKicker="Cellular Synthesis & Delivery"
          title="From Wild Alpine Edelweiss to Sub-Micron Dermal Infusion"
          subtitle="Follow our three-stage biotechnology process: cryogenic stem cell isolation, liposomal nanocarrier encapsulation, and biomimetic lipid sealing."
        />
      </section>

      {/* =========================================================================
          SECTION 4: FEATURES SECTION
          - 4-card 3D perspective grid with GPU hover physics
          - Bioactive ingredient highlights
          - Staggered entrances
      ========================================================================= */}
      <section
        id="features"
        onMouseEnter={() => setActiveSectionKey('features')}
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD5]/70 dark:border-[#222222] bg-[#FAF8F5]/60 dark:bg-[#0A0A0A]"
      >
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <FadeUpReveal delay={0.1}>
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#B89B6C] dark:text-[#D4AF37] block mb-3">
                  Architectural Matrix
                </span>
              </FadeUpReveal>
              <FadeUpReveal delay={0.2}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] dark:text-[#F5F3EF] tracking-tight">
                  Four Bioactive Pillars of Cellular Restoration
                </h2>
              </FadeUpReveal>
            </div>
            <FadeUpReveal delay={0.3}>
              <p className="text-sm text-[#524E49] dark:text-[#A8A29A] max-w-md font-light leading-relaxed">
                Every molecule is selected for physiological compatibility, engineered without essential oils, fragrance, or petrochemical emulsifiers.
              </p>
            </FadeUpReveal>
          </div>

          {/* 4 Cards Grid with 3D Tilt Hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              const isSelected = selectedFeatureIndex === idx;

              return (
                <FadeUpReveal key={feat.id} delay={0.1 * idx} duration={0.5}>
                  <div
                    onMouseEnter={() => setSelectedFeatureIndex(idx)}
                    className={`h-full p-8 rounded-3xl transition-all duration-300 cursor-pointer border flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-white dark:bg-[#161616] border-[#B89B6C] dark:border-[#D4AF37] shadow-xl -translate-y-1'
                        : 'bg-[#FAF8F5] dark:bg-[#121212] border-[#E5DFD5] dark:border-[#262626] hover:border-[#B89B6C]/50 dark:hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#2E2E2E] flex items-center justify-center mb-6 text-[#B89B6C] dark:text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#827C75] dark:text-[#736E67] block mb-2">
                        {feat.tag}
                      </span>

                      <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] font-medium mb-3">
                        {feat.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed mb-6">
                        {feat.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5DFD5]/60 dark:border-[#262626] flex items-center justify-between text-xs">
                      <span className="font-mono text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                        {feat.metric}
                      </span>
                      <span className="text-[#827C75] dark:text-[#736E67] text-[10px] uppercase tracking-wider font-mono">
                        Active Pillar 0{idx + 1}
                      </span>
                    </div>
                  </div>
                </FadeUpReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CASE STUDY SECTION
          - Interactive Before/After slider (Day 0 vs Day 28)
          - Animated clinical trial outcome metrics
          - Dermatological efficacy quote & certification stamp
      ========================================================================= */}
      <section
        id="caseStudy"
        onMouseEnter={() => setActiveSectionKey('caseStudy')}
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD5]/70 dark:border-[#222222]"
      >
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <FadeUpReveal delay={0.1}>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#B89B6C] dark:text-[#D4AF37] block mb-3">
                Independent Clinical Trial (N = 84)
              </span>
            </FadeUpReveal>
            <FadeUpReveal delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] dark:text-[#F5F3EF] tracking-tight mb-4">
                Clinical Efficacy: 28 Days to Stratum Barrier Reconstruction
              </h2>
            </FadeUpReveal>
            <FadeUpReveal delay={0.3}>
              <p className="text-sm sm:text-base text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed">
                Conducted over 4 weeks under high-altitude, low-humidity environmental stress testing. Evaluated via transepidermal evaporimetry and high-resolution confocal microscopy.
              </p>
            </FadeUpReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            
            {/* Left: Interactive Before / After Split Visualizer */}
            <div className="lg:col-span-7">
              <FadeUpReveal delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/11] border border-[#E5DFD5] dark:border-[#262626] bg-[#0E0E0E] shadow-2xl select-none group">
                  
                  {/* "After" Image (Base layer) */}
                  <img
                    src={SKIN_TINT_IMAGE}
                    alt="After 28 Days Clinical Restoration"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                    Day 28: Restored Lipid Matrix
                  </div>

                  {/* "Before" Image (Clipped layer) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={HERO_IMAGE}
                      alt="Day 0 Compromised Stratum Corneum"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                      Day 0: Compromised Barrier
                    </div>
                  </div>

                  {/* Scrub Slider Divider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-lg flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-black shadow-xl flex items-center justify-center font-mono text-[10px] font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Scrub Slider Input (Hidden transparent overlay for mouse/touch scrubbing) */}
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label="Before and after clinical comparison slider"
                  />

                  {/* Bottom Bar Info */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[11px]">
                      Drag slider to scrub cellular comparison
                    </span>
                    <span className="text-[#D4AF37] font-mono text-[11px]">
                      Micro-Refractometry Data
                    </span>
                  </div>

                </div>
              </FadeUpReveal>
            </div>

            {/* Right: Clinical Quantitative Outcome Metrics */}
            <div className="lg:col-span-5 space-y-6">
              
              <FadeUpReveal delay={0.2} distance={20}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-3xl sm:text-4xl font-medium text-[#121212] dark:text-[#F5F3EF]">
                      +94.2%
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs font-semibold">
                      p &lt; 0.001
                    </span>
                  </div>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#B89B6C] dark:text-[#D4AF37] mb-1">
                    Intercellular Lipid Density
                  </div>
                  <p className="text-xs text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed">
                    Significant recovery of lipid bilayers verified via confocal reflectance microscopy within 28 days of twice-daily application.
                  </p>
                </div>
              </FadeUpReveal>

              <FadeUpReveal delay={0.3} distance={20}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-3xl sm:text-4xl font-medium text-[#121212] dark:text-[#F5F3EF]">
                      -42.6%
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs font-semibold">
                      Measured
                    </span>
                  </div>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#B89B6C] dark:text-[#D4AF37] mb-1">
                    Dehydration Micro-Crepiness
                  </div>
                  <p className="text-xs text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed">
                    Smoothing of epidermal surface tension and visible reduction of flaking around orbital and cheek contours.
                  </p>
                </div>
              </FadeUpReveal>

              <FadeUpReveal delay={0.4} distance={20}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-3xl sm:text-4xl font-medium text-[#121212] dark:text-[#F5F3EF]">
                      72 Hours
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs font-semibold">
                      Corneometer
                    </span>
                  </div>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#B89B6C] dark:text-[#D4AF37] mb-1">
                    Continuous Water Retention
                  </div>
                  <p className="text-xs text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed">
                    Sustained moisture reservoir maintained even 72 hours following cessation of treatment in dry testing environments.
                  </p>
                </div>
              </FadeUpReveal>

            </div>

          </div>

          {/* Dermatologist Testimonial Card */}
          <FadeUpReveal delay={0.4}>
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
                    <Award className="w-4 h-4" />
                    Clinical Trial Principal Investigator
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-[#121212] dark:text-[#F5F3EF] italic font-light leading-relaxed">
                    "Auren has engineered one of the few barrier formulations that mimics the exact 3:1:1 lipid stoichiometry of human skin. We observed measurable cellular re-densification without the occlusive weight that causes congestive breakouts."
                  </p>
                  <div className="text-xs text-[#524E49] dark:text-[#A8A29A]">
                    <strong>Dr. Elena Vaneva, MD</strong> · Chair of Dermal Biology, Zurich Biomedical Research Institute
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2E2E2E] text-center min-w-[180px]">
                  <ShieldCheck className="w-8 h-8 text-[#B89B6C] dark:text-[#D4AF37] mx-auto mb-2" />
                  <span className="font-mono text-xs font-semibold block text-[#121212] dark:text-[#F5F3EF]">
                    SWISS DERM CERT
                  </span>
                  <span className="text-[10px] text-[#827C75] dark:text-[#736E67] uppercase tracking-wider">
                    Certificate No. 891-B
                  </span>
                </div>
              </div>
            </div>
          </FadeUpReveal>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CTA SECTION
          - Atmospheric ambient lighting
          - Kinetic Magnetic Button
          - Direct acquisition and ritual discovery
      ========================================================================= */}
      <section
        id="cta"
        onMouseEnter={() => setActiveSectionKey('cta')}
        className="relative py-28 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD5]/70 dark:border-[#222222] overflow-hidden text-center"
      >
        {/* Parallax Ambient Radial Glow */}
        <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#B89B6C]/15 via-transparent to-[#D4AF37]/10 dark:from-[#D4AF37]/10 dark:via-transparent dark:to-transparent blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-3xl mx-auto space-y-8">
          
          <FadeUpReveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#B89B6C] dark:text-[#D4AF37] block">
              Begin Your Cellular Ritual
            </span>
          </FadeUpReveal>

          <FadeUpReveal delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#121212] dark:text-[#F5F3EF] tracking-tight leading-tight">
              Restore the Integrity of Your Skin Barrier Today
            </h2>
          </FadeUpReveal>

          <FadeUpReveal delay={0.3}>
            <p className="text-base sm:text-lg text-[#524E49] dark:text-[#A8A29A] font-light leading-relaxed max-w-xl mx-auto">
              Every order arrives in bespoke UV-protective violet glass, accompanied by two complimentary exploratory ritual samples.
            </p>
          </FadeUpReveal>

          <FadeUpReveal delay={0.4}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={handleAddCloudBarrier}
                className="px-9 py-4 rounded-full bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] font-medium text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:bg-[#262626] dark:hover:bg-white"
              >
                Acquire Cloud Barrier Cream · $189
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>

              <button
                onClick={() => onNavigate('shop')}
                className="px-7 py-4 rounded-full border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
              >
                Explore Full Catalog
              </button>
            </div>
          </FadeUpReveal>

          {/* Reassurance Badges */}
          <FadeUpReveal delay={0.5}>
            <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#827C75] dark:text-[#736E67] font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                Climate Neutral Shipping
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                100% Recyclable Obsidian Glass
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                Dermatologically Formulated
              </div>
            </div>
          </FadeUpReveal>

        </div>
      </section>

      {/* =========================================================================
          MOTION SYSTEM CONTROL CONSOLE & STACK GUIDE MODAL
      ========================================================================= */}
      <MotionControlPanel
        reducedMotionForced={reducedMotionSimulated}
        onToggleReducedMotion={() => setReducedMotionSimulated(!reducedMotionSimulated)}
        speedScale={speedScale}
        onChangeSpeedScale={(scale) => setSpeedScale(scale)}
        showInspector={showInspector}
        onToggleInspector={() => setShowInspector(!showInspector)}
        onOpenStackGuide={() => setIsStackGuideOpen(true)}
        activeSectionKey={activeSectionKey}
      />

      <StackArchitectureGuide
        isOpen={isStackGuideOpen}
        onClose={() => setIsStackGuideOpen(false)}
      />

    </div>
  );
};
