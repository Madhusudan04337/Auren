import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Check, Sparkles } from 'lucide-react';
import { LuxuryImage } from '../ui/LuxuryImage';

interface RoutineBuilderProps {
  currentProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export const RoutineBuilder: React.FC<RoutineBuilderProps> = ({
  currentProduct,
  onSelectProduct
}) => {
  const { addToCart } = useCart();

  // Curate 3 complementary products to form a complete 4-step ritual
  const complementaryProducts = PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 3);
  const allRoutineItems = [currentProduct, ...complementaryProducts];

  const [selectedIds, setSelectedIds] = useState<string[]>(
    allRoutineItems.map(item => item.id)
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedProducts = allRoutineItems.filter(p => selectedIds.includes(p.id));
  const totalRoutinePrice = selectedProducts.reduce((acc, p) => acc + p.price, 0);
  const discountedPrice = Math.round(totalRoutinePrice * 0.9); // 10% ritual bundle savings
  const bundleSavings = totalRoutinePrice - discountedPrice;

  const handleAddBundle = () => {
    selectedProducts.forEach(product => {
      const defaultSize = product.sizes[0]?.size || 'Standard';
      const defaultShade = product.shades ? product.shades[0] : undefined;
      addToCart(product, defaultSize, defaultShade, 1);
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const stepLabels = ['Phase I · Cleanse', 'Phase II · Treat', 'Phase III · Lipid Seal', 'Phase IV · Scent & Shield'];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#141414] p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#262626] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD5] dark:border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Harmonized Protocol</span>
          </div>
          <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF] mt-1">
            Complete The Ritual
          </h3>
          <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mt-0.5">
            Formulas engineered to amplify intercellular absorption and longevity when paired.
          </p>
        </div>

        {bundleSavings > 0 && (
          <div className="bg-[#B89B6C]/15 dark:bg-[#D4AF37]/15 text-[#B89B6C] dark:text-[#D4AF37] text-xs px-3 py-1 font-medium tracking-wide">
            Save 10% with Ritual Bundle
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allRoutineItems.map((prod, idx) => {
          const isSelected = selectedIds.includes(prod.id);
          const isCurrent = prod.id === currentProduct.id;

          return (
            <div
              key={prod.id}
              className={`relative bg-white dark:bg-[#1A1A1A] p-4 border transition-all ${
                isSelected
                  ? 'border-[#121212] dark:border-white shadow-xs'
                  : 'border-[#E5DFD5] dark:border-[#262626] opacity-60'
              }`}
            >
              {/* Checkbox trigger */}
              <button
                type="button"
                onClick={() => toggleItem(prod.id)}
                className={`absolute top-3 right-3 w-5 h-5 rounded-xs border flex items-center justify-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#121212] bg-[#121212] text-white dark:border-white dark:bg-white dark:text-[#121212]'
                    : 'border-[#E5DFD5] dark:border-[#333] bg-white dark:bg-[#1A1A1A]'
                }`}
                aria-label={`Toggle ${prod.name}`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>

              <span className="text-[10px] uppercase tracking-widest text-[#121212]/50 dark:text-[#F5F3EF]/50 block font-medium">
                {stepLabels[idx] || `Step ${idx + 1}`}
              </span>

              {/* Product Thumbnail */}
              <div
                onClick={() => onSelectProduct(prod)}
                className="my-3 aspect-square bg-[#F5F1EB] dark:bg-[#202020] overflow-hidden cursor-pointer"
              >
                <LuxuryImage
                  src={prod.images[0]}
                  alt={prod.name}
                  fallbackText={prod.category}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <h4
                  onClick={() => onSelectProduct(prod)}
                  className="font-serif text-sm font-medium text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1"
                >
                  {prod.name}
                  {isCurrent && (
                    <span className="ml-1 text-[10px] text-[#B89B6C] dark:text-[#D4AF37] font-sans font-normal">(Current)</span>
                  )}
                </h4>
                <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 line-clamp-1">
                  {prod.subtitle}
                </div>
                <div className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF] pt-1">
                  ₹{prod.price.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Summary and Bundle Add */}
      <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60">
              Protocol Subtotal ({selectedProducts.length} items):
            </span>
            <span className="font-mono text-base font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
              ₹{discountedPrice.toLocaleString()}
            </span>
            {bundleSavings > 0 && (
              <span className="font-mono text-xs line-through text-[#121212]/40 dark:text-[#F5F3EF]/40 tabular-nums">
                ₹{totalRoutinePrice.toLocaleString()}
              </span>
            )}
          </div>
          {bundleSavings > 0 && (
            <p className="text-[11px] text-[#B89B6C] dark:text-[#D4AF37] font-medium">
              Complimentary ₹{bundleSavings.toLocaleString()} ritual savings applied automatically
            </p>
          )}
        </div>

        <button
          onClick={handleAddBundle}
          disabled={selectedProducts.length === 0}
          className={`py-3 px-6 text-xs uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer ${
            addedSuccess
              ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white dark:text-[#121212]'
              : selectedProducts.length === 0
              ? 'bg-black/20 text-white/60 cursor-not-allowed'
              : 'bg-[#121212] text-white hover:bg-black dark:bg-[#F5F3EF] dark:text-[#0C0C0C] dark:hover:bg-white'
          }`}
        >
          {addedSuccess
            ? 'Complete Ritual Added To Bag'
            : `Add Entire Ritual (${selectedProducts.length} Formulas)`}
        </button>
      </div>
    </div>
  );
};
