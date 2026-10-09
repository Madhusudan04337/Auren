import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IngredientStory } from '../components/home/IngredientStory';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/journal';
import { Product, Ritual, Article } from '../types';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
  onSelectRitual: (ritual: Ritual) => void;
  onSelectArticle: (article: Article) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onSelectRitual: _onSelectRitual,
  onSelectArticle,
  onQuickView
}) => {
  const [selectedChip, setSelectedChip] = useState('bestsellers');

  const discoveryChips = [
    { id: 'bestsellers', label: 'All Signatures' },
    { id: 'lipid', label: 'Barrier Care' },
    { id: 'parfum', label: 'Haute Parfumerie' },
    { id: 'grooming', label: 'Clean Grooming' },
    { id: 'complexion', label: 'Complexion' }
  ];

  // Pick 4 curated products ensuring all 4 have unique images
  const filteredBestsellers = PRODUCTS.filter(p => {
    if (selectedChip === 'lipid') return p.category === 'Skin';
    if (selectedChip === 'parfum') return p.category === 'Fragrance';
    if (selectedChip === 'grooming') return p.category === 'Grooming';
    if (selectedChip === 'complexion') return p.category === 'Makeup' || p.category === 'Body';
    return true;
  }).slice(0, 4);

  return (
    <div className="space-y-0 transition-colors duration-200 overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection
        onExploreShop={() => onNavigate('shop')}
        onExploreRituals={() => onNavigate('rituals')}
        onSelectProduct={(slug) => {
          const found = PRODUCTS.find(p => p.slug === slug);
          if (found) onSelectProduct(found);
        }}
      />

      {/* 2. Curated Signatures Showcase (Streamlined with Integrated Filter) */}
      <section className="bg-white dark:bg-[#0A0A0A] py-16 sm:py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Signatures</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight">
                Curated Formulations
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {discoveryChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedChip(chip.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                    selectedChip === chip.id
                      ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-sm'
                      : 'text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Unique Flagship Products Only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all cursor-pointer"
            >
              <span>Explore Complete Catalog (8 Formulations)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Architecture of Cellular Skin (Interactive Cinematic Experience Banner) */}
      <section className="bg-[var(--bg-primary)] py-16 sm:py-20 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#121212] text-[#F5F3EF] border border-white/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium block">
                Visual Study &amp; Science
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                The Architecture of Cellular Skin
              </h3>
              <p className="text-sm sm:text-base text-[#A8A29A] font-light leading-relaxed">
                A cinematic visual study exploring biomimetic lipid bilayers, clinical barrier repair, and slow chronological perfume diffusion.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#E5DFD5]/70 font-light">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Golden 3:1:1 Lipid Ratio
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Zero Endocrine Disruptors
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Refillable French Smoked Glass
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('story')}
                className="whitespace-nowrap px-8 py-4 rounded-full bg-[#F5F3EF] text-[#121212] hover:bg-white text-xs uppercase tracking-[0.2em] font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5"
              >
                Launch Experience
                <ArrowRight className="w-4 h-4 text-[#B89B6C]" />
              </button>
              <button
                onClick={() => onNavigate('rituals')}
                className="whitespace-nowrap px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer flex items-center justify-center"
              >
                Daily Protocols
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Ingredient Story (Educational Formulation Transparency, Zero Image Duplication) */}
      <IngredientStory
        onSelectProductByName={(name) => {
          const found = PRODUCTS.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
          if (found) onSelectProduct(found);
          else onNavigate('shop');
        }}
      />

      {/* 5. Editorial Journal Stories (Concise 2 Articles with Distinct Editorial Imagery) */}
      <section className="bg-[#FAF8F5] dark:bg-[#0E0E0E] py-16 sm:py-20 lg:py-24 border-t border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                The Gazette
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
                Essays on Scent &amp; Skin
              </h2>
            </div>
            <button
              onClick={() => onNavigate('journal')}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read Journal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {ARTICLES.slice(0, 2).map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer space-y-4"
              >
                <div className="aspect-16/10 overflow-hidden rounded-2xl bg-[#E8DFD3] dark:bg-[#1C1C1C] border border-black/5 dark:border-white/10 shadow-sm">
                  <LuxuryImage
                    src={article.featuredImage}
                    alt={article.title}
                    fallbackText={article.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 line-clamp-2 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
