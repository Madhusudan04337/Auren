import React from 'react';
import { Product } from '../../types';
import { PRODUCTS, MORNING_RITUAL_IMAGE, HERO_IMAGE, NOIR_FRAGRANCE_IMAGE, SKIN_TINT_IMAGE } from '../../data/products';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { LuxuryImage } from '../ui/LuxuryImage';

interface CommunitySectionProps {
  onSelectProduct: (product: Product) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onSelectProduct }) => {
  const { addToCart } = useCart();

  const communityStories = [
    {
      id: 'c-1',
      name: 'Devansh K.',
      location: 'New Delhi',
      skinType: 'Combination / Sensitive',
      quote: 'Clean Lines has eliminated razor bumps along my neckline for good. The cypress scent is understated and crisp.',
      product: PRODUCTS[4], // Shave serum
      image: HERO_IMAGE
    },
    {
      id: 'c-2',
      name: 'Meera S.',
      location: 'Bengaluru',
      skinType: 'Dry / Reactive',
      quote: 'Cloud Barrier Cream saved my barrier after retinol damage. I wake up with zero flaking and satin calm.',
      product: PRODUCTS[0], // Cloud Barrier
      image: MORNING_RITUAL_IMAGE
    },
    {
      id: 'c-3',
      name: 'Rohan & Ananya',
      location: 'Mumbai',
      skinType: 'All Skin Types',
      quote: 'Noir 03 is our shared evening signature. On him it pulls smoky cedar; on me it blooms into rich powdery iris.',
      product: PRODUCTS[1], // Noir 03
      image: NOIR_FRAGRANCE_IMAGE
    },
    {
      id: 'c-4',
      name: 'Tara V.',
      location: 'Kolkata',
      skinType: 'Normal / Olive',
      quote: 'The Soft Focus Skin Tint in Warm Ochre disappears into skin. It lets real texture show without any heavy shine.',
      product: PRODUCTS[2], // Skin Tint
      image: SKIN_TINT_IMAGE
    }
  ];

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'Standard';
    const defaultShade = product.shades ? product.shades[0] : undefined;
    addToCart(product, defaultSize, defaultShade, 1);
  };

  return (
    <section className="bg-[#FAF8F5] dark:bg-[#0C0C0C] py-20 lg:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD5]/70 dark:border-[#222222] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
              The Community
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal">
              Real Rituals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#121212]/60 dark:text-[#F5F3EF]/60 max-w-sm font-light leading-relaxed">
            Formulations in practice across diverse climates, skin states, and personal styles.
          </p>
        </div>

        {/* 4 Community Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectProduct(story.product)}
              className="bg-white dark:bg-[#141414] rounded-2xl border border-black/5 dark:border-white/10 flex flex-col justify-between overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Photo */}
              <div className="aspect-4/3 relative overflow-hidden bg-[#E8DFD3] dark:bg-[#1C1C1C] rounded-t-2xl sm:rounded-t-3xl">
                <LuxuryImage
                  src={story.image}
                  alt={story.name}
                  fallbackText={story.skinType}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full tracking-wider">
                  {story.skinType}
                </div>
              </div>

              {/* Quote & details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="space-y-3 pt-3 border-t border-[#E5DFD5]/80 dark:border-[#262626]">
                  <div>
                    <div className="text-xs font-semibold text-[#121212] dark:text-[#F5F3EF]">{story.name}</div>
                    <div className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50 uppercase tracking-widest">{story.location}</div>
                  </div>

                  {/* Attached Product Box */}
                  <div className="bg-[#FAF8F5] dark:bg-[#1C1C1C] rounded-xl p-2.5 flex items-center justify-between border border-[#E5DFD5]/80 dark:border-[#262626]">
                    <div className="space-y-0.5 max-w-[70%]">
                      <div className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-medium">Ritual Key:</div>
                      <div className="font-serif text-xs text-[#121212] dark:text-[#F5F3EF] truncate font-medium">{story.product.name}</div>
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(story.product, e)}
                      aria-label={`Quick add ${story.product.name}`}
                      className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
