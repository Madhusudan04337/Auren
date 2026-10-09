import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Package, ArrowRight } from 'lucide-react';
import { useCart, COMPLIMENTARY_SAMPLES } from '../../context/CartContext';

interface CheckoutModalProps {
  onSuccessReturn: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onSuccessReturn }) => {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    shippingFee,
    total,
    selectedSamples,
    orderCompleted,
    completeOrder,
    resetOrderComplete
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Aria Dev',
    email: 'aria.dev@example.com',
    phone: '+91 98765 43210',
    address: '42 Crescent Avenue, Oberoi Enclave',
    city: 'Mumbai',
    postalCode: '400050',
    paymentMethod: 'cod' // Cash on Delivery or Luxury Card
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !orderCompleted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      completeOrder({
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode
      });
    }, 900);
  };

  // Order Confirmed State Screen
  if (orderCompleted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#F5F3EF] max-w-xl w-full p-8 sm:p-10 border border-[#E5DFD5] dark:border-[#262626] shadow-2xl space-y-6 text-center my-8">
          <div className="w-14 h-14 bg-[#B89B6C]/20 dark:bg-[#D4AF37]/20 text-[#B89B6C] dark:text-[#D4AF37] rounded-full mx-auto flex items-center justify-center">
            <Check className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
              Atelier Confirmation
            </span>
            <h2 className="font-serif text-3xl text-[#121212] dark:text-[#F5F3EF]">
              Your Ritual is Prepared
            </h2>
            <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-sm mx-auto font-light leading-relaxed">
              We have received your bespoke order. Each creation is hand-checked and wrapped in our signature recyclable casing.
            </p>
          </div>

          <div className="bg-white dark:bg-[#161616] p-5 border border-[#E5DFD5] dark:border-[#262626] text-left space-y-3">
            <div className="flex justify-between items-center border-b border-[#E5DFD5] dark:border-[#262626] pb-2 text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Order Reference</span>
              <span className="font-mono font-bold text-[#121212] dark:text-[#F5F3EF] tracking-wider">
                {orderCompleted.orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Recipient</span>
              <span className="font-medium text-[#121212] dark:text-[#F5F3EF]">
                {orderCompleted.shippingAddress.fullName}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Destination</span>
              <span className="text-[#121212]/80 dark:text-[#F5F3EF]/80 text-right">
                {orderCompleted.shippingAddress.city}, {orderCompleted.shippingAddress.postalCode}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Total Value</span>
              <span className="font-mono font-bold text-[#121212] dark:text-[#F5F3EF] tabular-nums">
                ₹{orderCompleted.total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#E5DFD5] dark:border-[#262626] text-xs text-[#B89B6C] dark:text-[#D4AF37]">
              <span className="flex items-center gap-1 font-medium">
                <Truck className="w-3.5 h-3.5" />
                Dispatch Status
              </span>
              <span>Express Dispatch (2–3 Days)</span>
            </div>
          </div>

          <button
            onClick={() => {
              resetOrderComplete();
              onSuccessReturn();
            }}
            className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
          >
            Return to Sanctuary
          </button>
        </div>
      </div>
    );
  }

  const chosenSamplesList = COMPLIMENTARY_SAMPLES.filter(s =>
    selectedSamples.includes(s.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#F5F3EF] max-w-3xl w-full border border-[#E5DFD5] dark:border-[#262626] shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5DFD5] dark:border-[#262626] flex items-center justify-between bg-white dark:bg-[#161616]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
              Bespoke Dispatch
            </span>
            <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
              Atelier Checkout
            </h2>
          </div>
          <button
            onClick={closeCheckout}
            aria-label="Close Checkout"
            className="p-1.5 text-[#121212] dark:text-[#F5F3EF] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#121212] dark:text-[#F5F3EF] border-b border-[#E5DFD5] dark:border-[#262626] pb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                Destination &amp; Contact
              </h3>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] p-2.5 text-xs text-[#121212] dark:text-[#F5F3EF] focus:border-[#121212] dark:focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Option */}
              <div className="pt-2">
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-[#121212] dark:accent-[#F5F3EF]"
                    />
                    <span>Cash on Delivery (COD) · Inspect upon receipt</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#262626] text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-[#121212] dark:accent-[#F5F3EF]"
                    />
                    <span>Atelier Card Simulator · Encrypted Checkout</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary Column (Sticky) */}
            <div className="bg-white dark:bg-[#161616] p-5 border border-[#E5DFD5] dark:border-[#262626] flex flex-col justify-between space-y-4 md:sticky md:top-4 self-start shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] dark:border-[#262626] pb-2">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-[#121212] dark:text-[#F5F3EF]">
                    Summary ({items.length} creations)
                  </h3>
                  <span className="text-[10px] font-mono text-[#B89B6C] dark:text-[#D4AF37] uppercase">
                    Sticky View
                  </span>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <div className="font-serif font-medium text-[#121212] dark:text-[#F5F3EF]">{item.product.name}</div>
                        <div className="text-[10px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                          Qty: {item.quantity} · {item.size} {item.shade ? `· ${item.shade.name}` : ''}
                        </div>
                      </div>
                      <span className="font-mono font-medium tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Samples included */}
                {chosenSamplesList.length > 0 && (
                  <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#262626] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                      Enclosed Complimentary Samples:
                    </span>
                    {chosenSamplesList.map((sample) => (
                      <div key={sample.id} className="text-[11px] text-[#121212]/70 dark:text-[#F5F3EF]/70 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#B89B6C] dark:text-[#D4AF37]" />
                        <span>{sample.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculation */}
                <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] space-y-1.5 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums">
                      {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#121212] dark:text-[#F5F3EF] pt-2 border-t border-[#E5DFD5] dark:border-[#262626]">
                    <span>Total Due</span>
                    <span className="font-mono text-base tabular-nums">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#121212]/60 dark:text-[#F5F3EF]/60 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                  <span>Complimentary carbon-neutral express courier. Free returns within 14 days.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming with Atelier...</span>
                  ) : (
                    <>
                      <span>Place Bespoke Order · ₹{total.toLocaleString()}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
