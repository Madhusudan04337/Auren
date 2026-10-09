import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { PRODUCTS, INGREDIENT_STORIES } from '../../data/products';
import { ARTICLES } from '../../data/journal';
import { Product, Article } from '../../types';
import { LuxuryImage } from '../ui/LuxuryImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.subtitle.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.benefit.toLowerCase().includes(trimmed) ||
          p.concerns.some(c => c.toLowerCase().includes(trimmed)) ||
          p.keyIngredients.some(k => k.name.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingIngredients = trimmed
    ? INGREDIENT_STORIES.filter(
        i =>
          i.name.toLowerCase().includes(trimmed) ||
          i.role.toLowerCase().includes(trimmed) ||
          i.description.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingArticles = trimmed
    ? ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(trimmed) ||
          a.excerpt.toLowerCase().includes(trimmed) ||
          a.category.toLowerCase().includes(trimmed)
      )
    : [];

  const suggestions = ['Ceramide', 'Noir 03', 'Hydration', 'Grooming', 'Skin Tint', 'Solaris', 'Sensitive'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#F5F3EF] max-w-3xl w-full border border-[#E5DFD5] dark:border-[#262626] shadow-2xl overflow-hidden mt-12 sm:mt-20">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E5DFD5] dark:border-[#262626] flex items-center gap-3 bg-white dark:bg-[#161616]">
          <Search className="w-5 h-5 text-[#121212]/50 dark:text-[#F5F3EF]/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, botanicals, concerns, or journal essays..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#121212] dark:text-[#F5F3EF] placeholder-[#121212]/40 dark:placeholder-[#F5F3EF]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#121212]/50 dark:text-[#F5F3EF]/50 hover:text-[#121212] dark:hover:text-white p-1 text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#121212] dark:text-[#F5F3EF] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {!trimmed ? (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[#121212]/50 dark:text-[#F5F3EF]/50 font-semibold block">
                Suggested Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1.5 bg-white dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] text-xs text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Quick Featured Recommendations */}
              <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262626]">
                <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block mb-3">
                  Atelier Pillars
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="p-2.5 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-colors flex items-center gap-3 cursor-pointer"
                    >
                      <LuxuryImage
                        src={p.images[0]}
                        alt={p.name}
                        fallbackText={p.type}
                        className="w-12 h-12 object-cover bg-[#F5F1EB] dark:bg-[#1C1C1C]"
                      />
                      <div className="overflow-hidden">
                        <div className="font-serif text-xs font-medium text-[#121212] dark:text-[#F5F3EF] truncate">{p.name}</div>
                        <div className="text-[10px] text-[#121212]/60 dark:text-[#F5F3EF]/60 truncate">{p.subtitle}</div>
                        <div className="font-mono text-[11px] text-[#121212] dark:text-[#F5F3EF] mt-0.5">₹{p.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Matches */}
              {matchingProducts.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                    Formulations ({matchingProducts.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="p-3 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <LuxuryImage
                            src={p.images[0]}
                            alt={p.name}
                            fallbackText={p.type}
                            className="w-12 h-12 object-cover bg-[#F5F1EB] dark:bg-[#1C1C1C]"
                          />
                          <div>
                            <div className="font-serif text-xs font-medium text-[#121212] dark:text-[#F5F3EF]">{p.name}</div>
                            <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">{p.type}</div>
                            <div className="font-mono text-xs text-[#121212] dark:text-[#F5F3EF] mt-0.5">₹{p.price.toLocaleString()}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#121212]/40 dark:text-[#F5F3EF]/40" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredient Matches */}
              {matchingIngredients.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
                  <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                    Active Biomarkers ({matchingIngredients.length})
                  </span>
                  <div className="space-y-2">
                    {matchingIngredients.map((i) => (
                      <div
                        key={i.id}
                        className="p-3 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-xs space-y-1"
                      >
                        <div className="flex justify-between font-medium">
                          <span className="font-serif text-[#121212] dark:text-[#F5F3EF]">{i.name}</span>
                          <span className="text-[10px] uppercase text-[#B89B6C] dark:text-[#D4AF37]">{i.role}</span>
                        </div>
                        <p className="text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light">{i.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Matches */}
              {matchingArticles.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
                  <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                    Journal Essays ({matchingArticles.length})
                  </span>
                  <div className="space-y-2">
                    {matchingArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a);
                          onClose();
                        }}
                        className="p-3 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{a.category}</span>
                          </div>
                          <div className="font-serif text-xs font-medium text-[#121212] dark:text-[#F5F3EF]">{a.title}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#121212]/40 dark:text-[#F5F3EF]/40" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length === 0 && matchingIngredients.length === 0 && matchingArticles.length === 0 && (
                <div className="text-center py-8 space-y-2 text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60">
                  <p>No formulations or journal entries matched &ldquo;{query}&rdquo;.</p>
                  <p className="text-[11px]">Try exploring by concern (e.g., &ldquo;Barrier&rdquo;) or category (&ldquo;Fragrance&rdquo;).</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
