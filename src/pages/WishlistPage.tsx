import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import { Heart, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onExploreShop: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onSelectProduct,
  onQuickView,
  onExploreShop
}) => {
  const { wishlistProducts, wishlistCount } = useWishlist();

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 border-b border-[#E5DFD5] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#543544] text-[#543544]" />
            <span>Saved Creations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#181818] font-normal">
            Your Wishlist ({wishlistCount})
          </h1>
          <p className="text-xs sm:text-sm text-[#181818]/70 max-w-xl font-light leading-relaxed">
            Formulations and olfactory signatures reserved for your future rituals.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 border border-[#E5DFD5] text-center space-y-4 max-w-md mx-auto">
            <Heart className="w-8 h-8 text-[#181818]/30 mx-auto" />
            <h2 className="font-serif text-2xl text-[#181818]">Your wishlist is serene</h2>
            <p className="text-xs text-[#181818]/60 font-light leading-relaxed">
              Explore our lipid skincare and haute parfumerie to save formulas to your personal discovery list.
            </p>
            <button
              onClick={onExploreShop}
              className="mt-2 bg-[#181818] hover:bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Discover Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
