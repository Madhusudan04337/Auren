import React from 'react';
import { RITUALS } from '../../data/rituals';
import { Ritual, Product } from '../../types';
import { ArrowRight, Clock } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
              Daily Protocols
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
              Choreographed Rituals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 max-w-sm font-light leading-relaxed">
            Formulations engineered to work in circadian sequence from dawn to deep nocturnal recovery.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Large Morning Reset Ritual Card (7 cols) */}
          <div
            onClick={() => onSelectRitual(morningRitual)}
            className="md:col-span-7 bg-[#E8DFD3] dark:bg-[#181818] rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 relative overflow-hidden group cursor-pointer flex flex-col justify-between p-7 sm:p-10 min-h-[420px] shadow-sm hover:shadow-xl transition-all duration-400"
          >
            <div className="absolute inset-0 z-0">
              <LuxuryImage
                src={morningRitual.image}
                alt={morningRitual.name}
                fallbackText="Morning Protocol"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#D4AF37]">
                Chapter 01 · Morning Sequence
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-light bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
                <Clock className="w-3 h-3" />
                4 Steps · 6 Min
              </span>
            </div>

            <div className="relative z-10 space-y-3 text-white max-w-lg mt-24">
              <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                {morningRitual.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                {morningRitual.tagline} Botanical oil cleanse, barrier lipid restoration, and fine citrus-driftwood sillage.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#D4AF37] group-hover:text-white transition-colors">
                  <span>Explore Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Editorial Statement Block (5 cols) */}
          <div className="md:col-span-5 bg-[#F2ECE3] dark:bg-[#161616] rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-sm">
            <div className="space-y-4 relative z-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                The House Philosophy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF] leading-snug font-normal">
                &ldquo;Formulations must honor the stratum corneum first, and express spirit second.&rdquo;
              </h3>
              <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed">
                Every AUREN formula layers seamlessly without pilling or heavy occlusivity.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between text-xs relative z-10">
              <span className="text-[#121212]/50 dark:text-[#F5F3EF]/50">Curated by Antoine Vasseur</span>
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
            className="md:col-span-6 bg-[#121212] dark:bg-[#111111] rounded-2xl sm:rounded-3xl border border-white/10 relative overflow-hidden group cursor-pointer p-7 sm:p-9 min-h-[340px] flex flex-col justify-between text-white shadow-sm hover:shadow-xl transition-all duration-400"
          >
            <div className="absolute inset-0 z-0">
              <LuxuryImage
                src={afterHoursRitual.image}
                alt={afterHoursRitual.name}
                fallbackText="Evening Protocol"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#D4AF37]">
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
              <p className="text-xs text-white/75 font-light leading-relaxed max-w-md line-clamp-2">
                Amber body oils, chronobiological sleep peptides, and smoky cedarwood sillage.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#D4AF37] group-hover:text-white transition-colors">
                  <span>Enter Nocturnal Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Clean Lines Grooming Ritual (6 cols) */}
          <div
            onClick={() => onSelectRitual(cleanLinesRitual)}
            className="md:col-span-6 bg-white dark:bg-[#161616] rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 relative overflow-hidden group cursor-pointer p-7 sm:p-9 min-h-[340px] flex flex-col justify-between text-[#121212] dark:text-[#F5F3EF] shadow-sm hover:shadow-xl transition-all duration-400"
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
              <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed max-w-md line-clamp-2">
                Razor glide cushion with Haitian vetiver and cypress to soothe micro-burns and deliver matte comfort.
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
