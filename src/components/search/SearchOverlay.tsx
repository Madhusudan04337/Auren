import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { PRODUCTS, INGREDIENT_STORIES } from '../../data/products';
import { ARTICLES } from '../../data/journal';
import { Product, Article } from '../../types';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F7F4EF] max-w-3xl w-full border border-[#E5DFD5] shadow-2xl overflow-hidden mt-12 sm:mt-20">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E5DFD5] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#181818]/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, botanicals, concerns, or journal essays..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#181818] placeholder-[#181818]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#181818]/40 hover:text-[#181818] p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#181818] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {!trimmed ? (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[#181818]/50 font-semibold block">
                Suggested Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1.5 bg-white border border-[#D8D1C7] text-xs text-[#181818] hover:border-[#181818] transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Quick Featured Recommendations */}
              <div className="pt-4 border-t border-[#E5DFD5]">
                <span className="text-[11px] uppercase tracking-widest text-[#CDAA7D] font-semibold block mb-3">
                  Current Atelier Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="p-3 bg-white border border-[#E5DFD5] flex items-center gap-3 cursor-pointer hover:border-[#181818] transition-colors"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover bg-[#F7F4EF]"
                      />
                      <div className="overflow-hidden">
                        <div className="font-serif text-sm text-[#181818] truncate font-medium">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-[#181818]/60 font-mono tabular-nums">
                          ₹{prod.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Results */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#181818]/60 uppercase tracking-wider font-semibold border-b border-[#E5DFD5] pb-2">
                  <span>Creations ({matchingProducts.length})</span>
                </div>
                {matchingProducts.length > 0 ? (
                  <div className="divide-y divide-[#E5DFD5] mt-2">
                    {matchingProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="py-3 flex items-center justify-between hover:bg-white/60 px-2 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover bg-[#F7F4EF] border border-[#E5DFD5]"
                          />
                          <div>
                            <div className="font-serif text-sm font-medium text-[#181818]">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-[#181818]/60">
                              {prod.category} · {prod.subtitle}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-semibold tabular-nums text-[#181818]">
                            ₹{prod.price.toLocaleString()}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#181818]/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[#181818]/50 py-3">
                    No creations found matching &quot;{query}&quot;.
                  </div>
                )}
              </div>

              {/* Botanical Active Results */}
              {matchingIngredients.length > 0 && (
                <div>
                  <div className="text-xs text-[#543544] uppercase tracking-wider font-semibold border-b border-[#E5DFD5] pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
                    <span>Active Botanical Science ({matchingIngredients.length})</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    {matchingIngredients.map((ing) => (
                      <div key={ing.id} className="p-3 bg-white border border-[#E5DFD5] text-xs">
                        <span className="font-semibold text-[#181818] block tracking-wide">
                          {ing.name}
                        </span>
                        <p className="text-[#181818]/70 mt-1 leading-relaxed">
                          {ing.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal Essays */}
              {matchingArticles.length > 0 && (
                <div>
                  <div className="text-xs text-[#181818]/60 uppercase tracking-wider font-semibold border-b border-[#E5DFD5] pb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Journal Stories ({matchingArticles.length})</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    {matchingArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          onClose();
                          onSelectArticle(article);
                        }}
                        className="p-3 bg-white border border-[#E5DFD5] hover:border-[#181818] cursor-pointer transition-colors"
                      >
                        <span className="text-[10px] text-[#CDAA7D] uppercase tracking-widest block font-medium">
                          {article.category} · {article.readTime}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#181818] mt-0.5">
                          {article.title}
                        </h4>
                        <p className="text-xs text-[#181818]/70 line-clamp-1 mt-1 font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
