/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SearchOverlay } from './components/search/SearchOverlay';
import { ProductQuickView } from './components/product/ProductQuickView';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RitualsPage } from './pages/RitualsPage';
import { JournalPage } from './pages/JournalPage';
import { WishlistPage } from './pages/WishlistPage';
import { TheHousePage } from './pages/TheHousePage';
import { MotionStoryPage } from './pages/MotionStoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';
import { Product, Ritual, Article } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct, selectedArticle]);

  const handleNavigate = (page: string, params?: any) => {
    if (params?.category) {
      setShopCategory(params.category);
    } else if (page === 'shop') {
      setShopCategory('All');
    }
    setCurrentPage(page);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleSelectRitual = (ritual: Ritual) => {
    setCurrentPage('rituals');
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('journal');
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
            {/* 1. Global Announcement */}
            <AnnouncementBar />

          {/* 2. Top Navigation Bar */}
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* 3. Main View Stage */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onSelectRitual={handleSelectRitual}
                onSelectArticle={handleSelectArticle}
                onQuickView={handleQuickView}
              />
            )}

            {currentPage === 'shop' && (
              <ShopPage
                initialCategory={shopCategory}
                onSelectProduct={handleSelectProduct}
                onQuickView={handleQuickView}
              />
            )}

            {currentPage === 'product' && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                onBack={() => setCurrentPage('shop')}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'rituals' && (
              <RitualsPage onSelectProduct={handleSelectProduct} />
            )}

            {currentPage === 'journal' && (
              <JournalPage
                initialArticle={selectedArticle}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'wishlist' && (
              <WishlistPage
                onSelectProduct={handleSelectProduct}
                onQuickView={handleQuickView}
                onExploreShop={() => handleNavigate('shop')}
              />
            )}

            {currentPage === 'the-house' && (
              <TheHousePage
                onExploreShop={() => handleNavigate('shop')}
                onExploreRituals={() => handleNavigate('rituals')}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'story' && (
              <MotionStoryPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'cart' && (
              <CartPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onSuccessReturn={() => handleNavigate('home')}
              />
            )}
          </main>

          {/* 4. Global Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* 5. Slide-Over Bag Drawer */}
          <CartDrawer onNavigate={handleNavigate} />

          {/* 6. Checkout Flow Modal */}
          <CheckoutModal onSuccessReturn={() => setCurrentPage('home')} />

          {/* 7. Instant Search Overlay */}
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={handleSelectProduct}
            onSelectArticle={handleSelectArticle}
          />

          {/* 8. Quick View Modal */}
          <ProductQuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onViewDetails={handleSelectProduct}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
    </ThemeProvider>
  );
}
