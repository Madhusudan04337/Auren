import React, { useState } from 'react';
import { Product, Shade } from '../../types';
import { X, Star, Heart, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShadeSelector } from './ShadeSelector';
import { LuxuryImage } from '../ui/LuxuryImage';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onViewDetails: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onViewDetails
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.size || 'Standard'
  );
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const activePriceObj = product.sizes.find(s => s.size === selectedSize);
  const currentPrice = activePriceObj ? activePriceObj.price : product.price;
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedShade, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#F5F3EF] max-w-4xl w-full border border-[#E5DFD5] dark:border-[#262626] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-[#1E1E1E]/80 hover:bg-white dark:hover:bg-[#282828] text-[#121212] dark:text-[#F5F3EF] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual stage */}
          <div className="relative aspect-square md:aspect-auto bg-[#F5F1EB] dark:bg-[#1C1C1C]">
            <LuxuryImage
              src={product.images[0]}
              alt={product.name}
              fallbackText={product.type}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
                {product.badge}
              </div>
            )}
          </div>

          {/* Product configuration */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60">
                <span className="uppercase tracking-widest">{product.category} · {product.type}</span>
                <div className="flex items-center gap-1 text-[#121212] dark:text-[#F5F3EF]">
                  <Star className="w-3.5 h-3.5 fill-[#B89B6C] text-[#B89B6C] dark:fill-[#D4AF37] dark:text-[#D4AF37]" />
                  <span className="font-mono tabular-nums text-xs font-semibold">{product.rating}</span>
                  <span>({product.reviewCount})</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF] leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-[#B89B6C] dark:text-[#D4AF37] tracking-wider uppercase font-medium mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xl font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                  ₹{currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-[#121212]/40 dark:text-[#F5F3EF]/40 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Benefit & Description */}
              <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Shade Selector if makeup */}
              {product.shades && product.shades.length > 0 && selectedShade && (
                <ShadeSelector
                  shades={product.shades}
                  selectedShade={selectedShade}
                  onSelectShade={setSelectedShade}
                />
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 1 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs uppercase tracking-widest text-[#121212]/60 dark:text-[#F5F3EF]/60 font-medium">
                    Flacon Volume
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s.size)}
                        className={`px-3 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                          selectedSize === s.size
                            ? 'border-[#121212] bg-[#121212] text-white dark:border-[#F5F3EF] dark:bg-[#F5F3EF] dark:text-[#0C0C0C]'
                            : 'border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#181818] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white'
                        }`}
                      >
                        {s.size} · ₹{s.price.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Active Callout */}
              <div className="bg-white/70 dark:bg-[#181818] p-3 border border-[#E5DFD5] dark:border-[#262626] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#121212] dark:text-[#F5F3EF] font-medium">
                  <Sparkles className="w-3 h-3 text-[#B89B6C] dark:text-[#D4AF37]" />
                  <span>Key Botanical Active</span>
                </div>
                <div className="text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light">
                  <strong className="font-medium text-[#121212] dark:text-[#F5F3EF]">{product.keyIngredients[0]?.name}: </strong>
                  {product.keyIngredients[0]?.description}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E5DFD5] dark:border-[#262626]">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#181818]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#121212] dark:text-[#F5F3EF] hover:bg-[#F5F1EB] dark:hover:bg-[#252525] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs px-3 font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#121212] dark:text-[#F5F3EF] hover:bg-[#F5F1EB] dark:hover:bg-[#252525] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedSuccess
                      ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-white dark:text-[#121212]'
                      : 'bg-[#121212] text-white hover:bg-black dark:bg-[#F5F3EF] dark:text-[#121212] dark:hover:bg-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString()}</span>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="p-3 border border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#181818] hover:bg-[#F5F1EB] dark:hover:bg-[#252525] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? 'fill-[#B89B6C] text-[#B89B6C] dark:fill-[#D4AF37] dark:text-[#D4AF37]' : 'text-[#121212] dark:text-[#F5F3EF]'
                    }`}
                  />
                </button>
              </div>

              {/* View Full Product Story Button */}
              <button
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="w-full text-center text-xs tracking-wider uppercase text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white py-1 underline underline-offset-4 cursor-pointer"
              >
                View Full Formulation Details &amp; Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
