import React, { useState } from 'react';
import { RITUALS } from '../data/rituals';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface RitualsPageProps {
  onSelectProduct: (product: Product) => void;
}

export const RitualsPage: React.FC<RitualsPageProps> = ({ onSelectProduct }) => {
  const [activeRitualId, setActiveRitualId] = useState<string>(RITUALS[0].id);
  const { addToCart } = useCart();
  const [addedRitualId, setAddedRitualId] = useState<string | null>(null);

  const activeRitual = RITUALS.find(r => r.id === activeRitualId) || RITUALS[0];

  const ritualTotalPrice = activeRitual.products.reduce((acc, p) => acc + p.price, 0);
  const discountedPrice = Math.round(ritualTotalPrice * 0.9); // 10% savings
  const savings = ritualTotalPrice - discountedPrice;

  const handleAddEntireRitual = () => {
    activeRitual.products.forEach(p => {
      const defaultSize = p.sizes[0]?.size || 'Standard';
      const defaultShade = p.shades ? p.shades[0] : undefined;
      addToCart(p, defaultSize, defaultShade, 1);
    });
    setAddedRitualId(activeRitual.id);
    setTimeout(() => setAddedRitualId(null), 2000);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Core Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Rituals, Not Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
            We abandon the antiquated divide of separate men&apos;s and women&apos;s aisles.
            Our formulations are orchestrated around living biological requirements, daily circadian transitions, and emotional sanctuary.
          </p>
        </div>

        {/* Ritual Selector Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
          {RITUALS.map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => setActiveRitualId(ritual.id)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeRitualId === ritual.id
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-xs'
                  : 'bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white'
              }`}
            >
              {ritual.name}
            </button>
          ))}
        </div>

        {/* Active Ritual Spotlight Box */}
        <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-xs overflow-hidden">
          {/* Top Banner with Image Backdrop */}
          <div className="relative aspect-16/9 sm:aspect-21/9 bg-[#121212] overflow-hidden">
            <LuxuryImage
              src={activeRitual.image}
              alt={activeRitual.name}
              fallbackText="Protocol"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3 text-xs text-[#B89B6C] dark:text-[#D4AF37] uppercase tracking-widest font-semibold">
                  <span>{activeRitual.timeOfDay} Protocol</span>
                  <span>·</span>
                  <span>{activeRitual.mood}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                  {activeRitual.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {activeRitual.tagline}
                </p>
              </div>

              {/* Ritual Bundle Purchase Summary */}
              <div className="bg-[#FAF8F5] dark:bg-[#1C1C1C] p-4 text-[#121212] dark:text-[#F5F3EF] border border-[#E5DFD5] dark:border-[#262626] shrink-0 sm:w-72 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70">Ritual Bundle</span>
                  <div className="space-x-1.5">
                    <span className="font-mono text-sm font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs line-through text-[#121212]/40 dark:text-[#F5F3EF]/40 tabular-nums">
                      ₹{ritualTotalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-[#B89B6C] dark:text-[#D4AF37] uppercase tracking-widest">
                  10% Atelier Sequence Courtesy (Save ₹{savings.toLocaleString()})
                </div>
                <button
                  onClick={handleAddEntireRitual}
                  className={`w-full py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
                    addedRitualId === activeRitual.id
                      ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white dark:text-[#121212]'
                      : 'bg-[#121212] text-white hover:bg-black dark:bg-[#F5F3EF] dark:text-[#0C0C0C] dark:hover:bg-white'
                  }`}
                >
                  {addedRitualId === activeRitual.id ? 'Ritual Added to Bag' : 'Adopt Entire Ritual'}
                </button>
              </div>
            </div>
          </div>

          {/* Stepped Ritual Choreography Protocol */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] dark:border-[#262626] pb-4">
              <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                Sequential Choreography
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                <span>Zero Occlusivity Layering Guarantee</span>
              </div>
            </div>

            <div className="space-y-4">
              {activeRitual.steps.map((step) => {
                const product = activeRitual.products.find(p => p.id === step.productId);
                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-semibold text-[#B89B6C] dark:text-[#D4AF37] pt-0.5">
                        0{step.stepNumber}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base font-medium text-[#121212] dark:text-[#F5F3EF]">
                          {step.stepName}
                        </h4>
                        <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed max-w-xl">
                          {step.instruction}
                        </p>
                      </div>
                    </div>

                    {product && (
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center gap-3 bg-white dark:bg-[#141414] p-2.5 border border-[#E5DFD5] dark:border-[#262626] cursor-pointer hover:border-[#121212] dark:hover:border-white transition-colors shrink-0 w-full md:w-auto"
                      >
                        <LuxuryImage
                          src={product.images[0]}
                          alt={product.name}
                          fallbackText={product.type}
                          className="w-12 h-12 object-cover bg-[#F5F1EB] dark:bg-[#1C1C1C]"
                        />
                        <div className="space-y-0.5 pr-2">
                          <div className="font-serif text-xs font-medium text-[#121212] dark:text-[#F5F3EF]">{product.name}</div>
                          <div className="font-mono text-[11px] text-[#121212]/70 dark:text-[#F5F3EF]/70 tabular-nums">
                            ₹{product.price.toLocaleString()}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#121212]/50 dark:text-[#F5F3EF]/50" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
