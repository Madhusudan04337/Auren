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
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
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
  const [selectedChip, setSelectedChip] = useState('All');

  const discoveryChips = [
    { label: 'All Creations', id: 'All' },
    { label: 'Lipid Skincare', id: 'Skin' },
    { label: 'Haute Parfumerie', id: 'Fragrance' },
    { label: 'Clean Lines Grooming', id: 'Grooming' },
    { label: 'Complexion Fluid', id: 'Makeup' },
    { label: 'Satin Body Care', id: 'Body' }
  ];

  const filteredBestsellers =
    selectedChip === 'All'
      ? PRODUCTS.slice(0, 4)
      : PRODUCTS.filter(p => p.category === selectedChip).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Campaign */}
      <HeroSection
        onExploreShop={() => onNavigate('shop')}
        onExploreRituals={() => onNavigate('rituals')}
        onSelectProduct={(slug) => {
          const found = PRODUCTS.find(p => p.slug === slug);
          if (found) onSelectProduct(found);
        }}
      />

      {/* 2. Quick Discovery Chips */}
      <section className="bg-[#E8E2D0]/30 py-6 border-b border-[#D8D7CC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs uppercase tracking-widest text-[#2D3A1F]/60 font-semibold shrink-0 mr-2">
              Discover:
            </span>
            {discoveryChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedChip(chip.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedChip === chip.id
                    ? 'bg-[#2D3A1F] text-[#F4F1E8]'
                    : 'bg-[#F4F1E8] border border-[#D8D7CC] text-[#2D3A1F] hover:bg-[#E8E2D0]'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Curated Bestsellers Showcase */}
      <section className="bg-[#F4F1E8] py-16 sm:py-24 border-b border-[#D8D7CC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D7CC] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2D3A1F] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8A678]" />
                Atelier Signatures
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D3A1F] font-normal">
                Curated Bestsellers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#2D3A1F] hover:text-[#B8A678] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Complete Atelier</span>
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

      {/* 5. Featured Rituals Bento Grid */}
      <FeaturedRituals
        onSelectRitual={onSelectRitual}
        onSelectProduct={onSelectProduct}
        onExploreAllRituals={() => onNavigate('rituals')}
      />

      {/* 6. Ingredient Story & Transparency */}
      <IngredientStory
        onSelectProductByName={(productName) => {
          const found = PRODUCTS.find(p => p.name === productName);
          if (found) onSelectProduct(found);
          else onNavigate('shop');
        }}
      />

      {/* 7. Community & Real Skin */}
      <CommunitySection onSelectProduct={onSelectProduct} />

      {/* 8. Editorial Journal Stories */}
      <section className="bg-[#E8E2D0]/30 py-16 sm:py-24 border-t border-[#D8D7CC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D7CC] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2D3A1F] font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B8A678]" />
                The Gazette
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D3A1F] font-normal">
                Essays on Skin &amp; Scent
              </h2>
            </div>
            <button
              onClick={() => onNavigate('journal')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#2D3A1F] hover:text-[#B8A678] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read The Journal</span>
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
                <div className="aspect-16/10 overflow-hidden bg-[#F4F1E8] border border-[#D8D7CC]">
                  <LuxuryImage
                    src={article.featuredImage}
                    alt={article.title}
                    fallbackText={article.category}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-widest text-[#B8A678] font-semibold">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="font-serif text-xl text-[#2D3A1F] group-hover:text-[#B8A678] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#2D3A1F]/75 line-clamp-2 font-light leading-relaxed">
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
