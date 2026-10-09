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
    { id: 'Barrier', label: 'Barrier Rebuild', description: 'Lipid repair for sensitized, peeling, or reactive skin' },
    { id: 'Dryness', label: 'Hydration', description: '72-hour moisture replenishment without pore clogging' },
    { id: 'Sensitivity', label: 'Calm & Redness', description: 'Botanicals to soothe micro-inflammation and reactivity' },
    { id: 'Dullness', label: 'Radiance', description: 'Gentle cell turnover and light-refracting antioxidants' },
    { id: 'Firmness', label: 'Firmness', description: 'Bio-peptides to stimulate nocturnal collagen bounce' }
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
    <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222] transition-colors duration-200">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            Skin Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Targeted Formulations
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light leading-relaxed">
            Select a dermal priority to view compatible biomimetic treatments.
          </p>
        </div>

        {/* Concern Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {concernsList.map((concern) => (
            <button
              key={concern.id}
              onClick={() => setSelectedConcern(concern.id)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer ${
                selectedConcern === concern.id
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-sm'
                  : 'bg-white dark:bg-[#161616] border border-[#E5DFD5]/80 dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white'
              }`}
            >
              {concern.label}
            </button>
          ))}
        </div>

        {/* Minimal Clinical Note */}
        {activeConcernObj && (
          <p className="text-center text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light max-w-md mx-auto">
            {activeConcernObj.description}
          </p>
        )}

        {/* Matched Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {matchedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white dark:bg-[#141414] rounded-2xl border border-black/5 dark:border-white/10 p-5 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-[#F5F1EB] dark:bg-[#1C1C1C] rounded-xl overflow-hidden relative">
                  <LuxuryImage
                    src={product.images[0]}
                    alt={product.name}
                    fallbackText={product.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#121212]/50 dark:text-[#F5F3EF]/50">
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
                  className={`text-xs uppercase tracking-wider py-1.5 px-4 rounded-full font-medium transition-all duration-300 cursor-pointer ${
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

        {/* Clean Link to Rituals */}
        <div className="text-center pt-2">
          <button
            onClick={onNavigateRituals}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#121212]/80 dark:text-[#F5F3EF]/80 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <span>Explore All 4 Signature Ritual Protocols</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
