import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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
    <section className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
            Personalized Diagnostic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal">
            What does your skin need today?
          </h2>
          <p className="text-xs sm:text-sm text-[#181818]/70 font-light leading-relaxed">
            Select an immediate dermal priority to view biomimetic formulas engineered specifically for your skin state.
          </p>
        </div>

        {/* Concern Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {concernsList.map((concern) => (
            <button
              key={concern.id}
              onClick={() => setSelectedConcern(concern.id)}
              className={`px-4 sm:px-5 py-2.5 text-xs tracking-wider uppercase font-medium transition-all cursor-pointer ${
                selectedConcern === concern.id
                  ? 'bg-[#181818] text-[#F7F4EF] shadow-xs'
                  : 'bg-white border border-[#D8D1C7] text-[#181818] hover:border-[#181818]'
              }`}
            >
              {concern.label}
            </button>
          ))}
        </div>

        {/* Diagnostic Explanation Banner */}
        {activeConcernObj && (
          <div className="max-w-3xl mx-auto bg-white p-4 border border-[#E5DFD5] text-center text-xs text-[#181818]/80 font-light">
            <strong className="font-medium text-[#181818] uppercase tracking-wider text-[11px] block sm:inline mr-2">
              Clinical Rationale:
            </strong>
            {activeConcernObj.description}.
          </div>
        )}

        {/* Matched Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {matchedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white border border-[#E5DFD5] p-5 flex flex-col justify-between space-y-4 hover:border-[#181818] transition-all cursor-pointer group shadow-xs"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-[#F7F4EF] overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-[#181818] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#181818]/60">
                    {product.category} · {product.type}
                  </div>
                  <h3 className="font-serif text-lg text-[#181818] group-hover:text-[#543544] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#181818]/70 line-clamp-2 leading-relaxed">
                    {product.benefit}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between">
                <span className="font-mono text-sm font-semibold tabular-nums text-[#181818]">
                  ₹{product.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className={`text-xs uppercase tracking-wider py-1.5 px-3 font-medium transition-colors cursor-pointer ${
                    addedId === product.id
                      ? 'bg-[#9DA895] text-white'
                      : 'bg-[#181818] text-white hover:bg-black'
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
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#181818] hover:text-[#543544] pb-1 border-b border-[#181818] transition-colors cursor-pointer"
          >
            <span>Explore All 4 Signature Ritual Protocols</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
