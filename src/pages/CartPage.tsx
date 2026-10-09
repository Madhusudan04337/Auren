import React, { useState } from 'react';
import { 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Truck, 
  Gift, 
  Tag, 
  ArrowLeft, 
  Lock, 
  ChevronRight,
  Info,
  Clock,
  Heart
} from 'lucide-react';
import { useCart, COMPLIMENTARY_SAMPLES } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { LuxuryImage } from '../components/ui/LuxuryImage';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CartPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    total,
    selectedSamples,
    toggleSample,
    addToCart
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Calculations
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const effectiveShipping = progressToFreeShipping >= 100 ? 0 : shippingFee;
  const finalTotal = Math.max(0, subtotal - discountAmount + effectiveShipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'AUREN10' || code === 'WELCOME10') {
      setAppliedPromo({ code, discountPercent: 10 });
      setPromoCode('');
    } else if (code === 'RITUAL20' || code === 'HAUTE20') {
      setAppliedPromo({ code, discountPercent: 20 });
      setPromoCode('');
    } else {
      setPromoError('Privilege code invalid or expired. Try "WELCOME10" or "RITUAL20".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  const handleMoveToWishlist = (item: any) => {
    if (!isInWishlist(item.productId)) {
      toggleWishlist(item.productId);
    }
    removeFromCart(item.id);
  };

  // Recommended pairings (cross-sells from products not already in cart)
  const cartProductIds = new Set(items.map(i => i.productId));
  const suggestedPairings = PRODUCTS.filter(p => !cartProductIds.has(p.id)).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#121212] dark:text-[#F5F3EF] pt-8 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('shop')}
              className="hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Catalog</span>
            </button>
            <span>/</span>
            <span className="text-[#121212] dark:text-[#F5F3EF] font-medium">Bespoke Shopping Bag</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Atelier Encrypted</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block mb-1">
              Your Atelier Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight">
              Shopping Bag
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-mono text-[#121212]/60 dark:text-[#F5F3EF]/60">
              {items.length} {items.length === 1 ? 'Creation Selected' : 'Creations Selected'}
            </span>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[#121212]/50 dark:text-[#F5F3EF]/50 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer text-xs underline underline-offset-4"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-12 sm:p-20 text-center max-w-2xl mx-auto space-y-6 my-12">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] flex items-center justify-center mx-auto text-[#B89B6C] dark:text-[#D4AF37]">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF]">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-md mx-auto font-light leading-relaxed">
                Discover our biomimetic skincare emulsions, cold-pressed botanical essences, and haute parfumerie creations crafted in small batches.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
              >
                Explore Catalog
              </button>
              <button
                onClick={() => onNavigate('story')}
                className="w-full sm:w-auto border border-[#121212] dark:border-[#F5F3EF] hover:bg-[#121212]/5 dark:hover:bg-white/5 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
              >
                Experience Motion Story
              </button>
            </div>
          </div>
        ) : (
          /* 2-Column Responsive Layout with Sticky Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start relative">
            
            {/* Left Column: Bag Items, Samples, Gift Options, Pairings */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              
              {/* Complimentary Express Delivery Progress Card */}
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-4 sm:p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <span className="font-medium">
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                          Complimentary White-Glove Courier Unlocked
                        </span>
                      ) : (
                        <span>
                          Add <strong className="font-mono tabular-nums text-[#121212] dark:text-[#F5F3EF]">₹{remainingForFreeShipping.toLocaleString()}</strong> more for complimentary express delivery
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-[#121212]/70 dark:text-[#F5F3EF]/70 font-semibold">
                    {Math.round(progressToFreeShipping)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#F0EBE3] dark:bg-[#222222] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#121212] dark:bg-[#D4AF37] transition-all duration-500 ease-out"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] divide-y divide-[#E5DFD5] dark:divide-[#262626]">
                <div className="p-4 sm:p-5 flex justify-between items-center bg-[#FAF8F5]/60 dark:bg-[#181818]">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#121212] dark:text-[#F5F3EF]">
                    Selected Formulas ({items.length})
                  </span>
                  <span className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-mono">
                    Direct from Zurich &amp; Grasse
                  </span>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail Image */}
                    <div 
                      onClick={() => onSelectProduct(item.product)}
                      className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F5F1EB] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] shrink-0 overflow-hidden cursor-pointer group"
                    >
                      <LuxuryImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fallbackText={item.product.category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Item Information */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                              {item.product.category} · {item.product.type}
                            </span>
                            <h3 
                              onClick={() => onSelectProduct(item.product)}
                              className="font-serif text-lg font-medium text-[#121212] dark:text-[#F5F3EF] hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer leading-tight mt-0.5"
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light mt-0.5">
                              {item.product.subtitle}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="font-mono text-base font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-[11px] font-mono text-[#121212]/50 dark:text-[#F5F3EF]/50">
                                ₹{item.price.toLocaleString()} each
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Size & Shade Specs */}
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
                          <span className="px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-[#E5DFD5] dark:border-[#2C2C2C]">
                            Size: <strong className="font-medium text-[#121212] dark:text-[#F5F3EF]">{item.size}</strong>
                          </span>
                          {item.shade && (
                            <span className="px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-[#E5DFD5] dark:border-[#2C2C2C] flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                                style={{ backgroundColor: item.shade.hex }}
                              />
                              Shade: <strong className="font-medium text-[#121212] dark:text-[#F5F3EF]">{item.shade.name}</strong>
                            </span>
                          )}
                          <span className="text-[11px] text-[#B89B6C] dark:text-[#D4AF37] flex items-center gap-1">
                            <Check className="w-3 h-3" /> In Stock &amp; Fresh Batch
                          </span>
                        </div>
                      </div>

                      {/* Controls: Stepper, Wishlist, Remove */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#F2ECE3] dark:border-[#222222]">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E5DFD5] dark:border-[#262626] bg-[#FAF8F5] dark:bg-[#1A1A1A]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-[#252525] text-sm text-[#121212] dark:text-[#F5F3EF] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-mono text-xs tabular-nums font-semibold text-[#121212] dark:text-[#F5F3EF]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-[#252525] text-sm text-[#121212] dark:text-[#F5F3EF] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 text-xs">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>Save to Wishlist</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#121212]/50 dark:text-[#F5F3EF]/50 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bespoke Complimentary Samples Selector */}
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD5] dark:border-[#262626] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF]">
                      Complimentary Atelier Discovery Samples
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                    {selectedSamples.length}/2 Selected · Included with your delivery
                  </span>
                </div>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light">
                  Select up to two deluxe trial flacons or lipid ampoules enclosed with your order for sensory discovery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {COMPLIMENTARY_SAMPLES.map((sample) => {
                    const isChecked = selectedSamples.includes(sample.id);
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => toggleSample(sample.id)}
                        className={`p-3.5 border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1C1C1C]'
                            : 'border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#141414] hover:border-[#121212]/50'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                            {sample.category}
                          </span>
                          <span className="text-xs font-medium text-[#121212] dark:text-[#F5F3EF] block leading-snug">
                            {sample.name}
                          </span>
                        </div>
                        <span className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-[#121212] border-[#121212] dark:bg-[#F5F3EF] dark:border-[#F5F3EF] text-white dark:text-[#0C0C0C]'
                            : 'border-[#D0C8BD] dark:border-[#444]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gift Presentation & Concierge Note */}
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <h3 className="font-serif text-base text-[#121212] dark:text-[#F5F3EF]">
                      Signature Gift Presentation
                    </h3>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#121212] dark:text-[#F5F3EF]">
                    <input
                      type="checkbox"
                      checked={isGiftWrapped}
                      onChange={(e) => setIsGiftWrapped(e.target.checked)}
                      className="accent-[#121212] dark:accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <span>Include Complimentary Gift Packaging</span>
                  </label>
                </div>

                {isGiftWrapped && (
                  <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                    <label className="block text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
                      Personalized Calligraphy Note (Printed on textured cotton vellum):
                    </label>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personal sentiment here (e.g., With devotion for your birthday ritual...)"
                      rows={2}
                      maxLength={180}
                      className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50 font-mono">
                      <span>Wax-sealed with atelier monogram</span>
                      <span>{giftNote.length}/180 characters</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Complementary Pairings */}
              {suggestedPairings.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                        Complete Your Ritual
                      </span>
                      <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                        Atelier Harmonious Pairings
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore all</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {suggestedPairings.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-4 flex flex-col justify-between group hover:border-[#121212]/40 transition-colors"
                      >
                        <div 
                          onClick={() => onSelectProduct(product)}
                          className="aspect-square bg-[#FAF8F5] dark:bg-[#1B1B1B] overflow-hidden mb-3 cursor-pointer"
                        >
                          <LuxuryImage
                            src={product.images[0]}
                            alt={product.name}
                            fallbackText={product.category}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                            {product.category}
                          </span>
                          <h4 
                            onClick={() => onSelectProduct(product)}
                            className="font-serif text-sm font-medium text-[#121212] dark:text-[#F5F3EF] cursor-pointer hover:underline truncate"
                          >
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs tabular-nums text-[#121212] dark:text-[#F5F3EF] font-semibold block">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => addToCart(product, product.sizes[0]?.size || 'Standard')}
                          className="mt-3 w-full border border-[#121212] dark:border-[#F5F3EF] hover:bg-[#121212] hover:text-white dark:hover:bg-[#F5F3EF] dark:hover:text-[#0C0C0C] py-2 text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer"
                        >
                          + Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: STICKY ORDER SUMMARY */}
            {/* The container has 'lg:sticky lg:top-28 self-start' to lock in place while the user scrolls through the entire cart contents */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 self-start space-y-4">
              
              {/* Sticky Status Indicator Badge */}
              <div className="hidden lg:flex items-center justify-between px-3 py-1.5 bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] text-[11px] text-[#121212]/70 dark:text-[#F5F3EF]/70">
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Sticky Order Summary Active
                </span>
                <span className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                  Fixed view while scrolling
                </span>
              </div>

              {/* Main Summary Card */}
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-lg p-6 space-y-5">
                <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-4 flex items-center justify-between">
                  <h2 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] font-medium">
                    Order Summary
                  </h2>
                  <span className="font-mono text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Calculation Rows */}
                <div className="space-y-3 text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80">
                  <div className="flex justify-between items-center">
                    <span>Merchandise Subtotal</span>
                    <span className="font-mono font-medium tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <span>Express Atelier Delivery</span>
                      {effectiveShipping === 0 && (
                        <span className="text-[10px] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">(Tier Reached)</span>
                      )}
                    </span>
                    <span className="font-mono font-medium tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                      {effectiveShipping === 0 ? (
                        <span className="text-[#B89B6C] dark:text-[#D4AF37] font-semibold">Complimentary</span>
                      ) : (
                        `₹${effectiveShipping}`
                      )}
                    </span>
                  </div>

                  {isGiftWrapped && (
                    <div className="flex justify-between items-center text-[#B89B6C] dark:text-[#D4AF37]">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5" />
                        Signature Gift Packaging
                      </span>
                      <span className="font-medium text-[11px]">Complimentary</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Privilege Code ({appliedPromo.code} -{appliedPromo.discountPercent}%)
                      </span>
                      <span className="font-mono tabular-nums">
                        -₹{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                    <span>Applicable GST &amp; Luxury Surcharge</span>
                    <span>Included in formulation value</span>
                  </div>

                  {/* Total Due Line */}
                  <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] flex justify-between items-baseline">
                    <div>
                      <span className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] block">
                        Estimated Total
                      </span>
                      <span className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                        Final courier validation at checkout
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                        ₹{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input Accordion */}
                <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% off)</span>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="text-xs underline text-emerald-700 dark:text-emerald-400 hover:text-red-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 font-semibold">
                        Atelier Privilege Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="e.g. WELCOME10"
                          className="flex-1 bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] px-3 py-2 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-red-500 dark:text-red-400">{promoError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Primary Checkout CTA */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl active:scale-[0.99]"
                  >
                    <span>Proceed to Bespoke Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('shop')}
                    className="w-full border border-[#E5DFD5] dark:border-[#262626] hover:bg-[#FAF8F5] dark:hover:bg-[#1C1C1C] text-[#121212] dark:text-[#F5F3EF] py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                  >
                    Continue Shopping Catalog
                  </button>
                </div>

                {/* Assurance Seals */}
                <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262626] space-y-2.5 text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                    <span>Complimentary returns within 14 days of receipt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                    <span>Dispatched within 24 hours in temperature-controlled casing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                    <span>2 complimentary discovery samples included with every order</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Mobile Sticky Order Summary Bar for screens < lg */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#141414] border-t border-[#E5DFD5] dark:border-[#262626] p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60 block font-mono">
                Total Due ({items.length} items)
              </span>
              <span className="font-mono text-lg font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                ₹{finalTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onNavigate('checkout')}
              className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
