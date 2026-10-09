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
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { LuxuryImage } from '../components/ui/LuxuryImage';
import { WaveDivider } from '../components/ui/WaveDivider';
import { OrganicWaveBackground } from '../components/ui/OrganicWaveBackground';

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
    { id: 'bestsellers', label: 'Bestsellers' },
    { id: 'lipid', label: 'Lipid Barrier Care' },
    { id: 'parfum', label: 'Haute Parfumerie' },
    { id: 'grooming', label: 'Clean Lines Grooming' },
    { id: 'complexion', label: 'Complexion Fluid' }
  ];

  const filteredBestsellers = PRODUCTS.filter(p => {
    if (selectedChip === 'lipid') return p.category === 'Skin';
    if (selectedChip === 'parfum') return p.category === 'Fragrance';
    if (selectedChip === 'grooming') return p.category === 'Grooming';
    if (selectedChip === 'complexion') return p.category === 'Makeup';
    return true; // bestsellers shows all curated top 4
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

      {/* Organic Wave Transition into Discovery */}
      <WaveDivider
        position="bottom"
        variant="wave"
        fillClass="text-[#F2ECE3] dark:text-[#111111]"
        strokeClass="text-[#E5DFD5]/60 dark:text-[#262626]/60"
        heightClass="h-8 sm:h-12 lg:h-16"
      />

      {/* 2. Quick Discovery Chips */}
      <section className="bg-[#F2ECE3] dark:bg-[#111111] py-8 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs uppercase tracking-widest text-[#121212]/60 dark:text-[#F5F3EF]/60 font-semibold shrink-0 mr-2">
              Discover:
            </span>
            {discoveryChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedChip(chip.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  selectedChip === chip.id
                    ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] shadow-md scale-102'
                    : 'bg-white dark:bg-[#161616] border border-[#E5DFD5]/80 dark:border-[#262626] text-[#121212] dark:text-[#F5F3EF] hover:bg-[#F5F1EB] dark:hover:bg-[#202020] hover:scale-101'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Wave Transition into Curated Bestsellers */}
      <WaveDivider
        position="bottom"
        variant="asymmetric"
        fillClass="text-[#FAF8F5] dark:text-[#0C0C0C]"
        strokeClass="text-[#E5DFD5]/60 dark:text-[#262626]/60"
        heightClass="h-8 sm:h-12 lg:h-14"
      />

      {/* 3. Curated Bestsellers Showcase */}
      <section className="relative overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] py-16 sm:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        {/* Subtle Ambient Parallax Wave Glow */}
        <OrganicWaveBackground variant="subtle" speed={0.15} showOrbs={true} />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD5] dark:border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Atelier Signatures
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
                Curated Bestsellers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
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

      {/* Wave Transition into Rituals */}
      <WaveDivider
        position="bottom"
        variant="gentle"
        fillClass="text-[#FAF8F5] dark:text-[#0C0C0C]"
        strokeClass="text-[#E5DFD5]/60 dark:text-[#262626]/60"
        heightClass="h-8 sm:h-12 lg:h-14"
      />

      {/* 5. Featured Daily Ritual Protocols (Bento) */}
      <FeaturedRituals
        onSelectRitual={onSelectRitual}
        onSelectProduct={onSelectProduct}
        onExploreAllRituals={() => onNavigate('rituals')}
      />

      {/* 5b. Interactive Cellular Motion Story Showcase Banner with Organic Glow */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14">
        <div className="relative rounded-3xl sm:rounded-[40px] overflow-hidden p-8 sm:p-12 lg:p-16 bg-[#121212] text-[#F5F3EF] border border-[#262626] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle curved background lipid wave */}
          <div aria-hidden="true" className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#B89B6C]/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-left relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-[0.22em] text-[#D4AF37] border border-white/10 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              6-Section Interactive Editorial Experience
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              The Architecture of Deep Cellular Moisture
            </h3>
            <p className="text-sm sm:text-base text-[#A8A29A] font-light leading-relaxed">
              Explore the animated story through 6 meticulously timed chapters: Hero reveal, Modern Barrier Crisis, Pinned Alpine Biotechnology synthesis, 3D bioactive feature cards, Clinical Trials Before/After slider, and Magnetic CTA.
            </p>
          </div>
          <button
            onClick={() => onNavigate('story')}
            className="whitespace-nowrap px-8 py-4 rounded-full bg-[#F5F3EF] text-[#121212] hover:bg-white text-xs uppercase tracking-[0.2em] font-medium shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 relative z-10"
          >
            Launch Motion Story
            <ArrowRight className="w-4 h-4 text-[#B89B6C]" />
          </button>
        </div>
      </section>

      {/* Wave Transition into Ingredients */}
      <WaveDivider
        position="bottom"
        variant="asymmetric"
        fillClass="text-white dark:text-[#0C0C0C]"
        strokeClass="text-[#E5DFD5]/60 dark:text-[#262626]/60"
        heightClass="h-8 sm:h-12 lg:h-14"
      />

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

      {/* Wave Transition into The Gazette */}
      <WaveDivider
        position="bottom"
        variant="wave"
        fillClass="text-[#F2ECE3] dark:text-[#111111]"
        strokeClass="text-[#E5DFD5]/60 dark:text-[#262626]/60"
        heightClass="h-8 sm:h-12 lg:h-16"
      />

      {/* 8. Editorial Journal Stories */}
      <section className="bg-[#F2ECE3] dark:bg-[#111111] py-16 sm:py-24 border-t border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD5]/80 dark:border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                The Gazette
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
                Essays on Skin &amp; Scent
              </h2>
            </div>
            <button
              onClick={() => onNavigate('journal')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
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
                <div className="aspect-16/10 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#E8DFD3] dark:bg-[#1C1C1C] border border-[#E5DFD5]/80 dark:border-[#262626] shadow-2xs hover:shadow-lg transition-shadow duration-300">
                  <LuxuryImage
                    src={article.featuredImage}
                    alt={article.title}
                    fallbackText={article.category}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 line-clamp-2 font-light leading-relaxed">
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
