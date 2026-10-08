import React, { useState } from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product, Shade } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
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
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col bg-white border border-[#D8D7CC] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#E8E2D0]/50">
        <LuxuryImage
          src={primaryImage}
          alt={product.name}
          fallbackText={product.type}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Minimal text badge (Max 1, no badge sandwich) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#2D3A1F] text-[#F4F1E8] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
            {product.badge}
          </div>
        )}

        {/* Wishlist Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full text-[#2D3A1F] hover:bg-white transition-all shadow-xs"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorited ? 'fill-[#B8A678] text-[#B8A678]' : 'text-[#2D3A1F]'
            }`}
          />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-[#F4F1E8] hover:bg-white text-[#2D3A1F] text-xs py-2 px-3 tracking-wider uppercase font-medium transition-colors text-center"
          >
            Quick View
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Quick add to bag"
            className="bg-[#2D3A1F] hover:bg-[#1E2714] text-[#F4F1E8] p-2 transition-colors flex items-center justify-center shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed Metadata: category and type */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-[#2D3A1F]/60">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.type}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#2D3A1F] group-hover:text-[#B8A678] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Benefit Kicker */}
          <p className="text-xs text-[#2D3A1F]/75 line-clamp-2 leading-relaxed">
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
                      ? 'border-[#2D3A1F] scale-120'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  title={`${shade.name} (${shade.undertone})`}
                />
              ))}
              <span className="text-[10px] text-[#2D3A1F]/60 ml-1">
                {product.shades.length} shades
              </span>
            </div>
          </div>
        )}

        {/* Price & Rating Bar */}
        <div className="pt-2 border-t border-[#D8D7CC] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold tabular-nums text-[#2D3A1F]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#2D3A1F]/40 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-[#2D3A1F]/70 gap-1">
            <Star className="w-3.5 h-3.5 fill-[#B8A678] text-[#B8A678]" />
            <span className="font-mono tabular-nums text-[11px] font-medium text-[#2D3A1F]">{product.rating}</span>
            <span className="text-[10px] text-[#2D3A1F]/40">({product.reviewCount})</span>
          </div>
        </div>

        {/* Quick Add Button on Mobile */}
        <div className="sm:hidden pt-2">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              isAddedFeedback
                ? 'bg-[#B8A678] text-[#2D3A1F]'
                : 'bg-[#2D3A1F] text-[#F4F1E8] hover:bg-[#1E2714]'
            }`}
          >
            {isAddedFeedback ? 'Added to Bag' : 'Quick Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
