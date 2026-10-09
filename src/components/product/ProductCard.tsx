import React, { useState } from 'react';
import { Product, Shade } from '../../types';
import { Star, Heart, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { LuxuryImage } from '../ui/LuxuryImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [isWaitlistFeedback, setIsWaitlistFeedback] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) {
      handleWaitlist(e);
      return;
    }
    // If it has multiple sizes or multiple shades, open quick view for bespoke selection
    if (product.shades && product.shades.length > 1) {
      onQuickView(product);
      return;
    }
    const defaultSize = product.sizes[0]?.size || 'Standard';
    addToCart(product, defaultSize, selectedShade, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1500);
  };

  const handleWaitlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWaitlistFeedback(true);
    setTimeout(() => setIsWaitlistFeedback(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-[#141414] rounded-2xl sm:rounded-3xl border border-[#E5DFD5]/80 dark:border-[#262626] overflow-hidden transition-all duration-400 hover:shadow-xl hover:shadow-[#B89B6C]/10 hover:-translate-y-1"
    >
      {/* Product Image Stage with Organic Curved Radius */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F5F1EB] dark:bg-[#1C1C1C] rounded-t-2xl sm:rounded-t-3xl">
        <LuxuryImage
          src={primaryImage}
          alt={product.name}
          fallbackText={product.type}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            !product.inStock ? 'opacity-85 grayscale-[0.25] group-hover:grayscale-0' : ''
          }`}
        />

        {/* Out of Stock / Sold Out Badge or Status Badge */}
        {!product.inStock ? (
          <div className="absolute top-3 left-3 bg-[#121212]/95 dark:bg-black/95 text-white border border-white/20 text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold rounded-full backdrop-blur-md shadow-md z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6C] dark:bg-[#D4AF37]" />
            <span>{product.badge === 'Waitlist' ? 'Waitlist' : 'Sold Out'}</span>
          </div>
        ) : product.badge ? (
          <div className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-xs text-white dark:bg-[#F5F3EF]/90 dark:text-[#121212] text-[10px] tracking-widest uppercase px-3 py-1 font-medium rounded-full shadow-2xs">
            {product.badge}
          </div>
        ) : null}

        {/* Center overlay for Out of Stock items */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] pointer-events-none flex items-center justify-center">
            <span className="bg-[#121212]/85 text-white/90 border border-white/15 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full font-medium shadow-md">
              Restocking Soon
            </span>
          </div>
        )}

        {/* Wishlist Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 p-2 bg-white/85 dark:bg-[#1E1E1E]/85 backdrop-blur-xs rounded-full text-[#121212] dark:text-[#F5F3EF] hover:bg-white dark:hover:bg-[#252525] transition-all shadow-xs z-10"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorited ? 'fill-[#B89B6C] text-[#B89B6C] dark:fill-[#D4AF37] dark:text-[#D4AF37]' : 'text-[#121212] dark:text-[#F5F3EF]'
            }`}
          />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2 z-10">
          {!product.inStock ? (
            <button
              onClick={handleWaitlist}
              className="w-full bg-[#121212] hover:bg-black text-[#F5F3EF] text-xs py-2 px-4 rounded-full tracking-wider uppercase font-medium transition-colors text-center cursor-pointer border border-white/20 shadow-sm"
            >
              {isWaitlistFeedback ? 'Waitlist Joined ✓' : 'Notify When Available'}
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="flex-1 bg-white hover:bg-[#F5F1EB] dark:bg-[#222222] dark:hover:bg-[#2A2A2A] text-[#121212] dark:text-[#F5F3EF] text-xs py-2 px-4 rounded-full tracking-wider uppercase font-medium transition-colors text-center cursor-pointer shadow-sm"
              >
                Quick View
              </button>
              <button
                onClick={handleQuickAdd}
                aria-label="Quick add to bag"
                className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] w-8 h-8 rounded-full transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed Metadata: category and type */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-[#121212]/60 dark:text-[#F5F3EF]/60">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.type}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Benefit Kicker */}
          <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 line-clamp-2 leading-relaxed">
            {product.benefit}
          </p>
        </div>

        {/* Shades or Sizes Preview */}
        {product.shades && product.shades.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.shades.map((shade) => (
                <button
                  key={shade.id}
                  onClick={() => setSelectedShade(shade)}
                  aria-label={`Select shade ${shade.name}`}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedShade?.id === shade.id
                      ? 'border-[#121212] dark:border-white scale-120'
                      : 'border-black/20 dark:border-white/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  title={`${shade.name} (${shade.undertone})`}
                />
              ))}
              <span className="text-[10px] text-[#121212]/60 dark:text-[#F5F3EF]/60 ml-1">
                {product.shades.length} shades
              </span>
            </div>
          </div>
        )}

        {/* Price & Rating Bar */}
        <div className="pt-2 border-t border-[#E5DFD5]/80 dark:border-[#262626] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#121212]/40 dark:text-[#F5F3EF]/40 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 gap-1">
            <Star className="w-3.5 h-3.5 fill-[#B89B6C] text-[#B89B6C] dark:fill-[#D4AF37] dark:text-[#D4AF37]" />
            <span className="font-mono tabular-nums text-[11px] font-medium text-[#121212] dark:text-[#F5F3EF]">{product.rating}</span>
            <span className="text-[10px] text-[#121212]/40 dark:text-[#F5F3EF]/40">({product.reviewCount})</span>
          </div>
        </div>

        {/* Quick Add or Waitlist Button on Mobile */}
        <div className="sm:hidden pt-2">
          {!product.inStock ? (
            <button
              onClick={handleWaitlist}
              className={`w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                isWaitlistFeedback
                  ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-[#121212]'
                  : 'bg-black/5 dark:bg-white/10 text-[#121212] dark:text-[#F5F3EF] border border-black/10 dark:border-white/15'
              }`}
            >
              {isWaitlistFeedback ? 'Waitlist Joined ✓' : 'Sold Out · Join Waitlist'}
            </button>
          ) : (
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-colors ${
                isAddedFeedback
                  ? 'bg-[#B89B6C] dark:bg-[#D4AF37] text-[#121212]'
                  : 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] hover:bg-black dark:hover:bg-white'
              }`}
            >
              {isAddedFeedback ? 'Added to Bag' : 'Quick Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
