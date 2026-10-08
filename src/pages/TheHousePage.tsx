import React from 'react';
import { HERO_IMAGE, CLOUD_BARRIER_IMAGE, NOIR_FRAGRANCE_IMAGE } from '../data/products';
import { Sparkles, ShieldCheck, ArrowRight, Leaf, HeartHandshake } from 'lucide-react';

interface TheHousePageProps {
  onExploreShop: () => void;
  onExploreRituals: () => void;
}

export const TheHousePage: React.FC<TheHousePageProps> = ({
  onExploreShop,
  onExploreRituals
}) => {
  return (
    <div className="bg-[#F7F4EF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#E5DFD5] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#543544] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
            <span>The Maison &amp; Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#181818] font-normal leading-[1.1]">
            Beauty rituals for every expression.
          </h1>
          <p className="text-sm sm:text-base text-[#181818]/75 font-light leading-relaxed">
            Founded on the conviction that skincare and fragrance belong to no single gender,
            AUREN unifies the sensory discipline of French Haute Parfumerie with modern biomimetic dermatology.
          </p>
        </div>

        {/* Split Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#CDAA7D] font-medium block">
                01 · The Lipid Doctrine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#181818]">
                Respecting the Stratum Corneum First
              </h2>
              <p className="text-xs sm:text-sm text-[#181818]/75 font-light leading-relaxed">
                We reject aggressive resurfacing and stripping foaming surfactants. The acid mantle and lipid bilayers are living, responsive barriers.
                Our formulas prioritize bio-identical 3:1:1 ceramides, plant squalane, and soothing oat beta-glucan to strengthen your skin from within.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E5DFD5]">
              <span className="text-xs uppercase tracking-widest text-[#CDAA7D] font-medium block">
                02 · The Olfactory Sanctuary
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#181818]">
                High Concentration, Intimate Sillage
              </h2>
              <p className="text-xs sm:text-sm text-[#181818]/75 font-light leading-relaxed">
                Our parfums are macerated for weeks in small batches, featuring rare aged Florentine orris, Moroccan neroli, and resinous Atlas cedarwood.
                Formulated at 22% essence concentration to unfold intimately against your body warmth rather than overpowering the room.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 overflow-hidden bg-[#E8DFD3] border border-[#E5DFD5] shadow-md">
              <img
                src={HERO_IMAGE}
                alt="AUREN Atelier Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* House Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-8 border border-[#E5DFD5] space-y-3">
            <ShieldCheck className="w-5 h-5 text-[#CDAA7D]" />
            <h3 className="font-serif text-lg text-[#181818]">Gender-Inclusive Formulation</h3>
            <p className="text-xs text-[#181818]/70 font-light leading-relaxed">
              Organized around daily biological needs rather than commercial marketing labels. Free from arbitrary conventions.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E5DFD5] space-y-3">
            <Leaf className="w-5 h-5 text-[#CDAA7D]" />
            <h3 className="font-serif text-lg text-[#181818]">100% Recyclable Glass</h3>
            <p className="text-xs text-[#181818]/70 font-light leading-relaxed">
              Heavy European flint glass, aluminum dispensing pumps, and certified FSC paper fluting. Zero unnecessary secondary plastic wrap.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E5DFD5] space-y-3">
            <HeartHandshake className="w-5 h-5 text-[#CDAA7D]" />
            <h3 className="font-serif text-lg text-[#181818]">Radical INCI Honesty</h3>
            <p className="text-xs text-[#181818]/70 font-light leading-relaxed">
              Every percentage and active molecule is disclosed with its physiological purpose. Dermatologically validated.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-[#171515] text-[#F6F0E8] p-8 sm:p-12 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl text-white">Begin Your Daily Sequence</h3>
            <p className="text-xs text-[#F6F0E8]/70 font-light max-w-md">
              Discover considered skincare and haute parfumerie formulated for living skin.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onExploreShop}
              className="bg-[#CDAA7D] hover:bg-[#b89569] text-[#171515] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Shop Collection
            </button>
            <button
              onClick={onExploreRituals}
              className="border border-white/30 hover:border-white text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              View Rituals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
