import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2D3A1F] text-[#F4F1E8] pt-16 pb-12 border-t border-[#F4F1E8]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F4F1E8]/15">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <span className="font-serif text-3xl tracking-[0.25em] font-normal uppercase text-[#F4F1E8] block">
              AUREN
            </span>
            <p className="text-sm font-light text-[#F4F1E8]/75 leading-relaxed max-w-sm">
              Beauty rituals for every expression. High-performance biomimetic formulas,
              rare botanical absolutes, and gender-inclusive formulations crafted with quiet architectural precision.
            </p>
            <div className="pt-2 text-xs text-[#B8A678] tracking-wider uppercase font-medium">
              Haute Parfumerie · Biomimetic Skincare · Conscious Luxury
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8A678]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4F1E8]/80">
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Skin' })}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Lipid Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Fragrance' })}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Haute Parfumerie
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Grooming' })}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Clean Lines Grooming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Makeup' })}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Complexion Fluid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rituals')}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Curated Ritual Sets
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8A678]">
              The House
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4F1E8]/80">
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  The Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('the-house')}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  The Maison &amp; Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#B8A678] transition-colors"
                >
                  Ingredient Transparency
                </button>
              </li>
              <li>
                <span className="text-[#F4F1E8]/40">Sustainable Sourcing</span>
              </li>
              <li>
                <span className="text-[#F4F1E8]/40">Recyclable Glass Initiative</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8A678]">
              Private Gazette
            </h4>
            <p className="text-xs text-[#F4F1E8]/75 leading-relaxed">
              Receive private invitations to micro-batch fragrance harvests, skincare formulations, and ritual guides.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-[#B8A678] bg-[#B8A678]/15 p-3 border border-[#B8A678]/30">
                <Check className="w-4 h-4" />
                <span>You are invited. Welcome to the AUREN circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#232D18] border border-[#D8D7CC]/30 px-3.5 py-2.5 text-xs text-[#F4F1E8] placeholder-[#F4F1E8]/50 focus:outline-none focus:border-[#B8A678] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Gazette"
                  className="bg-[#B8A678] hover:bg-[#a69363] text-[#2D3A1F] font-semibold px-4 py-2.5 text-xs transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <div className="text-[11px] text-[#F4F1E8]/50 pt-1">
              Complimentary sample consultations available via our digital atelier.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4F1E8]/60 gap-4">
          <div className="flex items-center space-x-4">
            <span>Dermatologically Tested</span>
            <span>·</span>
            <span>Cruelty-Free</span>
            <span>·</span>
            <span>100% Recyclable Glass</span>
            <span>·</span>
            <span>Gender-Inclusive</span>
          </div>
          <div className="font-mono text-[11px] tabular-nums">
            © 2026 AUREN BEAUTY PARFUMERIE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
