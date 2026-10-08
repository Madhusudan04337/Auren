import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'All',
  onSelectProduct,
  onQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Skin', 'Fragrance', 'Grooming', 'Makeup', 'Body'];
  const audiences = ['All', 'Unisex', 'Men', 'Women'];
  const concerns = ['All', 'Barrier', 'Dryness', 'Sensitivity', 'Dullness', 'Aging', 'Razor Burn'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchAudience =
        selectedAudience === 'All' ||
        product.audience.includes(selectedAudience as any);

      const matchConcern =
        selectedConcern === 'All' ||
        product.concerns.some(c => c.toLowerCase().includes(selectedConcern.toLowerCase()));

      const matchPrice = product.price <= maxPrice;

      return matchCategory && matchAudience && matchConcern && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestsellers') {
        const aScore = a.badge === 'Bestseller' ? 1 : 0;
        const bScore = b.badge === 'Bestseller' ? 1 : 0;
        return bScore - aScore;
      }
      return 0; // featured default
    });
  }, [selectedCategory, selectedAudience, selectedConcern, maxPrice, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedAudience !== 'All' ||
    selectedConcern !== 'All' ||
    maxPrice < 6000;

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedAudience('All');
    setSelectedConcern('All');
    setMaxPrice(6000);
  };

  return (
    <div className="bg-[#F4F1E8] min-h-screen py-10 sm:py-16 text-[#2D3A1F]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Collection Header */}
        <div className="space-y-3 border-b border-[#D8D7CC] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#2D3A1F] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B8A678]" />
            <span>The Complete Atelier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2D3A1F] font-normal">
            {selectedCategory === 'All' ? 'All Formulations' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#2D3A1F]/75 max-w-xl font-light leading-relaxed">
            Architectural formulas crafted for living skin and personal olfactory resonance.
            Filtered by skin state, lipid needs, and scent profiles.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#E8E2D0]/60 p-4 border border-[#D8D7CC] shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D3A1F] text-[#F4F1E8]'
                    : 'text-[#2D3A1F]/75 hover:text-[#2D3A1F] hover:bg-[#F4F1E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#D8D7CC]">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2D3A1F]/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs text-[#2D3A1F] font-medium focus:outline-none cursor-pointer pr-4"
              >
                <option value="featured">Featured Atelier Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="bestsellers">Bestselling Creations</option>
              </select>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F4EF] border border-[#D8D1C7] text-xs font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#543544]" />}
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`lg:col-span-3 bg-white p-6 border border-[#E5DFD5] space-y-6 ${
              mobileFiltersOpen ? 'block fixed inset-4 z-50 overflow-y-auto shadow-2xl lg:static lg:p-6' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#181818]">
                <Filter className="w-3.5 h-3.5 text-[#543544]" />
                <span>Diagnostic Filters</span>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#543544] hover:underline"
                  >
                    Reset All
                  </button>
                )}
                {mobileFiltersOpen && (
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="lg:hidden p-1 text-[#181818]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Concern Filter */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#181818]/60 font-semibold block">
                Skin Concern &amp; Need
              </span>
              <div className="space-y-1">
                {concerns.map((con) => (
                  <button
                    key={con}
                    onClick={() => setSelectedConcern(con)}
                    className={`block w-full text-left text-xs py-1.5 px-2 transition-colors ${
                      selectedConcern === con
                        ? 'bg-[#181818] text-white font-medium'
                        : 'text-[#181818]/70 hover:bg-[#F7F4EF]'
                    }`}
                  >
                    {con}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience / Edit Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E5DFD5]">
              <span className="text-[11px] uppercase tracking-wider text-[#181818]/60 font-semibold block">
                Curated Expression
              </span>
              <div className="space-y-1">
                {audiences.map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setSelectedAudience(aud)}
                    className={`block w-full text-left text-xs py-1.5 px-2 transition-colors ${
                      selectedAudience === aud
                        ? 'bg-[#181818] text-white font-medium'
                        : 'text-[#181818]/70 hover:bg-[#F7F4EF]'
                    }`}
                  >
                    {aud === 'All' ? 'All Expressions' : `${aud}'s Edit`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E5DFD5]">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-[#181818]/60 font-semibold">
                <span>Maximum Value</span>
                <span className="font-mono tabular-nums text-[#181818]">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#181818] cursor-pointer"
              />
            </div>

            {mobileFiltersOpen && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#181818] text-white py-3 text-xs uppercase tracking-widest font-semibold mt-4 lg:hidden"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            )}
          </aside>

          {/* Products Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#181818]/60">
              <span>Showing {filteredProducts.length} curated formulations</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#543544] hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear Active Filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 border border-[#E5DFD5] text-center space-y-4">
                <span className="font-serif text-2xl text-[#181818]/50">No formulas match your filters</span>
                <p className="text-xs text-[#181818]/60 max-w-sm mx-auto font-light">
                  Try adjusting the maximum price range or resetting specific skin concerns.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#181818] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <ProductCard
                      product={product}
                      onSelect={onSelectProduct}
                      onQuickView={onQuickView}
                    />

                    {/* Editorial Insert Card at position 3 */}
                    {index === 2 && (
                      <div className="col-span-1 bg-[#171515] text-[#F6F0E8] p-6 border border-white/5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#CDAA7D] font-semibold block">
                            Atelier Wisdom
                          </span>
                          <h3 className="font-serif text-xl text-[#F6F0E8]">
                            The Barrier Golden Ratio
                          </h3>
                          <p className="text-xs text-[#F6F0E8]/70 font-light leading-relaxed">
                            3:1:1 Ceramides, Cholesterol, and Free Fatty Acids recreate the exact natural lipid structure of human skin.
                          </p>
                        </div>
                        <div className="text-[11px] text-[#CDAA7D] uppercase tracking-wider font-medium">
                          Clinical standard in every AUREN jar
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
