import React from 'react';
import { INGREDIENT_STORIES } from '../../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IngredientStoryProps {
  onSelectProductByName: (productName: string) => void;
}

export const IngredientStory: React.FC<IngredientStoryProps> = ({
  onSelectProductByName
}) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0C0C0C] py-16 sm:py-24 border-b border-[#E5DFD5]/80 dark:border-[#222222] transition-colors duration-200">
      {/* Background Organic Wave Contours */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-48 opacity-25 dark:opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 1440 200" fill="none" className="w-full h-full text-[#B89B6C] dark:text-[#D4AF37]">
          <path d="M0,100 C360,180 720,20 1080,140 C1260,200 1380,80 1440,110 L1440,200 L0,200 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Radical INCI Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Considered Active Ingredients
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed">
            We reject marketing buzzwords. Every active molecule is selected for physiological compatibility, bio-availability, and clean dermatological efficacy.
          </p>
        </div>

        {/* 4-Column Ingredient Cards with Rounded Organic Curves */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENT_STORIES.map((ingredient, idx) => (
            <div
              key={ingredient.id}
              className="bg-[#FAF8F5] dark:bg-[#141414] p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#E5DFD5]/80 dark:border-[#262626] flex flex-col justify-between space-y-4 hover:border-[#B89B6C]/60 dark:hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#B89B6C]/8 transition-all duration-300 relative overflow-hidden group shadow-2xs"
            >
              {/* Subtle organic watermark curve on hover */}
              <div 
                aria-hidden="true" 
                className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#B89B6C]/5 dark:bg-[#D4AF37]/5 blur-lg pointer-events-none group-hover:scale-150 transition-transform duration-500" 
              />

              <div className="space-y-3 relative z-10">
                <span className="font-mono text-[11px] text-[#B89B6C] dark:text-[#D4AF37] font-medium tracking-widest block">
                  0{idx + 1} · BIOMARKER
                </span>
                <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] leading-snug">
                  {ingredient.name}
                </h3>
                <div className="text-[11px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                  {ingredient.role}
                </div>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed">
                  {ingredient.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5]/80 dark:border-[#262626] space-y-2 relative z-10">
                <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                  <strong className="text-[#121212] dark:text-[#F5F3EF] font-medium">Clinical Result: </strong>
                  {ingredient.benefit}
                </div>
                <button
                  onClick={() => onSelectProductByName(ingredient.featuredProduct)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE8DE]/70 dark:bg-[#202020] text-xs uppercase tracking-wider text-[#121212] dark:text-[#F5F3EF] font-semibold hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer pt-1"
                >
                  <span>In {ingredient.featuredProduct}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
