import React, { useState } from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product, Shade } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

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
      className="group cursor-pointer flex flex-col bg-white border border-[#E5DFD5] transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F2EDE4]/60">
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Minimal text badge (Max 1, no badge sandwich) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#181818]/90 text-[#F7F4EF] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
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
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full text-[#181818] hover:bg-white transition-all shadow-xs"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorited ? 'fill-[#543544] text-[#543544]' : 'text-[#181818]'
            }`}
          />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#181818] text-xs py-2 px-3 tracking-wider uppercase font-medium transition-colors text-center"
          >
            Quick View
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Quick add to bag"
            className="bg-[#181818] hover:bg-black text-white p-2 transition-colors flex items-center justify-center shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed Metadata: category and type */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-[#181818]/60">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.type}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#181818] group-hover:text-[#543544] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Benefit Kicker */}
          <p className="text-xs text-[#181818]/70 line-clamp-2 leading-relaxed">
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
                      ? 'border-[#181818] scale-120'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  title={`${shade.name} (${shade.undertone})`}
                />
              ))}
              <span className="text-[10px] text-[#181818]/60 ml-1">
                {product.shades.length} shades
              </span>
            </div>
          </div>
        )}

        {/* Price & Rating Bar */}
        <div className="pt-2 border-t border-[#E5DFD5]/70 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold tabular-nums text-[#181818]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#181818]/40 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-[#181818]/70 gap-1">
            <Star className="w-3.5 h-3.5 fill-[#CDAA7D] text-[#CDAA7D]" />
            <span className="font-mono tabular-nums text-[11px] font-medium">{product.rating}</span>
            <span className="text-[10px] text-[#181818]/40">({product.reviewCount})</span>
          </div>
        </div>

        {/* Quick Add Button on Mobile */}
        <div className="sm:hidden pt-2">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              isAddedFeedback
                ? 'bg-[#9DA895] text-white'
                : 'bg-[#181818] text-white hover:bg-black'
            }`}
          >
            {isAddedFeedback ? 'Added to Bag' : 'Quick Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
