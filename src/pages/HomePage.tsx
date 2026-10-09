import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SkinConcernFinder } from '../components/home/SkinConcernFinder';
import { FeaturedRituals } from '../components/home/FeaturedRituals';
import { IngredientStory } from '../components/home/IngredientStory';
import { CommunitySection } from '../components/home/CommunitySection';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/journal';
import { Product, Ritual, Article } from '../types';
import { ArrowRight } from 'lucide-react';
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
  onSelectRitual,
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

  const filteredBestsellers = PRODUCTS.filter(p => {
    if (selectedChip === 'lipid') return p.category === 'Skin';
    if (selectedChip === 'parfum') return p.category === 'Fragrance';
    if (selectedChip === 'grooming') return p.category === 'Grooming';
    if (selectedChip === 'complexion') return p.category === 'Makeup';
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

      {/* 2. Minimalist Discovery Bar */}
      <section className="bg-[#FAF8F5] dark:bg-[#0E0E0E] py-5 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#121212]/50 dark:text-[#F5F3EF]/50 font-medium shrink-0">
              Collection:
            </span>
            <div className="flex items-center gap-2">
              {discoveryChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedChip(chip.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                    selectedChip === chip.id
                      ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C]'
                      : 'text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Bestsellers Showcase */}
      <section className="bg-white dark:bg-[#0A0A0A] py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                Signature Formulations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
                Curated Bestsellers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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
        </div>
      </section>

      {/* 4. Skin Concern Diagnostic Finder */}
      <SkinConcernFinder
        onSelectProduct={onSelectProduct}
        onNavigateRituals={() => onNavigate('rituals')}
      />

      {/* 5. Featured Daily Ritual Protocols (Bento) */}
      <FeaturedRituals
        onSelectRitual={onSelectRitual}
        onSelectProduct={onSelectProduct}
        onExploreAllRituals={() => onNavigate('rituals')}
      />

      {/* 5b. Interactive Cellular Motion Story Showcase Banner */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#121212] text-[#F5F3EF] border border-white/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium block">
              Interactive Story
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              The Architecture of Cellular Skin
            </h3>
            <p className="text-sm sm:text-base text-[#A8A29A] font-light leading-relaxed">
              A cinematic visual study through lipid bilayers, clinical restoration, and bioactive synthesis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('story')}
            className="whitespace-nowrap px-8 py-4 rounded-full bg-[#F5F3EF] text-[#121212] hover:bg-white text-xs uppercase tracking-[0.2em] font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2.5 shrink-0"
          >
            Launch Experience
            <ArrowRight className="w-4 h-4 text-[#B89B6C]" />
          </button>
        </div>
      </section>

      {/* 6. Active Ingredient Story */}
      <IngredientStory
        onSelectProductByName={(name) => {
          const found = PRODUCTS.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
          if (found) onSelectProduct(found);
          else onNavigate('shop');
        }}
      />

      {/* 7. Community & Real Skin */}
      <CommunitySection onSelectProduct={onSelectProduct} />

      {/* 8. Editorial Journal Stories */}
      <section className="bg-[#FAF8F5] dark:bg-[#0E0E0E] py-20 lg:py-24 border-t border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.slice(0, 3).map((article) => (
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

                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 line-clamp-2 font-light leading-relaxed">
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
