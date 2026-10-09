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
    <section className="relative overflow-hidden bg-[var(--bg-primary)] border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      {/* =========================================================================
          MOBILE IMMERSIVE BACKGROUND (Visible only on mobile responsive screens < lg)
          Leaves the top and center completely clear so the flacons and amber glow
          are 100% visible, with only a gentle bottom gradient where text sits.
         ========================================================================= */}
      <div className="lg:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <LuxuryImage
          src={HERO_IMAGE}
          alt="AUREN Haute Parfumerie & Skincare Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
        />
        {/* Soft gradient starting only at bottom 45% of screen so the bottles remain crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/60 via-45% to-transparent" />
      </div>

      {/* =========================================================================
          MOBILE CONTENT (Visible only on mobile < lg)
          Minimal, spacious, bottom-anchored layout with soft translucent frosted styling.
          Zero 100% opaque blocks, zero clutter.
         ========================================================================= */}
      <div className="lg:hidden relative z-10 min-h-[78vh] sm:min-h-[82vh] flex flex-col justify-end px-5 sm:px-8 pb-8 pt-20">
        <div className="space-y-4 max-w-md">
          {/* Subtle gold tag */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            <span>Atelier Collection</span>
            <span aria-hidden="true" className="opacity-40">/</span>
            <span>2026</span>
          </div>

          {/* Headline - Light, refined serif */}
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight leading-[1.12]">
            Formulations for living skin.
          </h1>

          {/* Minimal 1-line subtitle with soft opacity */}
          <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
            Biomimetic barrier care and artisanal fine fragrance without gender boundaries.
          </p>

          {/* Minimalist Translucent Frosted Actions (No 100% opaque solid white slabs) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onExploreShop}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
            <button
              onClick={onExploreRituals}
              className="bg-black/30 hover:bg-black/45 text-white/80 hover:text-white backdrop-blur-sm border border-white/15 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Explore Protocols
            </button>
          </div>

          {/* Delicate proof strip */}
          <div className="pt-3 border-t border-white/10 flex items-center gap-3 text-[11px] text-white/50 font-light">
            <span>3:1:1 Lipids</span>
            <span className="text-[#D4AF37]">·</span>
            <span>Haute Parfumerie</span>
            <span className="text-[#D4AF37]">·</span>
            <span>Refillable Glass</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP BALANCED EDITORIAL GRID (Visible on screens >= lg)
          Side-by-side balanced luxury layout with full typography and framed visual card.
         ========================================================================= */}
      <div className="hidden lg:block relative z-10 max-w-[1600px] mx-auto px-8 xl:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-16 items-center">
          {/* Editorial Column */}
          <div className="col-span-6 space-y-8 pr-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                <span>Atelier Collection</span>
                <span aria-hidden="true" className="opacity-40">/</span>
                <span>2026 Release</span>
              </div>

              <h1 className="font-serif text-5xl lg:text-6xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight leading-[1.08] text-balance">
                Formulations for living skin.
              </h1>

              <p className="text-base sm:text-lg text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed max-w-lg">
                Biomimetic barrier care and artisanal fine fragrance engineered without gender boundaries. Slow rituals, pure biological efficacy.
              </p>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-4 pt-2">
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

            {/* Desktop Proof Bar */}
            <div className="pt-8 border-t border-[#E5DFD5]/70 dark:border-[#222222] flex items-center gap-x-6 text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
              <span>Haute Parfumerie Extrait</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>3:1:1 Biomimetic Lipids</span>
              <span aria-hidden="true" className="text-[#B89B6C] dark:text-[#D4AF37]">·</span>
              <span>Refillable Heavy Glass</span>
            </div>
          </div>

          {/* Desktop Framed Image Showcase */}
          <div className="col-span-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#E8DFD3] dark:bg-[#1E1E1E] shadow-2xl border border-black/5 dark:border-white/10 group">
              <LuxuryImage
                src={HERO_IMAGE}
                alt="AUREN Haute Parfumerie & Skincare Campaign"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Product Card */}
              <div className="absolute bottom-6 left-6 max-w-xs bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md p-4 rounded-xl border border-black/5 dark:border-white/10 shadow-xl space-y-2">
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
