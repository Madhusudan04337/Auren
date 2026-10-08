import React from 'react';
import { RITUALS } from '../../data/rituals';
import { PRODUCTS } from '../../data/products';
import { Ritual, Product } from '../../types';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';

interface FeaturedRitualsProps {
  onSelectRitual: (ritual: Ritual) => void;
  onSelectProduct: (product: Product) => void;
  onExploreAllRituals: () => void;
}

export const FeaturedRituals: React.FC<FeaturedRitualsProps> = ({
  onSelectRitual,
  onSelectProduct,
  onExploreAllRituals
}) => {
  const morningRitual = RITUALS[0];
  const afterHoursRitual = RITUALS[1];
  const cleanLinesRitual = RITUALS[2];

  return (
    <section className="bg-[#F7F4EF] py-16 sm:py-24 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD5] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
              The Art of Daily Sequence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal">
              Rituals, Not Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#181818]/70 max-w-md font-light leading-relaxed">
            Move beyond isolated beauty steps. Discover choreographed protocols designed around living circadian rhythm, mood, and tactile expression.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Morning Reset Ritual Card (7 cols) */}
          <div
            onClick={() => onSelectRitual(morningRitual)}
            className="md:col-span-7 bg-[#EFEAE2] border border-[#E5DFD5] relative overflow-hidden group cursor-pointer flex flex-col justify-between p-6 sm:p-10 min-h-[380px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={morningRitual.image}
                alt={morningRitual.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#CDAA7D]">
                Chapter 01 · Morning Sequence
              </span>
              <span className="flex items-center gap-1 text-[11px] font-light bg-black/40 px-2.5 py-1 backdrop-blur-xs">
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
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#CDAA7D] group-hover:text-white transition-colors">
                  <span>Explore Ritual Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Editorial Statement Block (5 cols) */}
          <div className="md:col-span-5 bg-white border border-[#E5DFD5] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#543544] font-semibold block">
                The House Philosophy
              </span>
              <h3 className="font-serif text-2xl text-[#181818] leading-snug">
                &ldquo;Formulations must honor the stratum corneum first, and express individual spirit second.&rdquo;
              </h3>
              <p className="text-xs text-[#181818]/70 font-light leading-relaxed">
                Every AUREN formula is intentionally designed to layer without pilling, heavy occlusivity, or chemical irritation. One universal standard for every identity.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
              <span className="text-[#181818]/50">Curated by Antoine Vasseur &amp; Dr. Camille Laurent</span>
              <button
                onClick={onExploreAllRituals}
                className="text-[#181818] font-semibold uppercase tracking-wider hover:text-[#543544] flex items-center gap-1 cursor-pointer"
              >
                <span>View All 4</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Dark Card - After Hours Ritual (6 cols) */}
          <div
            onClick={() => onSelectRitual(afterHoursRitual)}
            className="md:col-span-6 bg-[#171515] border border-white/5 relative overflow-hidden group cursor-pointer p-6 sm:p-8 min-h-[320px] flex flex-col justify-between text-[#F6F0E8]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={afterHoursRitual.image}
                alt={afterHoursRitual.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171515] via-[#171515]/70 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.2em] font-medium text-[#CDAA7D]">
                Chapter 02 · Nocturnal Sanctuary
              </span>
              <span className="text-[11px] text-[#F6F0E8]/60">Evening Sanctuary</span>
            </div>

            <div className="relative z-10 space-y-2 mt-20">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                {afterHoursRitual.name}
              </h3>
              <p className="text-xs text-[#F6F0E8]/70 font-light leading-relaxed max-w-md">
                Amber body oils, chronobiological sleep peptides, and smoky cedarwood sillage to disconnect from external demands.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#CDAA7D] group-hover:text-white transition-colors">
                  <span>Enter Nocturnal Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Clean Lines Grooming Ritual (6 cols) */}
          <div
            onClick={() => onSelectRitual(cleanLinesRitual)}
            className="md:col-span-6 bg-[#E8DFD3] border border-[#E5DFD5] relative overflow-hidden group cursor-pointer p-6 sm:p-8 min-h-[320px] flex flex-col justify-between text-[#181818]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#543544]">
                  Chapter 03 · Grooming Discipline
                </span>
                <span className="text-[11px] text-[#181818]/60">3 Steps · Precision Glide</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-[#181818]">
                {cleanLinesRitual.name}
              </h3>
              <p className="text-xs text-[#181818]/70 font-light leading-relaxed max-w-md">
                Razor glide cushion with Haitian vetiver and cypress to soothe micro-burns and deliver calm matte comfort for facial hair and skin.
              </p>
            </div>

            <div className="pt-4 border-t border-[#181818]/10 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold tabular-nums text-[#181818]">
                From ₹1,450
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#181818] group-hover:text-[#543544] transition-colors">
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
