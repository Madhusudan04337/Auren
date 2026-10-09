import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../../data/products';
import { LuxuryImage } from '../ui/LuxuryImage';

interface HeroSectionProps {
  onExploreShop: () => void;
  onExploreRituals: () => void;
  onSelectProduct: (productSlug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreShop,
  onExploreRituals,
  onSelectProduct
}) => {
  return (
    <section className="organic-hero relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] border-b border-[#E5DFD5]/70 dark:border-[#222222] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Column */}
          <div className="lg:col-span-6 space-y-8 lg:pr-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                <span>Atelier Collection</span>
                <span aria-hidden="true" className="opacity-40">/</span>
                <span>2026 Release</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight leading-[1.08] text-balance">
                Formulations for living skin.
              </h1>

              <p className="text-base sm:text-lg text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed max-w-lg">
                Biomimetic barrier care and artisanal fine fragrance engineered without gender boundaries. Slow rituals, pure biological efficacy.
              </p>
            </div>

            {/* Clean, Modern Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreShop}
                className="bg-[#121212] hover:bg-black text-white dark:bg-[#F5F3EF] dark:hover:bg-white dark:text-[#0C0C0C] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreRituals}
                className="border border-[#121212]/30 dark:border-[#F5F3EF]/30 text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-[#F5F3EF] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer"
              >
                Explore Daily Protocols
              </button>
            </div>

            {/* Clean Typographic Proof Bar */}
            <div className="pt-8 border-t border-[#E5DFD5]/70 dark:border-[#222222] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
              <span>Haute Parfumerie Extrait</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>3:1:1 Biomimetic Lipids</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>Refillable Heavy Glass</span>
            </div>
          </div>

          {/* Modern Hero Image Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#E8DFD3] dark:bg-[#1E1E1E] shadow-2xl border border-black/5 dark:border-white/10 group">
              <LuxuryImage
                src={HERO_IMAGE}
                alt="AUREN Haute Parfumerie & Skincare Campaign"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Minimalist Product Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md p-4 rounded-xl border border-black/5 dark:border-white/10 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#B89B6C] dark:text-[#D4AF37] uppercase tracking-wider font-semibold">
                  <span>Noir 03 &amp; Cloud Barrier</span>
                  <span className="font-mono text-[#121212] dark:text-[#F5F3EF]">₹1,890</span>
                </div>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light line-clamp-1">
                  Cedarwood amber pairing with deep lipid restoration.
                </p>
                <button
                  onClick={() => onSelectProduct('cloud-barrier-cream')}
                  className="text-[11px] uppercase tracking-widest font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
