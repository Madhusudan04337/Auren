import React from 'react';
import { RITUALS } from '../../data/rituals';
import { Ritual, Product } from '../../types';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { LuxuryImage } from '../ui/LuxuryImage';

interface FeaturedRitualsProps {
  onSelectRitual: (ritual: Ritual) => void;
  onSelectProduct: (product: Product) => void;
  onExploreAllRituals: () => void;
}

export const FeaturedRituals: React.FC<FeaturedRitualsProps> = ({
  onSelectRitual,
  onExploreAllRituals
}) => {
  const morningRitual = RITUALS[0];
  const afterHoursRitual = RITUALS[1];
  const cleanLinesRitual = RITUALS[2];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] py-16 sm:py-24 border-b border-[#E5DFD5]/80 dark:border-[#222222] transition-colors duration-200">
      {/* Subtle organic ambient curve backdrop */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-[50%_50%_60%_40%/40%_60%_40%_60%] bg-gradient-to-bl from-[#F0E6D8]/35 via-[#ECE0D0]/15 to-transparent dark:from-[#D4AF37]/5 dark:via-transparent dark:to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD5]/80 dark:border-[#222222] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Art of Daily Sequence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
              Rituals, Not Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 max-w-md font-light leading-relaxed">
            Move beyond isolated beauty steps. Discover choreographed protocols designed around living circadian rhythm, mood, and tactile expression.
          </p>
        </div>

        {/* Bento Grid with Organic Rounded Shapes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Large Morning Reset Ritual Card (7 cols) */}
          <div
            onClick={() => onSelectRitual(morningRitual)}
            className="md:col-span-7 bg-[#E8DFD3] dark:bg-[#181818] rounded-3xl sm:rounded-[32px] border border-[#E5DFD5]/80 dark:border-[#262626] relative overflow-hidden group cursor-pointer flex flex-col justify-between p-7 sm:p-10 min-h-[400px] shadow-sm hover:shadow-xl hover:shadow-[#B89B6C]/10 transition-all duration-400"
          >
            <div className="absolute inset-0 z-0">
              <LuxuryImage
                src={morningRitual.image}
                alt={morningRitual.name}
                fallbackText="Morning Protocol"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#B89B6C] dark:text-[#D4AF37]">
                Chapter 01 · Morning Sequence
              </span>
              <span className="flex items-center gap-1 text-[11px] font-light bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">
                <Clock className="w-3 h-3" />
                4 Steps · 6 Minutes
              </span>
            </div>

            <div className="relative z-10 space-y-3 text-white max-w-lg mt-24">
              <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                {morningRitual.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {morningRitual.tagline} Botanical oil cleanse, barrier lipid restoration, and fine citrus-driftwood sillage to begin the day with clarity.
              </p>
              <div className="pt-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#B89B6C] dark:text-[#D4AF37] group-hover:text-white transition-colors">
                  <span>Explore Ritual Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Editorial Statement Block (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#F2ECE3] to-[#E9DFD2] dark:from-[#181818] dark:to-[#121212] rounded-3xl sm:rounded-[32px] border border-[#E5DFD5]/80 dark:border-[#262626] p-7 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-sm">
            {/* Subtle organic wave watermark */}
            <div aria-hidden="true" className="absolute -bottom-10 -right-10 w-64 h-64 text-[#B89B6C]/10 dark:text-[#D4AF37]/5 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                <path d="M42.7,-68.8C54.8,-60.2,63.7,-47.5,70.9,-33.5C78.1,-19.5,83.6,-4.2,81.1,10.2C78.6,24.6,68.1,38.1,56.3,48.8C44.5,59.5,31.4,67.3,16.8,71.2C2.1,75.1,-14.1,75.1,-29.4,70.2C-44.8,65.3,-59.2,55.5,-69.1,41.9C-79,28.3,-84.3,10.9,-82.1,-5.5C-79.8,-21.9,-70,-37.3,-57.4,-46.7C-44.8,-56.1,-29.4,-59.5,-14.8,-63.9C-0.2,-68.3,14.6,-73.7,42.7,-68.8Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                The House Philosophy
              </span>
              <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF] leading-snug">
                &ldquo;Formulations must honor the stratum corneum first, and express individual spirit second.&rdquo;
              </h3>
              <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                Every AUREN formula is intentionally designed to layer without pilling, heavy occlusivity, or chemical irritation. One universal standard for every identity.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between text-xs relative z-10">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Curated by Antoine Vasseur &amp; Dr. Camille Laurent</span>
              <button
                onClick={onExploreAllRituals}
                className="text-[#121212] dark:text-[#F5F3EF] font-semibold uppercase tracking-wider hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer"
              >
                <span>View All 4</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Dark Card - After Hours Ritual (6 cols) */}
          <div
            onClick={() => onSelectRitual(afterHoursRitual)}
            className="md:col-span-6 bg-[#121212] dark:bg-[#111111] rounded-3xl sm:rounded-[32px] border border-white/10 relative overflow-hidden group cursor-pointer p-7 sm:p-9 min-h-[340px] flex flex-col justify-between text-white shadow-sm hover:shadow-xl hover:shadow-black/30 transition-all duration-400"
          >
            <div className="absolute inset-0 z-0">
              <LuxuryImage
                src={afterHoursRitual.image}
                alt={afterHoursRitual.name}
                fallbackText="Evening Protocol"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#B89B6C] dark:text-[#D4AF37]">
                Chapter 02 · Nocturnal Sanctuary
              </span>
              <span className="text-[11px] text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                Evening Sanctuary
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-20">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                {afterHoursRitual.name}
              </h3>
              <p className="text-xs text-white/75 font-light leading-relaxed max-w-md">
                Amber body oils, chronobiological sleep peptides, and smoky cedarwood sillage to disconnect from external demands.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#B89B6C] dark:text-[#D4AF37] group-hover:text-white transition-colors">
                  <span>Enter Nocturnal Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Clean Lines Grooming Ritual (6 cols) */}
          <div
            onClick={() => onSelectRitual(cleanLinesRitual)}
            className="md:col-span-6 bg-white dark:bg-[#161616] rounded-3xl sm:rounded-[32px] border border-[#E5DFD5]/80 dark:border-[#262626] relative overflow-hidden group cursor-pointer p-7 sm:p-9 min-h-[340px] flex flex-col justify-between text-[#121212] dark:text-[#F5F3EF] shadow-sm hover:shadow-xl hover:shadow-[#B89B6C]/10 transition-all duration-400"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#121212] dark:text-[#F5F3EF]">
                  Chapter 03 · Grooming Discipline
                </span>
                <span className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 bg-[#FAF8F5] dark:bg-[#202020] px-3 py-1 rounded-full">
                  3 Steps · Precision Glide
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-[#121212] dark:text-[#F5F3EF]">
                {cleanLinesRitual.name}
              </h3>
              <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed max-w-md">
                Razor glide cushion with Haitian vetiver and cypress to soothe micro-burns and deliver calm matte comfort for facial hair and skin.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between">
              <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                From ₹1,450
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors">
                <span>View Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
