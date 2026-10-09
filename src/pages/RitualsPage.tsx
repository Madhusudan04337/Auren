import React, { useState } from 'react';
import { RITUALS } from '../data/rituals';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Check, Clock, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface RitualsPageProps {
  onSelectProduct: (product: Product) => void;
}

export const RitualsPage: React.FC<RitualsPageProps> = ({ onSelectProduct }) => {
  const [activeRitualId, setActiveRitualId] = useState<string>(RITUALS[0].id);
  const { addToCart } = useCart();
  const [addedRitualId, setAddedRitualId] = useState<string | null>(null);
  const [addedSingleId, setAddedSingleId] = useState<string | null>(null);

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
    setTimeout(() => setAddedRitualId(null), 2500);
  };

  const handleAddSingleProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'Standard';
    const defaultShade = product.shades ? product.shades[0] : undefined;
    addToCart(product, defaultSize, defaultShade, 1);
    setAddedSingleId(product.id);
    setTimeout(() => setAddedSingleId(null), 1500);
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
          <h1 className="font-serif text-4xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight">
            Rituals, Not Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
            We abandon the antiquated divide of separate gender aisles.
            Our formulations are choreographed around living biological requirements, circadian transitions, and emotional sanctuary.
          </p>
        </div>

        {/* Ritual Selector Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
          {RITUALS.map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => setActiveRitualId(ritual.id)}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeRitualId === ritual.id
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-sm'
                  : 'bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white'
              }`}
            >
              {ritual.name}
            </button>
          ))}
        </div>

        {/* =========================================================================
            DESKTOP-RESPONSIVE BALANCED GRID
            Left Column (5 cols): Atmospheric Visual Campaign + Bundle Purchase Box
            Right Column (7 cols): Sequential Choreography Steps with Clean Compact Thumbnails
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Atmosphere & Bundle Box */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Visual Campaign Card */}
            <div className="relative aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121212] border border-black/5 dark:border-white/10 shadow-lg group">
              <LuxuryImage
                src={activeRitual.image}
                alt={activeRitual.name}
                fallbackText="Protocol"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                    {activeRitual.timeOfDay} Protocol
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-light bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{activeRitual.steps.length} Steps Sequence</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-white/70 block">
                    {activeRitual.mood}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                    {activeRitual.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                    {activeRitual.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Ritual Bundle Adoption Box */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E5DFD5]/80 dark:border-[#262626] shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4 border-b border-[#E5DFD5]/80 dark:border-[#262626] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                    Complete Set
                  </span>
                  <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                    Adopt Entire Sequence
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-mono text-lg font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                    ₹{discountedPrice.toLocaleString()}
                  </div>
                  <div className="font-mono text-xs line-through text-[#121212]/40 dark:text-[#F5F3EF]/40 tabular-nums">
                    ₹{ritualTotalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#B89B6C] dark:text-[#D4AF37] font-medium">
                <span>10% Atelier Sequence Courtesy</span>
                <span>Save ₹{savings.toLocaleString()}</span>
              </div>

              <button
                onClick={handleAddEntireRitual}
                className={`w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  addedRitualId === activeRitual.id
                    ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white dark:text-[#121212]'
                    : 'bg-[#121212] text-white hover:bg-black dark:bg-[#F5F3EF] dark:text-[#0C0C0C] dark:hover:bg-white'
                }`}
              >
                {addedRitualId === activeRitual.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sequence Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add All {activeRitual.products.length} Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                <span>Zero Occlusivity Layering Guarantee · Refillable Glass</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stepped Sequential Choreography Protocol */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5DFD5]/80 dark:border-[#262626] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                  Step-by-Step
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF]">
                  Sequential Choreography
                </h3>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#121212]/50 dark:text-[#F5F3EF]/50">
                {activeRitual.steps.length} Chapters
              </span>
            </div>

            <div className="space-y-4">
              {activeRitual.steps.map((step) => {
                const product = activeRitual.products.find(p => p.id === step.productId);
                return (
                  <div
                    key={step.stepNumber}
                    className="bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-7 border border-[#E5DFD5]/80 dark:border-[#262626] shadow-xs space-y-5 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    {/* Step Milestone Info */}
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-[#B89B6C] dark:text-[#D4AF37] px-2.5 py-1 bg-[#FAF8F5] dark:bg-[#1C1C1C] rounded-full border border-black/5 dark:border-white/10 shrink-0">
                        0{step.stepNumber}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-serif text-lg sm:text-xl font-medium text-[#121212] dark:text-[#F5F3EF] leading-snug">
                          {step.stepName}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </div>

                    {/* Paired Product Card (Clean compact fixed-size thumbnail) */}
                    {product && (
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5]/80 dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Contained Fixed Thumbnail Stage - Never explodes */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-[#F5F1EB] dark:bg-[#222222] border border-black/5 dark:border-white/10 relative">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="space-y-0.5 truncate">
                            <div className="text-[10px] uppercase tracking-wider text-[#121212]/50 dark:text-[#F5F3EF]/50">
                              {product.category} · {product.type}
                            </div>
                            <div className="font-serif text-sm sm:text-base font-medium text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors truncate">
                              {product.name}
                            </div>
                            <div className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                              ₹{product.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => handleAddSingleProduct(product, e)}
                            aria-label={`Add ${product.name} to bag`}
                            className={`p-2.5 rounded-full text-xs transition-colors flex items-center justify-center cursor-pointer shadow-xs ${
                              addedSingleId === product.id
                                ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white'
                                : 'bg-[#121212] hover:bg-black text-white dark:bg-[#F5F3EF] dark:text-[#121212] dark:hover:bg-white'
                            }`}
                          >
                            {addedSingleId === product.id ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="hidden sm:flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#121212]/60 dark:text-[#F5F3EF]/60 group-hover:text-[#121212] dark:group-hover:text-white transition-colors">
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
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
