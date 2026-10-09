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
    <footer className="site-footer pt-20 pb-12 border-t transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/15 reveal-on-load">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <span className="font-serif text-3xl tracking-[0.25em] font-normal uppercase text-[#f4f0e7] block">
              AUREN
            </span>
            <p className="text-sm font-light text-[#f4f0e7]/75 leading-relaxed max-w-sm">
              Beauty rituals for every expression. High-performance biomimetic formulas,
              rare botanical absolutes, and gender-inclusive formulations crafted with quiet architectural precision.
            </p>
            <div className="pt-2 text-xs text-[#d49a70] dark:text-[#D4AF37] tracking-wider uppercase font-medium">
              Haute Parfumerie · Biomimetic Skincare · Conscious Luxury
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#d49a70] dark:text-[#D4AF37]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-[13px] leading-6 text-[#f4f0e7]/72">
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Skin' })}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Lipid Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Fragrance' })}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Haute Parfumerie
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Grooming' })}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Clean Lines Grooming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Makeup' })}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Complexion Fluid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rituals')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Curated Ritual Sets
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#d49a70] dark:text-[#D4AF37]">
              The House
            </h4>
            <ul className="space-y-2.5 text-[13px] leading-6 text-[#f4f0e7]/72">
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  The Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#d49a70] dark:hover:text-[#D4AF37] transition-colors cursor-pointer text-[#d49a70] dark:text-[#D4AF37]"
                >
                  Motion Story &amp; Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('the-house')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  The Maison &amp; Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#d49a70] dark:hover:text-[#D4AF37] transition-colors cursor-pointer text-[#d49a70] dark:text-[#D4AF37] font-medium"
                >
                  Client Concierge &amp; Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Shopping Bag
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checkout')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Atelier Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="site-footer__link transition-colors cursor-pointer"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="text-[#f4f0e7]/40">Recyclable Glass Initiative</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#d49a70] dark:text-[#D4AF37]">
              Private Gazette
            </h4>
            <p className="text-xs text-[#f4f0e7]/75 leading-relaxed">
              Receive private invitations to micro-batch fragrance harvests, skincare formulations, and ritual guides.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-[#d49a70] dark:text-[#D4AF37] bg-[#d49a70]/15 dark:bg-[#D4AF37]/15 p-3 border border-[#d49a70]/30 dark:border-[#D4AF37]/30">
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
                  className="flex-1 bg-[#1C1C1C] dark:bg-[#141414] border border-white/20 px-3.5 py-2.5 text-xs text-[#f4f0e7] placeholder-[#f4f0e7]/45 focus:outline-none focus:border-[#d49a70] dark:focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Gazette"
                  className="bg-[#d49a70] dark:bg-[#D4AF37] hover:bg-[#A08356] dark:hover:bg-[#E2C265] text-[#121212] font-semibold px-4 py-2.5 text-xs transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <div className="text-[11px] text-[#f4f0e7]/50 pt-1">
              Complimentary sample consultations available via our digital atelier.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f4f0e7]/60 gap-4">
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
