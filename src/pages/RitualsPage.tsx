import React, { useState } from 'react';
import { RITUALS } from '../data/rituals';
import { Ritual, Product } from '../types';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="bg-[#F4F1E8] min-h-screen py-10 sm:py-16 text-[#2D3A1F]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#2D3A1F] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B8A678]" />
            <span>The Core Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2D3A1F] font-normal">
            Rituals, Not Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#2D3A1F]/75 font-light leading-relaxed">
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
                  ? 'bg-[#2D3A1F] text-[#F4F1E8] shadow-xs'
                  : 'bg-[#E8E2D0] border border-[#D8D7CC] text-[#2D3A1F] hover:border-[#2D3A1F]'
              }`}
            >
              {ritual.name}
            </button>
          ))}
        </div>

        {/* Active Ritual Spotlight Box */}
        <div className="bg-white border border-[#D8D7CC] shadow-xs overflow-hidden">
          {/* Top Banner with Image Backdrop */}
          <div className="relative aspect-16/9 sm:aspect-21/9 bg-[#2D3A1F] overflow-hidden">
            <LuxuryImage
              src={activeRitual.image}
              alt={activeRitual.name}
              fallbackText="Protocol"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3 text-xs text-[#B8A678] uppercase tracking-widest font-semibold">
                  <span>{activeRitual.timeOfDay} Protocol</span>
                  <span>·</span>
                  <span>{activeRitual.mood}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white">
                  {activeRitual.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {activeRitual.description}
                </p>
              </div>

              {/* Bundle Purchase Trigger */}
              <div className="bg-[#F4F1E8] p-4 text-[#2D3A1F] border border-[#D8D7CC] shrink-0 sm:w-72 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] uppercase tracking-wider text-[#2D3A1F]/70">Ritual Bundle</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm font-bold tabular-nums text-[#2D3A1F]">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs line-through text-[#2D3A1F]/40 tabular-nums">
                      ₹{ritualTotalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddEntireRitual}
                  className={`w-full py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
                    addedRitualId === activeRitual.id
                      ? 'bg-[#B8A678] text-[#2D3A1F]'
                      : 'bg-[#2D3A1F] text-[#F4F1E8] hover:bg-[#1E2714]'
                  }`}
                >
                  {addedRitualId === activeRitual.id ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ritual Added to Bag
                    </span>
                  ) : (
                    'Add Ritual Set (-10%)'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step-by-Step Choreography */}
          <div className="p-6 sm:p-12 space-y-8">
            <div className="border-b border-[#D8D7CC] pb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl text-[#2D3A1F]">
                Choreographed Steps ({activeRitual.steps.length} Phases)
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#2D3A1F] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B8A678]" />
                <span>Formulated to layer without pilling</span>
              </div>
            </div>

            <div className="space-y-6">
              {activeRitual.steps.map((step) => {
                const product = activeRitual.products.find(p => p.id === step.productId);
                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 bg-[#E8E2D0]/40 border border-[#D8D7CC] hover:border-[#2D3A1F] transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="font-mono text-lg font-bold text-[#B8A678] shrink-0 pt-0.5">
                        0{step.stepNumber}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base font-medium text-[#2D3A1F]">
                          {step.stepName}
                        </h4>
                        <p className="text-xs text-[#2D3A1F]/75 font-light leading-relaxed max-w-xl">
                          {step.instruction}
                        </p>
                      </div>
                    </div>

                    {product && (
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center gap-3 bg-white p-2.5 border border-[#D8D7CC] cursor-pointer hover:border-[#2D3A1F] transition-colors shrink-0 w-full md:w-auto"
                      >
                        <LuxuryImage
                          src={product.images[0]}
                          alt={product.name}
                          fallbackText={product.type}
                          className="w-12 h-12 object-cover bg-[#F4F1E8]"
                        />
                        <div className="space-y-0.5 pr-2">
                          <div className="font-serif text-xs font-medium text-[#2D3A1F]">{product.name}</div>
                          <div className="font-mono text-[11px] text-[#2D3A1F]/70 tabular-nums">
                            ₹{product.price.toLocaleString()}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2D3A1F]/50" />
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
