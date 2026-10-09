import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import { Heart } from 'lucide-react';

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
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Header */}
        <div className="space-y-3 border-b border-[#E5DFD5] dark:border-[#262626] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#B89B6C] dark:fill-[#D4AF37] text-[#B89B6C] dark:text-[#D4AF37]" />
            <span>Saved Creations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Your Wishlist ({wishlistCount})
          </h1>
          <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-xl font-light leading-relaxed">
            Formulations and olfactory signatures reserved for your future rituals.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white dark:bg-[#141414] p-12 sm:p-16 border border-[#E5DFD5] dark:border-[#262626] text-center space-y-4 max-w-md mx-auto shadow-xs">
            <Heart className="w-8 h-8 text-[#121212]/30 dark:text-[#F5F3EF]/30 mx-auto" />
            <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">Your wishlist is serene</h2>
            <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light leading-relaxed">
              Explore our lipid skincare and haute parfumerie to save formulas to your personal discovery list.
            </p>
            <button
              onClick={onExploreShop}
              className="mt-2 bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
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
