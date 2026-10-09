import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Package, 
  Check, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  Banknote, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCart, COMPLIMENTARY_SAMPLES } from '../context/CartContext';
import { LuxuryImage } from '../components/ui/LuxuryImage';
import { Product } from '../types';

interface CheckoutPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct?: (product: Product) => void;
  onSuccessReturn: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  onNavigate, 
  onSuccessReturn 
}) => {
  const {
    items,
    subtotal,
    freeShippingThreshold,
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
    apartment: 'Penthouse 14B',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
    deliverySpeed: 'express', // 'express' | 'same-day' | 'evening'
    paymentMethod: 'card', // 'card' | 'upi' | 'cod' | 'netbanking'
    specialInstructions: 'Please leave with concierge if unavailable. Monogram seal intact.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  // Delivery calculation
  const isFreeDeliveryUnlocked = subtotal >= freeShippingThreshold;
  const deliveryCost = isFreeDeliveryUnlocked 
    ? (formData.deliverySpeed === 'same-day' ? 250 : 0)
    : (formData.deliverySpeed === 'same-day' ? shippingFee + 250 : shippingFee);

  const finalTotal = subtotal + deliveryCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      completeOrder({
        fullName: formData.fullName,
        email: formData.email,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
        city: formData.city,
        postalCode: formData.postalCode
      });
    }, 900);
  };

  // Order Confirmed State
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#121212] dark:text-[#F5F3EF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-8 sm:p-12 shadow-2xl space-y-8 text-center">
          <div className="w-16 h-16 bg-[#B89B6C]/15 dark:bg-[#D4AF37]/20 text-[#B89B6C] dark:text-[#D4AF37] rounded-full mx-auto flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
              Bespoke Dispatch Registered
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF]">
              Your Ritual is Being Formulated
            </h1>
            <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-md mx-auto font-light leading-relaxed">
              We have received your atelier order. Each flacon and jar is hand-inspected under cleanroom protocols, encased in recyclable gift fluting, and sealed with an artisan monogram.
            </p>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#1A1A1A] p-6 border border-[#E5DFD5] dark:border-[#262626] text-left space-y-3.5">
            <div className="flex justify-between items-center border-b border-[#E5DFD5] dark:border-[#262626] pb-2 text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Atelier Reference</span>
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
                {orderCompleted.shippingAddress.address}, {orderCompleted.shippingAddress.city} {orderCompleted.shippingAddress.postalCode}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Total Valuation</span>
              <span className="font-mono font-bold text-[#121212] dark:text-[#F5F3EF] tabular-nums text-sm">
                ₹{orderCompleted.total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#E5DFD5] dark:border-[#262626] text-xs text-[#B89B6C] dark:text-[#D4AF37]">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4" />
                Dispatch Protocol
              </span>
              <span>Express Climate Courier (2–3 Days)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                resetOrderComplete();
                onSuccessReturn();
              }}
              className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Return to Sanctuary Home
            </button>
            <button
              onClick={() => {
                resetOrderComplete();
                onNavigate('shop');
              }}
              className="w-full border border-[#121212] dark:border-[#F5F3EF] hover:bg-[#121212]/5 dark:hover:bg-white/5 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Discover More Formulations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and not completed
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#121212] dark:text-[#F5F3EF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-12 text-center space-y-6">
          <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">No Items Ready for Checkout</h2>
          <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 leading-relaxed font-light">
            Your shopping bag does not contain any active selections. Explore the atelier catalog to craft your beauty ritual.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#0C0C0C] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  const chosenSamplesList = COMPLIMENTARY_SAMPLES.filter(s =>
    selectedSamples.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#121212] dark:text-[#F5F3EF] pt-8 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mb-6">
          <button
            onClick={() => onNavigate('cart')}
            className="hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
            <Lock className="w-3.5 h-3.5" />
            <span>Atelier Vault · Encrypted Secure Checkout</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-6 mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block mb-1">
            Dispatch Sanctuary Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF]">
            Atelier Checkout
          </h1>
        </div>

        {/* 2-Column Responsive Layout with Sticky Order Summary */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start relative">
          
          {/* Left Column: Form Details (Scrollable Content) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Step 1: Destination & Recipient Contact */}
            <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                    Recipient &amp; Contact Details
                  </h2>
                </div>
                <span className="text-xs text-[#121212]/50 dark:text-[#F5F3EF]/50 font-mono">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Email Address (For Batch Dispatch Updates) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Telephone Number (For Courier Coordination) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Sanctuary Address */}
            <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] text-xs font-mono font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                    Delivery Atelier Destination
                  </h2>
                </div>
                <span className="text-xs text-[#121212]/50 dark:text-[#F5F3EF]/50 font-mono">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Street Address / Residence *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 42 Crescent Avenue, Oberoi Enclave"
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Apartment, Suite, Wing (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    placeholder="e.g. Penthouse 14B, East Wing"
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Postal / PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212] dark:focus:border-[#F5F3EF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.country}
                    className="w-full bg-[#FAF8F5]/60 dark:bg-[#1C1C1C]/60 border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Delivery Speed / Courier Method */}
              <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262626] space-y-3">
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 font-semibold">
                  Select Dispatch Protocol
                </label>
                <div className="space-y-2.5">
                  <label className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    formData.deliverySpeed === 'express'
                      ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
                      : 'border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212]/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="speed"
                        checked={formData.deliverySpeed === 'express'}
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'express' })}
                        className="accent-[#121212] dark:accent-[#D4AF37]"
                      />
                      <div>
                        <div className="font-medium text-xs text-[#121212] dark:text-[#F5F3EF]">
                          Express Climate Courier (2–3 Days)
                        </div>
                        <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                          Sealed thermal casing · Direct laboratory dispatch
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                      {isFreeDeliveryUnlocked ? 'Complimentary' : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    formData.deliverySpeed === 'same-day'
                      ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
                      : 'border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212]/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="speed"
                        checked={formData.deliverySpeed === 'same-day'}
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'same-day' })}
                        className="accent-[#121212] dark:accent-[#D4AF37]"
                      />
                      <div>
                        <div className="font-medium text-xs text-[#121212] dark:text-[#F5F3EF]">
                          Priority Metro Courier (Same-Day / Next Morning)
                        </div>
                        <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                          Dedicated white-glove driver hand-delivery
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                      +₹250 Surcharge
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment & Settlement */}
            <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#0C0C0C] text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                    Settlement Method
                  </h2>
                </div>
                <span className="text-xs text-[#121212]/50 dark:text-[#F5F3EF]/50 font-mono">Step 3 of 3</span>
              </div>

              <div className="space-y-3">
                <label className={`p-4 border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
                    : 'border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212]/50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="accent-[#121212] dark:accent-[#D4AF37] mt-0.5"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                      <span className="font-medium text-xs text-[#121212] dark:text-[#F5F3EF]">
                        Atelier Credit / Debit Card (Instant 256-bit Tokenization)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                      Supports Visa, Mastercard, American Express, and RuPay with 3D Secure verification.
                    </p>
                  </div>
                </label>

                <label className={`p-4 border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
                    : 'border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212]/50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className="accent-[#121212] dark:accent-[#D4AF37] mt-0.5"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                      <span className="font-medium text-xs text-[#121212] dark:text-[#F5F3EF]">
                        Instant UPI / QR / NetBanking Simulator
                      </span>
                    </div>
                    <p className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                      Seamless verification via Google Pay, PhonePe, Paytm, or BHIM.
                    </p>
                  </div>
                </label>

                <label className={`p-4 border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#121212] dark:border-[#F5F3EF] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
                    : 'border-[#E5DFD5] dark:border-[#262626] hover:border-[#121212]/50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-[#121212] dark:accent-[#D4AF37] mt-0.5"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                      <span className="font-medium text-xs text-[#121212] dark:text-[#F5F3EF]">
                        Cash on Delivery (White-Glove Inspection on Handover)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                      Inspect tamper-evident wax seal prior to payment confirmation with delivery concierge.
                    </p>
                  </div>
                </label>
              </div>

              {/* Special Delivery Notes */}
              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626]">
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5 font-medium">
                  Atelier Courier Instructions (Optional)
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  rows={2}
                  className="w-full bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#262626] p-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#121212]"
                />
              </div>
            </div>

            {/* Bottom Form Submit Button for mobile/scroll end */}
            <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                <span>
                  By placing your bespoke order, you agree to the Atelier Terms of White-Glove Dispatch &amp; 14-Day Return Privilege.
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Formulating with Atelier Vault...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Bespoke Order · ₹{finalTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: STICKY ORDER SUMMARY */}
          {/* This container has 'lg:sticky lg:top-28 self-start' so it stays pinned and visible while filling in the 3 checkout steps */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 self-start space-y-4">
            
            {/* Sticky Indicator Telemetry Badge */}
            <div className="hidden lg:flex items-center justify-between px-3 py-1.5 bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#262626] text-[11px] text-[#121212]/70 dark:text-[#F5F3EF]/70">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Order Summary (Sticky)
              </span>
              <span className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                Visible throughout checkout
              </span>
            </div>

            {/* Main Sticky Order Card */}
            <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#262626] shadow-xl p-6 space-y-5">
              
              {/* Header with expand/collapse */}
              <div className="border-b border-[#E5DFD5] dark:border-[#262626] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF] font-medium">
                    Order Summary
                  </h3>
                  <span className="text-xs font-mono text-[#121212]/60 dark:text-[#F5F3EF]/60">
                    {items.length} {items.length === 1 ? 'creation' : 'creations'} enclosed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsItemsExpanded(!isItemsExpanded)}
                  className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-[#F5F3EF] flex items-center gap-1 cursor-pointer"
                >
                  <span>{isItemsExpanded ? 'Collapse' : 'Inspect'}</span>
                  {isItemsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Items Breakdown list */}
              {isItemsExpanded && (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-[#F2ECE3] dark:divide-[#222222]">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                      <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-[#E5DFD5] dark:border-[#262626] shrink-0 overflow-hidden">
                        <LuxuryImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fallbackText={item.product.category}
                          scrollZoom={false}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-medium text-[#121212] dark:text-[#F5F3EF] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-[#121212]/60 dark:text-[#F5F3EF]/60 font-mono">
                          Qty: {item.quantity} · {item.size} {item.shade ? `· ${item.shade.name}` : ''}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complimentary Samples Badges */}
              {chosenSamplesList.length > 0 && (
                <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
                    Enclosed Discovery Vials:
                  </span>
                  {chosenSamplesList.map((sample) => (
                    <div key={sample.id} className="text-[11px] text-[#121212]/75 dark:text-[#F5F3EF]/75 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                      <span className="truncate">{sample.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation Lines */}
              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] space-y-2.5 text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80">
                <div className="flex justify-between items-center">
                  <span>Merchandise Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-[#121212] dark:text-[#F5F3EF]">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Dispatch Courier</span>
                  <span className="font-mono tabular-nums font-medium text-[#121212] dark:text-[#F5F3EF]">
                    {deliveryCost === 0 ? (
                      <span className="text-[#B89B6C] dark:text-[#D4AF37] font-semibold">Complimentary</span>
                    ) : (
                      `₹${deliveryCost}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                  <span>Luxury Tax &amp; Formulation GST</span>
                  <span>Included</span>
                </div>

                {/* Total Due */}
                <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-base text-[#121212] dark:text-[#F5F3EF] block">
                      Total Due
                    </span>
                    <span className="text-[10px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                      Settlement in INR
                    </span>
                  </div>
                  <span className="font-mono text-2xl font-bold tabular-nums text-[#121212] dark:text-[#F5F3EF]">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Instant Submit CTA right within the sticky card */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming with Atelier...</span>
                  ) : (
                    <>
                      <span>Place Bespoke Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262626] space-y-2 text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                  <span>256-bit SSL encrypted atelier checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37] shrink-0" />
                  <span>Dispatched in tamper-evident wax seal</span>
                </div>
              </div>

            </div>

          </div>

        </form>
      </div>

      {/* Mobile Sticky Bar for screens < lg */}
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#0C0C0C] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? <span>Confirming...</span> : <span>Place Order</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
