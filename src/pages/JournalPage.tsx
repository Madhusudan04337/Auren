import React, { useState } from 'react';
import { ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { Article, Product } from '../types';
import { BookOpen, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface JournalPageProps {
  initialArticle?: Article | null;
  onSelectProduct: (product: Product) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  initialArticle,
  onSelectProduct
}) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(initialArticle || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Skin Science', 'Haute Parfumerie', 'Couture Complexion', 'Grooming Philosophy'];

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter(a => a.category === selectedCategory);

  // If viewing a single article in depth
  if (activeArticle) {
    const relatedProducts = PRODUCTS.filter(p =>
      activeArticle.relatedProductIds.includes(p.id)
    );

    return (
      <div className="bg-[#F7F4EF] min-h-screen py-10 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#181818]/60 hover:text-[#181818] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Essays</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 border-b border-[#E5DFD5] pb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CDAA7D] font-medium">
              <span>{activeArticle.category}</span>
              <span>·</span>
              <span>{activeArticle.readTime}</span>
              <span>·</span>
              <span>{activeArticle.date}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#181818] font-normal leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#181818]/70">
              <span className="font-semibold text-[#181818]">{activeArticle.author}</span>
              <span>—</span>
              <span className="italic">{activeArticle.authorRole}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-16/9 bg-[#E8DFD3] border border-[#E5DFD5] overflow-hidden shadow-xs">
            <img
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="bg-white p-6 sm:p-12 border border-[#E5DFD5] space-y-6 text-sm sm:text-base text-[#181818]/85 font-light leading-relaxed">
            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx} className="first-of-type:text-base sm:first-of-type:text-lg first-of-type:text-[#181818] first-of-type:font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Products featured in this story */}
          {relatedProducts.length > 0 && (
            <div className="bg-[#FAF8F5] p-6 sm:p-8 border border-[#E5DFD5] space-y-6">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#543544] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
                <span>Formulations in this Story</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="bg-white p-4 border border-[#E5DFD5] flex items-center justify-between cursor-pointer hover:border-[#181818] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover bg-[#F7F4EF]"
                      />
                      <div>
                        <div className="font-serif text-sm font-medium text-[#181818]">{prod.name}</div>
                        <div className="text-[11px] text-[#181818]/60">{prod.subtitle}</div>
                        <div className="font-mono text-xs font-semibold tabular-nums text-[#181818] mt-1">
                          ₹{prod.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#181818]/50" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // Article Listing View
  return (
    <div className="bg-[#F7F4EF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="space-y-3 border-b border-[#E5DFD5] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#CDAA7D]" />
            <span>The AUREN Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#181818] font-normal">
            Essays on Skin, Scent &amp; Self
          </h1>
          <p className="text-xs sm:text-sm text-[#181818]/70 max-w-xl font-light leading-relaxed">
            Clinical dermatological inquiries, olfactory composition stories, and honest guides to slow living rituals.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#181818] text-white'
                  : 'bg-white border border-[#D8D1C7] text-[#181818] hover:border-[#181818]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white border border-[#E5DFD5] overflow-hidden group cursor-pointer hover:border-[#181818] transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="aspect-16/10 bg-[#E8DFD3] overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#CDAA7D] uppercase tracking-widest font-medium">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#181818] group-hover:text-[#543544] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs text-[#181818]/75 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                  <span className="text-[#181818]/60">{article.author} · {article.date}</span>
                  <span className="font-semibold uppercase tracking-wider text-[#181818] group-hover:text-[#543544] flex items-center gap-1">
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
