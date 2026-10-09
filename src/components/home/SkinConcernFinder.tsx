import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { LuxuryImage } from '../ui/LuxuryImage';

interface SkinConcernFinderProps {
  onSelectProduct: (product: Product) => void;
  onNavigateRituals: () => void;
}

export const SkinConcernFinder: React.FC<SkinConcernFinderProps> = ({
  onSelectProduct,
  onNavigateRituals
}) => {
  const [selectedConcern, setSelectedConcern] = useState<string>('Barrier');
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const concernsList = [
    { id: 'Barrier', label: 'Barrier Rebuild', description: 'Deep intercellular lipid repair for sensitized, peeling, or reactive skin' },
    { id: 'Dryness', label: 'Dehydration & Dryness', description: '72-hour sustained moisture replenishment without pore clogging' },
    { id: 'Sensitivity', label: 'Calm & Redness', description: 'Soothing botanicals to calm micro-inflammation and irritation' },
    { id: 'Dullness', label: 'Tone & Radiance', description: 'Gentle cell turnover and light-refracting botanical antioxidants' },
    { id: 'Firmness', label: 'Nocturnal Firmness', description: 'Bio-peptides to stimulate nocturnal collagen synthesis and elastic bounce' }
  ];

  const matchedProducts = PRODUCTS.filter(p =>
    p.concerns.some(c => c.toLowerCase().includes(selectedConcern.toLowerCase()))
  ).slice(0, 3);

  const activeConcernObj = concernsList.find(c => c.id === selectedConcern);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'Standard';
    const defaultShade = product.shades ? product.shades[0] : undefined;
    addToCart(product, defaultSize, defaultShade, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] py-16 sm:py-24 border-b border-[#E5DFD5]/80 dark:border-[#222222] transition-colors duration-200">
      {/* Subtle curved background lipid aura */}
      <div 
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-[50%_50%_60%_40%/40%_60%_40%_60%] bg-gradient-to-b from-[#F2E8DC]/40 to-transparent dark:from-[#D4AF37]/5 dark:to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Personalized Diagnostic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            What does your skin need today?
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
            Select an immediate dermal priority to view biomimetic formulas engineered specifically for your skin state.
          </p>
        </div>

        {/* Concern Selector Tabs with Smooth Rounded Contours */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {concernsList.map((concern) => (
            <button
              key={concern.id}
              onClick={() => setSelectedConcern(concern.id)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer ${
                selectedConcern === concern.id
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-md scale-102'
                  : 'bg-white dark:bg-[#161616] border border-[#E5DFD5]/80 dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white hover:scale-101'
              }`}
            >
              {concern.label}
            </button>
          ))}
        </div>

        {/* Diagnostic Explanation Banner with Gentle Curves */}
        {activeConcernObj && (
          <div className="max-w-3xl mx-auto bg-[#F0EBE3]/80 dark:bg-[#171717]/80 rounded-2xl p-4 border border-[#E5DFD5]/80 dark:border-[#262626] text-center text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light shadow-2xs backdrop-blur-xs">
            <strong className="font-medium text-[#121212] dark:text-[#F5F3EF] uppercase tracking-wider text-[11px] block sm:inline mr-2">
              Clinical Rationale:
            </strong>
            {activeConcernObj.description}.
          </div>
        )}

        {/* Matched Products Grid with Rounded Corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matchedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white dark:bg-[#141414] rounded-2xl sm:rounded-3xl border border-[#E5DFD5]/80 dark:border-[#262626] p-5 flex flex-col justify-between space-y-4 hover:border-[#B89B6C]/60 dark:hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#B89B6C]/10 transition-all duration-300 cursor-pointer group shadow-2xs"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-[#F5F1EB] dark:bg-[#1C1C1C] rounded-xl overflow-hidden relative">
                  <LuxuryImage
                    src={product.images[0]}
                    alt={product.name}
                    fallbackText={product.type}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#121212]/90 backdrop-blur-xs text-white dark:bg-[#F5F3EF]/90 dark:text-[#0C0C0C] text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#121212]/60 dark:text-[#F5F3EF]/60">
                    {product.category} · {product.type}
                  </div>
                  <h3 className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 line-clamp-2 leading-relaxed">
                    {product.benefit}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between">
                <span className="font-mono text-sm font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                  ₹{product.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className={`text-xs uppercase tracking-wider py-1.5 px-4 rounded-full font-medium transition-all duration-300 cursor-pointer shadow-xs ${
                    addedId === product.id
                      ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white dark:text-[#121212]'
                      : 'bg-[#121212] text-white hover:bg-black dark:bg-[#F5F3EF] dark:text-[#121212] dark:hover:bg-white'
                  }`}
                >
                  {addedId === product.id ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> Added
                    </span>
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Build Full Custom Ritual */}
        <div className="text-center pt-4">
          <button
            onClick={onNavigateRituals}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] pb-1 border-b border-[#121212] dark:border-[#F5F3EF] transition-colors cursor-pointer"
          >
            <span>Explore All 4 Signature Ritual Protocols</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
