import React from 'react';
import { X, Trash2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCart, COMPLIMENTARY_SAMPLES } from '../../context/CartContext';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#F7F4EF] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DFD5] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DFD5] flex items-center justify-between bg-white">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-xl text-[#181818]">Shopping Bag</h2>
            <span className="text-xs text-[#181818]/60 font-mono">
              ({items.length} {items.length === 1 ? 'creation' : 'creations'})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close Shopping Bag"
            className="p-1.5 text-[#181818] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FAF8F5] px-5 py-3 border-b border-[#E5DFD5]">
          <div className="flex items-center justify-between text-xs text-[#181818]/80 mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="font-medium text-[#543544] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#CDAA7D]" />
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
          <div className="w-full h-1 bg-[#E8DFD3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#181818] transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <span className="font-serif text-2xl text-[#181818]/50">Your bag is empty</span>
              <p className="text-xs text-[#181818]/60 max-w-xs font-light leading-relaxed">
                Explore our curated lipid skincare formulas and haute parfumerie signatures to craft your daily ritual.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('shop');
                }}
                className="mt-2 bg-[#181818] hover:bg-black text-white text-xs uppercase tracking-widest px-6 py-3 font-medium transition-colors cursor-pointer"
              >
                Discover The Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#E5DFD5]">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#EFEAE2] shrink-0 border border-[#E5DFD5] overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-[#181818] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#181818]/40 hover:text-[#543544] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="text-[11px] text-[#181818]/60 mt-0.5 space-x-1.5 flex items-center">
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
                      <div className="flex items-center border border-[#D8D1C7] bg-white text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#181818] hover:bg-[#F2EDE4]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono tabular-nums font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#181818] hover:bg-[#F2EDE4]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#181818]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Samples Section */}
              <div className="pt-6 mt-4">
                <div className="bg-white p-3.5 border border-[#E5DFD5] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#543544] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#CDAA7D]" />
                      Bespoke Samples (Select 2)
                    </span>
                    <span className="text-[10px] text-[#181818]/50 font-mono">
                      {selectedSamples.length}/2 Selected
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {COMPLIMENTARY_SAMPLES.map((sample) => {
                      const isChecked = selectedSamples.includes(sample.id);
                      return (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => toggleSample(sample.id)}
                          className={`w-full text-left p-2 text-xs flex items-center justify-between transition-colors border ${
                            isChecked
                              ? 'border-[#181818] bg-[#F7F4EF]'
                              : 'border-[#E5DFD5] bg-white hover:border-[#181818]/40'
                          }`}
                        >
                          <span className="text-[11px] text-[#181818] leading-tight">
                            {sample.name}
                          </span>
                          <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ml-2 ${
                            isChecked ? 'bg-[#181818] border-[#181818] text-white' : 'border-[#D8D1C7]'
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

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5DFD5] bg-white space-y-4">
            <div className="space-y-1.5 text-xs text-[#181818]/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#181818] font-medium">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Express Atelier Courier</span>
                <span className="font-mono tabular-nums text-[#181818] font-medium">
                  {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5DFD5] text-sm text-[#181818] font-semibold">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums text-base">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full bg-[#181818] hover:bg-black text-white py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] text-center text-[#181818]/50 uppercase tracking-wider">
              Hand-packaged in recyclable luxury gift fluting · Sample vials enclosed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
