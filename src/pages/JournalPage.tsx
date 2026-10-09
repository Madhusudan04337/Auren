import React, { useState } from 'react';
import { ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { Article, Product } from '../types';
import { BookOpen, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { LuxuryImage } from '../components/ui/LuxuryImage';

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
      <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Essays</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 border-b border-[#E5DFD5] dark:border-[#262626] pb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium">
              <span>{activeArticle.category}</span>
              <span>·</span>
              <span>{activeArticle.readTime}</span>
              <span>·</span>
              <span>{activeArticle.date}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
              <span className="font-semibold text-[#121212] dark:text-[#F5F3EF]">{activeArticle.author}</span>
              <span>—</span>
              <span className="italic">{activeArticle.authorRole}</span>
            </div>
          </div>

          {/* Featured Image Stage */}
          <div className="aspect-16/9 bg-[#F5F1EB] dark:bg-[#1C1C1C] overflow-hidden border border-[#E5DFD5] dark:border-[#262626] shadow-sm">
            <LuxuryImage
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              fallbackText={activeArticle.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Editorial Excerpt */}
          <div className="bg-[#F2ECE3] dark:bg-[#161616] p-6 border-l-2 border-[#B89B6C] dark:border-[#D4AF37] italic text-sm text-[#121212]/85 dark:text-[#F5F3EF]/85 leading-relaxed font-serif">
            &ldquo;{activeArticle.excerpt}&rdquo;
          </div>

          {/* Longform Paragraphs */}
          <div className="prose max-w-none text-xs sm:text-sm text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light leading-relaxed space-y-5">
            {activeArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Related Formulations Mentioned */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#E5DFD5] dark:border-[#262626] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Formulations Explored in This Essay</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="p-4 bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#121212]/50 dark:text-[#F5F3EF]/50">{p.type}</div>
                      <h4 className="font-serif text-sm text-[#121212] dark:text-[#F5F3EF]">{p.name}</h4>
                      <div className="font-mono text-xs tabular-nums text-[#121212] dark:text-[#F5F3EF] mt-1">₹{p.price.toLocaleString()}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#121212]/60 dark:text-[#F5F3EF]/60" />
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
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Page Header */}
        <div className="space-y-3 border-b border-[#E5DFD5] dark:border-[#262626] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The AUREN Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal">
            Essays on Skin, Scent &amp; Self
          </h1>
          <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-xl font-light leading-relaxed">
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
                  ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C]'
                  : 'bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:border-[#121212] dark:hover:border-white'
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
              className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] overflow-hidden group cursor-pointer hover:border-[#121212] dark:hover:border-white transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="aspect-16/10 bg-[#F5F1EB] dark:bg-[#1C1C1C] overflow-hidden">
                <LuxuryImage
                  src={article.featuredImage}
                  alt={article.title}
                  fallbackText={article.category}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#B89B6C] dark:text-[#D4AF37] uppercase tracking-widest font-medium">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between text-xs">
                  <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">{article.author} · {article.date}</span>
                  <span className="font-semibold uppercase tracking-wider text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] flex items-center gap-1">
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
