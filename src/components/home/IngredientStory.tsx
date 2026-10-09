import React from 'react';
import { INGREDIENT_STORIES } from '../../data/products';
import { ArrowRight } from 'lucide-react';

interface IngredientStoryProps {
  onSelectProductByName: (productName: string) => void;
}

export const IngredientStory: React.FC<IngredientStoryProps> = ({
  onSelectProductByName
}) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0C0C0C] py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222] transition-colors duration-200">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            INCI Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Considered Active Molecules
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light leading-relaxed">
            Selected for biocompatibility, barrier protection, and high bioavailability.
          </p>
        </div>

        {/* 4-Column Ingredient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENT_STORIES.map((ingredient, idx) => (
            <div
              key={ingredient.id}
              className="bg-[#FAF8F5] dark:bg-[#141414] p-6 sm:p-7 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-3">
                <span className="font-mono text-[11px] text-[#B89B6C] dark:text-[#D4AF37] font-medium tracking-widest block">
                  0{idx + 1} · BIOMARKER
                </span>
                <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] leading-snug">
                  {ingredient.name}
                </h3>
                <div className="text-[11px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 font-medium">
                  {ingredient.role}
                </div>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed">
                  {ingredient.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5]/70 dark:border-[#262626] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50 truncate max-w-[140px]">
                  {ingredient.benefit}
                </span>
                <button
                  onClick={() => onSelectProductByName(ingredient.featuredProduct)}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer shrink-0"
                >
                  <span>View</span>
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
