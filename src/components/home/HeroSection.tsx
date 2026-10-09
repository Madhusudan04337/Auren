import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../../data/products';
import { LuxuryImage } from '../ui/LuxuryImage';
import { OrganicWaveBackground } from '../ui/OrganicWaveBackground';

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
    <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] border-b border-[#E5DFD5]/80 dark:border-[#222222] transition-colors duration-200">
      {/* Background Parallax Waves & Organic Glow Orbs */}
      <OrganicWaveBackground variant="hero" speed={0.22} showOrbs={true} />

      {/* Subtle Curved Background Shape Aura */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40 dark:opacity-20"
      >
        <div className="w-full h-full rounded-[45%_55%_65%_35%/35%_65%_35%_65%] bg-radial from-[#F5ECE1]/60 via-[#EAE1D5]/20 to-transparent dark:from-[#D4AF37]/5 dark:via-transparent dark:to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Editorial Left Side */}
          <div className="lg:col-span-6 space-y-7 md:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC]/70 dark:bg-[#1E1E1E]/80 backdrop-blur-xs text-xs uppercase tracking-[0.22em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold border border-[#E5DFD5]/60 dark:border-[#2A2A2A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Haute Parfumerie &amp; Biomimetic Skincare</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight leading-[1.12] text-balance">
                Beauty, beyond categories.
              </h1>
              <p className="text-sm sm:text-base text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light leading-relaxed max-w-xl">
                A modern beauty house devoted to slow rituals, considered formulas, and pure self-expression.
                Crafted without traditional gender boundaries, engineered around the biological needs of living skin.
              </p>
            </div>

            {/* Direct Rounded CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={onExploreShop}
                className="bg-[#121212] hover:bg-black text-white dark:bg-[#F5F3EF] dark:hover:bg-white dark:text-[#0C0C0C] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreRituals}
                className="border border-[#121212]/80 text-[#121212] hover:bg-[#121212] hover:text-white dark:border-[#F5F3EF]/80 dark:text-[#F5F3EF] dark:hover:bg-[#F5F3EF] dark:hover:text-[#0C0C0C] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
              >
                Discover Daily Rituals
              </button>
            </div>

            {/* Unboxed Proof / Adjacency Markers */}
            <div className="pt-6 border-t border-[#E5DFD5]/80 dark:border-[#222222] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light">
              <span>Haute Parfumerie Extract</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>3:1:1 Biomimetic Lipids</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>Cruelty-Free &amp; Sustainable Glass</span>
            </div>
          </div>

          {/* Editorial Visual Composition Right Side */}
          <div className="lg:col-span-6 relative">
            {/* Ambient curved ring behind the image */}
            <div 
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-6 rounded-[36px] sm:rounded-[44px] bg-gradient-to-tr from-[#E6DBCF]/40 to-transparent dark:from-[#D4AF37]/10 dark:to-transparent -rotate-1 pointer-events-none blur-sm"
            />

            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#E8DFD3] dark:bg-[#1E1E1E] shadow-2xl border border-[#E5DFD5]/60 dark:border-[#262626]">
              <LuxuryImage
                src={HERO_IMAGE}
                alt="AUREN Haute Parfumerie &amp; Skincare Campaign"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Editorial Card with Organic Rounded Curves */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/92 dark:bg-[#141414]/92 backdrop-blur-md p-5 rounded-2xl border border-[#E5DFD5]/80 dark:border-[#262626] shadow-xl space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                  Signature Chapter
                </span>
                <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] font-medium leading-snug">
                  Noir 03 &amp; Cloud Barrier
                </h3>
                <p className="text-[11px] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed line-clamp-2">
                  The morning-to-night pairing: deep lipid barrier nourishment followed by resonant cedarwood amber sillage.
                </p>
                <div className="pt-2.5 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between text-xs">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                    From ₹1,890
                  </span>
                  <button
                    onClick={() => onSelectProduct('cloud-barrier-cream')}
                    className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#1E1E1E] text-[#B89B6C] dark:text-[#D4AF37] hover:text-[#121212] dark:hover:text-white font-medium uppercase tracking-wider text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs border border-[#E5DFD5]/50 dark:border-[#2A2A2A]"
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
