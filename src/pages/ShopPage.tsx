import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import { Filter, ArrowUpDown, Sparkles, X, SlidersHorizontal } from 'lucide-react';

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
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'InStock' | 'OutOfStock'>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Skin', 'Fragrance', 'Grooming', 'Makeup', 'Body'];
  const concerns = ['All', 'Barrier', 'Dryness', 'Sensitivity', 'Dullness', 'Firmness'];
  const audiences = ['All', 'Unisex', 'Women', 'Men'];

  // Filtered & Sorted Products Calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Skin concern filter
      if (selectedConcern !== 'All') {
        const matchesConcern = product.concerns.some(c =>
          c.toLowerCase().includes(selectedConcern.toLowerCase())
        );
        if (!matchesConcern) return false;
      }
      // Audience filter
      if (selectedAudience !== 'All') {
        if (!product.audience.includes(selectedAudience as any) && !product.audience.includes('Unisex')) {
          return false;
        }
      }
      // Stock filter
      if (stockFilter === 'InStock' && !product.inStock) {
        return false;
      }
      if (stockFilter === 'OutOfStock' && product.inStock) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestsellers') return b.reviewCount - a.reviewCount;
      return 0; // featured retains atelier curated order
    });
  }, [selectedCategory, selectedConcern, selectedAudience, stockFilter, sortBy, maxPrice]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedConcern !== 'All' || selectedAudience !== 'All' || stockFilter !== 'All' || maxPrice < 6000;

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSelectedAudience('All');
    setStockFilter('All');
    setMaxPrice(6000);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Collection Header */}
        <div className="space-y-3 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            <span>The Complete Atelier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            {selectedCategory === 'All' ? 'All Formulations' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 max-w-xl font-light leading-relaxed">
            Architectural formulas crafted for living skin and personal olfactory resonance.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F2ECE3] dark:bg-[#141414] p-4 rounded-2xl sm:rounded-3xl border border-[#E5DFD5]/80 dark:border-[#262626] shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-sm'
                    : 'text-[#121212]/75 dark:text-[#F5F3EF]/75 hover:text-[#121212] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1E1E1E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5DFD5]/80 dark:border-[#262626]">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#121212]/60 dark:text-[#F5F3EF]/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs text-[#121212] dark:text-[#F5F3EF] font-medium focus:outline-none cursor-pointer pr-4"
              >
                <option value="featured" className="bg-white dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF]">Featured Atelier Order</option>
                <option value="price-asc" className="bg-white dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF]">Price: Low to High</option>
                <option value="price-desc" className="bg-white dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF]">Price: High to Low</option>
                <option value="rating" className="bg-white dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF]">Highest Rated</option>
                <option value="bestsellers" className="bg-white dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF]">Bestselling Creations</option>
              </select>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E5DFD5]/80 dark:border-[#262626] text-xs font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#B89B6C] dark:bg-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`lg:col-span-3 bg-white dark:bg-[#141414] rounded-2xl sm:rounded-3xl p-6 border border-[#E5DFD5]/80 dark:border-[#262626] space-y-6 ${
              mobileFiltersOpen ? 'block fixed inset-4 z-50 overflow-y-auto shadow-2xl lg:static lg:p-6' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262626]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#121212] dark:text-[#F5F3EF]">
                <Filter className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                <span>Diagnostic Filters</span>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#B89B6C] dark:text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
                {mobileFiltersOpen && (
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="lg:hidden p-1 text-[#121212] dark:text-[#F5F3EF] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Concern Filter */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 font-semibold block">
                Skin Concern &amp; Need
              </span>
              <div className="space-y-1">
                {concerns.map((con) => (
                  <button
                    key={con}
                    onClick={() => setSelectedConcern(con)}
                    className={`block w-full text-left text-xs py-1.5 px-2 transition-colors cursor-pointer ${
                      selectedConcern === con
                        ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] font-medium'
                        : 'text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:bg-[#FAF8F5] dark:hover:bg-[#1E1E1E]'
                    }`}
                  >
                    {con}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience / Edit Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
              <span className="text-[11px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 font-semibold block">
                Curated Expression
              </span>
              <div className="space-y-1">
                {audiences.map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setSelectedAudience(aud)}
                    className={`block w-full text-left text-xs py-1.5 px-2 transition-colors cursor-pointer ${
                      selectedAudience === aud
                        ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] font-medium'
                        : 'text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:bg-[#FAF8F5] dark:hover:bg-[#1E1E1E]'
                    }`}
                  >
                    {aud === 'All' ? 'All Expressions' : `${aud}'s Edit`}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
              <span className="text-[11px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 font-semibold block">
                Availability
              </span>
              <div className="space-y-1">
                {[
                  { id: 'All', label: 'All Items (8)' },
                  { id: 'InStock', label: 'In Stock (6)' },
                  { id: 'OutOfStock', label: 'Sold Out / Waitlist (2)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStockFilter(item.id as any)}
                    className={`block w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer ${
                      stockFilter === item.id
                        ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] font-medium'
                        : 'text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:bg-[#FAF8F5] dark:hover:bg-[#1E1E1E]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 font-semibold">
                <span>Maximum Value</span>
                <span className="font-mono tabular-nums text-[#121212] dark:text-[#F5F3EF]">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#121212] dark:accent-[#F5F3EF] cursor-pointer"
              />
            </div>

            {mobileFiltersOpen && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] py-3 text-xs uppercase tracking-widest font-semibold mt-4 lg:hidden cursor-pointer"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            )}
          </aside>

          {/* Products Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60">
              <span>Showing {filteredProducts.length} curated formulations</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#B89B6C] dark:text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear Active Filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-[#141414] p-12 border border-[#E5DFD5] dark:border-[#262626] text-center space-y-4">
                <span className="font-serif text-2xl text-[#121212]/50 dark:text-[#F5F3EF]/50">No formulas match your filters</span>
                <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 max-w-sm mx-auto font-light">
                  Try adjusting the maximum price range or resetting specific skin concerns.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
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
                      <div className="col-span-1 bg-[#121212] dark:bg-[#111111] text-[#FAF8F5] p-6 border border-white/10 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                            Atelier Wisdom
                          </span>
                          <h3 className="font-serif text-xl text-[#FAF8F5]">
                            The Barrier Golden Ratio
                          </h3>
                          <p className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed">
                            3:1:1 Ceramides, Cholesterol, and Free Fatty Acids recreate the exact natural lipid structure of human skin.
                          </p>
                        </div>
                        <div className="text-[11px] text-[#B89B6C] dark:text-[#D4AF37] uppercase tracking-wider font-medium">
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
