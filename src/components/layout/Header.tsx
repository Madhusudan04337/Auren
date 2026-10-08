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
          ? 'bg-[#F7F4EF]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#E5DFD5]'
          : 'bg-[#F7F4EF] py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#181818] hover:opacity-70 transition-opacity"
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
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-normal uppercase text-[#181818] transition-opacity group-hover:opacity-80">
              AUREN
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.18em] uppercase font-medium text-[#181818]/80">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative py-1 hover:text-[#181818] transition-colors focus:outline-none cursor-pointer ${
                  currentPage === item.id ? 'text-[#181818] font-semibold' : ''
                }`}
              >
                {item.label}
                {(currentPage === item.id) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#181818]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-5 text-[#181818]">
            <button
              onClick={onOpenSearch}
              className="p-1 hover:opacity-70 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Search Catalog and Journal"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('wishlist')}
              className="p-1 hover:opacity-70 transition-opacity focus:outline-none relative cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} saved)`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#543544] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="p-1 hover:opacity-70 transition-opacity focus:outline-none relative cursor-pointer"
              aria-label={`Shopping Bag (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#181818] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#E5DFD5] pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 px-2 text-sm tracking-[0.15em] uppercase text-[#181818] hover:bg-[#E8DFD3]/40 rounded-sm"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E5DFD5]/60 flex items-center justify-between px-2 text-xs text-[#181818]/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('wishlist');
                }}
                className="py-1 hover:text-[#181818]"
              >
                Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="py-1 hover:text-[#181818]"
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
