import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
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
    { label: 'Motion Story', id: 'story' },
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
          ? 'bg-[#FAF8F5]/95 dark:bg-[#0C0C0C]/95 backdrop-blur-md shadow-sm py-3.5 border-b border-[#E5DFD5] dark:border-[#222222]'
          : 'bg-[#FAF8F5] dark:bg-[#0C0C0C] py-5 border-b border-[#E5DFD5]/70 dark:border-[#222222]/80'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors"
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
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-normal uppercase text-[#121212] dark:text-[#F5F3EF] transition-opacity group-hover:opacity-80">
              AUREN
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium text-[#121212]/80 dark:text-[#F5F3EF]/80">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative py-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer ${
                  currentPage === item.id ? 'text-[#121212] dark:text-[#F5F3EF] font-semibold' : 'text-[#121212]/75 dark:text-[#F5F3EF]/75'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B89B6C] dark:bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#121212] dark:text-[#F5F3EF]">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer"
              aria-label="Search Catalog and Journal"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D4AF37] hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#121212] hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="p-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors focus:outline-none relative cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} saved)`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={openCart}
              className="p-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors focus:outline-none relative cursor-pointer"
              aria-label={`Shopping Bag (${totalItemCount} items)`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#E5DFD5] dark:border-[#222222] pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#FAF8F5] dark:bg-[#0C0C0C]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 px-2 text-sm tracking-[0.15em] uppercase text-[#121212] dark:text-[#F5F3EF] hover:bg-black/5 dark:hover:bg-white/10 rounded-xs"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#222222] flex items-center justify-between px-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('wishlist');
                }}
                className="py-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37]"
              >
                Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="py-1 hover:text-[#B89B6C] dark:hover:text-[#D4AF37]"
              >
                Shopping Bag ({totalItemCount})
              </button>
              <button
                onClick={toggleTheme}
                className="py-1 flex items-center gap-1.5 hover:text-[#B89B6C] dark:hover:text-[#D4AF37]"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
