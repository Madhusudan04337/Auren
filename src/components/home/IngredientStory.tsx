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
    <section className="bg-white py-16 sm:py-24 border-b border-[#E5DFD5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
            Radical INCI Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal">
            Considered Active Ingredients
          </h2>
          <p className="text-xs sm:text-sm text-[#181818]/70 font-light leading-relaxed">
            We reject marketing buzzwords. Every active molecule is selected for physiological compatibility, bio-availability, and clean dermatological efficacy.
          </p>
        </div>

        {/* 4-Column Ingredient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENT_STORIES.map((ingredient, idx) => (
            <div
              key={ingredient.id}
              className="bg-[#FAF8F5] p-6 border border-[#E5DFD5] flex flex-col justify-between space-y-4 hover:border-[#181818] transition-colors"
            >
              <div className="space-y-3">
                <span className="font-mono text-[11px] text-[#CDAA7D] font-medium tracking-widest block">
                  0{idx + 1} · BIOMARKER
                </span>
                <h3 className="font-serif text-lg text-[#181818] leading-snug">
                  {ingredient.name}
                </h3>
                <div className="text-[11px] uppercase tracking-wider text-[#543544] font-semibold">
                  {ingredient.role}
                </div>
                <p className="text-xs text-[#181818]/70 font-light leading-relaxed">
                  {ingredient.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5] space-y-2">
                <div className="text-[11px] text-[#181818]/60">
                  <strong className="text-[#181818] font-medium">Clinical Result: </strong>
                  {ingredient.benefit}
                </div>
                <button
                  onClick={() => onSelectProductByName(ingredient.featuredProduct)}
                  className="text-xs uppercase tracking-wider text-[#181818] font-semibold hover:text-[#543544] transition-colors flex items-center gap-1 cursor-pointer pt-1"
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
