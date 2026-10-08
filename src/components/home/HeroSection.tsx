import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE, NOIR_FRAGRANCE_IMAGE } from '../../data/products';
import { Product } from '../../types';

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
    <section className="relative overflow-hidden bg-[#F7F4EF] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Editorial Left Side */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
                <span>Haute Parfumerie &amp; Biomimetic Skincare</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#181818] font-normal tracking-tight leading-[1.1] text-balance">
                Beauty, beyond categories.
              </h1>
              <p className="text-sm sm:text-base text-[#181818]/75 font-light leading-relaxed max-w-xl">
                A modern beauty house devoted to slow rituals, considered formulas, and pure self-expression.
                Crafted without traditional gender boundaries, engineered around the biological needs of living skin.
              </p>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreShop}
                className="bg-[#181818] hover:bg-black text-[#F7F4EF] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-xs"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreRituals}
                className="border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-[#F7F4EF] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center cursor-pointer"
              >
                Discover Daily Rituals
              </button>
            </div>

            {/* Unboxed Proof / Adjacency Markers */}
            <div className="pt-6 border-t border-[#E5DFD5] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#181818]/70 font-light">
              <span>Haute Parfumerie Extract</span>
              <span aria-hidden="true">·</span>
              <span>3:1:1 Biomimetic Lipids</span>
              <span aria-hidden="true">·</span>
              <span>Cruelty-Free &amp; Sustainable Glass</span>
            </div>
          </div>

          {/* Editorial Visual Composition Right Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#E8DFD3] shadow-lg">
              <img
                src={HERO_IMAGE}
                alt="AUREN Haute Parfumerie & Skincare Campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Editorial Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 border border-white/60 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-[#CDAA7D] font-semibold block">
                  Signature Chapter
                </span>
                <h3 className="font-serif text-base text-[#181818] font-medium">
                  Noir 03 &amp; Cloud Barrier
                </h3>
                <p className="text-[11px] text-[#181818]/70 mt-1 line-clamp-2">
                  The morning-to-night pairing: deep lipid barrier nourishment followed by resonant cedarwood amber sillage.
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#181818]">
                    From ₹1,890
                  </span>
                  <button
                    onClick={() => onSelectProduct('cloud-barrier-cream')}
                    className="text-[#543544] hover:text-[#181818] font-medium uppercase tracking-wider text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Formula</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
