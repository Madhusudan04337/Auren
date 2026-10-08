import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch
}) => {
  const { totalItemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', id: 'shop' },
    { label: 'Rituals', id: 'rituals' },
    { label: 'Journal', id: 'journal' },
    { label: 'The House', id: 'the-house' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    onNavigate(item.id);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2D3A1F]/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#F4F1E8]/15'
          : 'bg-[#2D3A1F] py-5 border-b border-[#F4F1E8]/10'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F4F1E8] hover:text-[#B8A678] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="AUREN Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-normal uppercase text-[#F4F1E8] transition-opacity group-hover:opacity-85">
              AUREN
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium text-[#F4F1E8]/85">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative py-1 hover:text-[#B8A678] transition-colors focus:outline-none cursor-pointer ${
                  currentPage === item.id ? 'text-[#F4F1E8] font-semibold' : 'text-[#F4F1E8]/80'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8A678]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-5 text-[#F4F1E8]">
            <button
              onClick={onOpenSearch}
              className="p-1 hover:text-[#B8A678] transition-colors focus:outline-none cursor-pointer"
              aria-label="Search Catalog and Journal"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('wishlist')}
              className="p-1 hover:text-[#B8A678] transition-colors focus:outline-none relative cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} saved)`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B8A678] text-[#2D3A1F] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="p-1 hover:text-[#B8A678] transition-colors focus:outline-none relative cursor-pointer"
              aria-label={`Shopping Bag (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B8A678] text-[#2D3A1F] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#F4F1E8]/15 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#2D3A1F]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 px-2 text-sm tracking-[0.15em] uppercase text-[#F4F1E8] hover:bg-white/10 rounded-xs"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#F4F1E8]/10 flex items-center justify-between px-2 text-xs text-[#F4F1E8]/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('wishlist');
                }}
                className="py-1 hover:text-[#B8A678]"
              >
                Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="py-1 hover:text-[#B8A678]"
              >
                Shopping Bag ({totalItemCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
