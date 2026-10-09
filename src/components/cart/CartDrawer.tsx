import React from 'react';
import { X, Trash2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCart, COMPLIMENTARY_SAMPLES } from '../../context/CartContext';
import { LuxuryImage } from '../ui/LuxuryImage';

interface CartDrawerProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    total,
    selectedSamples,
    toggleSample,
    openCheckout
  } = useCart();

  if (!isCartOpen) return null;

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#F5F3EF] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DFD5] dark:border-[#262626] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between bg-white dark:bg-[#161616]">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">Shopping Bag</h2>
            <span className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-mono">
              ({items.length} {items.length === 1 ? 'creation' : 'creations'})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close Shopping Bag"
            className="p-1.5 text-[#121212] dark:text-[#F5F3EF] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#F2ECE3] dark:bg-[#1A1A1A] px-5 py-3 border-b border-[#E5DFD5] dark:border-[#262626]">
          <div className="flex items-center justify-between text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="font-medium text-[#B89B6C] dark:text-[#D4AF37] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                You have unlocked complimentary express delivery
              </span>
            ) : (
              <span>
                Add <strong className="font-mono tabular-nums">₹{remainingForFreeShipping.toLocaleString()}</strong> for complimentary delivery
              </span>
            )}
            <span className="font-mono text-[11px] tabular-nums font-semibold">
              {Math.round(progressToFreeShipping)}%
            </span>
          </div>
          <div className="w-full h-1 bg-[#E5DFD5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#121212] dark:bg-[#F5F3EF] transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <span className="font-serif text-2xl text-[#121212]/40 dark:text-[#F5F3EF]/40">Your bag is empty</span>
              <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 max-w-xs font-light leading-relaxed">
                Explore our curated lipid skincare formulas and haute parfumerie signatures to craft your daily ritual.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('shop');
                }}
                className="mt-2 bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] text-xs uppercase tracking-widest px-6 py-3 font-medium transition-colors cursor-pointer"
              >
                Discover The Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#E5DFD5] dark:divide-[#262626]">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F5F1EB] dark:bg-[#1C1C1C] shrink-0 border border-[#E5DFD5] dark:border-[#262626] overflow-hidden">
                    <LuxuryImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackText={item.product.category}
                      scrollZoom={false}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-[#121212] dark:text-[#F5F3EF] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#121212]/40 dark:text-[#F5F3EF]/40 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 mt-0.5 space-x-1.5 flex items-center">
                        <span>{item.size}</span>
                        {item.shade && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full inline-block border border-black/20"
                                style={{ backgroundColor: item.shade.hex }}
                              />
                              {item.shade.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#121212] dark:text-[#F5F3EF] hover:bg-[#F5F1EB] dark:hover:bg-[#252525] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono tabular-nums font-medium text-[#121212] dark:text-[#F5F3EF]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#121212] dark:text-[#F5F3EF] hover:bg-[#F5F1EB] dark:hover:bg-[#252525] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Samples Section */}
              <div className="pt-6 mt-4">
                <div className="bg-white dark:bg-[#161616] p-3.5 border border-[#E5DFD5] dark:border-[#262626] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B89B6C] dark:text-[#D4AF37] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Bespoke Samples (Select 2)
                    </span>
                    <span className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                      {selectedSamples.length}/2 Selected
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {COMPLIMENTARY_SAMPLES.map((sample) => {
                      const isChecked = selectedSamples.includes(sample.id);
                      return (
                        <button
                          key={sample.id}
                          onClick={() => toggleSample(sample.id)}
                          type="button"
                          className={`w-full flex items-center justify-between p-2 text-left text-xs border transition-colors cursor-pointer ${
                            isChecked
                              ? 'border-[#121212] bg-[#FAF8F5] dark:border-[#F5F3EF] dark:bg-[#202020]'
                              : 'border-[#E5DFD5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] hover:border-[#121212] dark:hover:border-white'
                          }`}
                        >
                          <span className="truncate pr-2 font-medium text-[11px] text-[#121212] dark:text-[#F5F3EF]">
                            {sample.name}
                          </span>
                          <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ml-2 ${
                            isChecked
                              ? 'bg-[#121212] border-[#121212] dark:bg-[#F5F3EF] dark:border-[#F5F3EF] text-white dark:text-[#0C0C0C]'
                              : 'border-[#D8D1C7] dark:border-[#444]'
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer / Order Summary */}
        {items.length > 0 && (
          <div className="sticky bottom-0 z-20 p-5 border-t border-[#E5DFD5] dark:border-[#262626] bg-white dark:bg-[#161616] space-y-4 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
            <div className="space-y-1.5 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#121212] dark:text-[#F5F3EF] font-medium">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Express Atelier Courier</span>
                <span className="font-mono tabular-nums text-[#121212] dark:text-[#F5F3EF] font-medium">
                  {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5DFD5] dark:border-[#262626] text-sm text-[#121212] dark:text-[#F5F3EF] font-semibold">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums text-base">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('checkout');
                }}
                className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Proceed to Bespoke Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  closeCart();
                  onNavigate('cart');
                }}
                className="w-full border border-[#E5DFD5] dark:border-[#262626] hover:bg-[#FAF8F5] dark:hover:bg-[#202020] text-[#121212] dark:text-[#F5F3EF] py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer text-center block"
              >
                View Full Bag Page
              </button>
            </div>

            <p className="text-[10px] text-center text-[#121212]/50 dark:text-[#F5F3EF]/50 uppercase tracking-wider">
              Hand-packaged in recyclable luxury gift fluting · Sample vials enclosed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
