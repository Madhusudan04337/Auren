import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product, UserAddress } from '../types';
import {
  Package,
  Sparkles,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Plus,
  Check,
  Edit2,
  Trash2,
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface AccountPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    user,
    orders,
    logout,
    updateProfile,
    updateSkinProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  } = useAuth();
  
  const { wishlistIds } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'dossier' | 'addresses' | 'wishlist' | 'settings'>('orders');
  
  // Selected Order for Tracking Drawer/Modal
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  // Address modal/form state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<UserAddress, 'id'>>({
    fullName: user?.name || '',
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  // Dossier editing state
  const [isEditingDossier, setIsEditingDossier] = useState(false);
  const [dossierSkinType, setDossierSkinType] = useState(user?.skinProfile.skinType || 'Combination / Sensitive');
  const [dossierConcerns, setDossierConcerns] = useState<string[]>(user?.skinProfile.primaryConcerns || ['Barrier Resilience']);
  const [dossierFragrance, setDossierFragrance] = useState(user?.skinProfile.fragranceFamily || 'Woody Amber & Smoked Resins');

  // Settings form state
  const [settingsName, setSettingsName] = useState(user?.name || '');
  const [settingsPhone, setSettingsPhone] = useState(user?.phone || '');
  const [settingsSavedFeedback, setSettingsSavedFeedback] = useState(false);

  // Re-order feedback
  const [reorderFeedback, setReorderFeedback] = useState<string | null>(null);

  // If user is not logged in, prompt to log in
  if (!user) {
    return (
      <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-[calc(100vh-140px)] py-16 sm:py-24 text-[#121212] dark:text-[#F5F3EF]">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#121212]/5 dark:bg-white/10 flex items-center justify-center mx-auto text-[#B89B6C] dark:text-[#D4AF37]">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-[#121212] dark:text-[#F5F3EF]">
              Atelier Member Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed">
              Please sign in to access your personal dermal dossier, saved addresses, and active orders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="flex-1 bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] py-3 rounded-full text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="flex-1 bg-transparent border border-[#121212] dark:border-white text-[#121212] dark:text-[#F5F3EF] py-3 rounded-full text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Find wishlist products
  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  const handleSaveDossier = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkinProfile({
      skinType: dossierSkinType,
      primaryConcerns: dossierConcerns,
      fragranceFamily: dossierFragrance
    });
    setIsEditingDossier(false);
  };

  const handleToggleConcern = (concern: string) => {
    if (dossierConcerns.includes(concern)) {
      setDossierConcerns(dossierConcerns.filter(c => c !== concern));
    } else {
      setDossierConcerns([...dossierConcerns, concern]);
    }
  };

  const handleOpenAddressModal = (addressToEdit?: UserAddress) => {
    if (addressToEdit) {
      setEditingAddressId(addressToEdit.id);
      setAddressForm({
        fullName: addressToEdit.fullName,
        street: addressToEdit.street,
        apartment: addressToEdit.apartment || '',
        city: addressToEdit.city,
        postalCode: addressToEdit.postalCode,
        country: addressToEdit.country,
        phone: addressToEdit.phone || '',
        isDefault: addressToEdit.isDefault
      });
    } else {
      setEditingAddressId(null);
      setAddressForm({
        fullName: user.name,
        street: '',
        apartment: '',
        city: '',
        postalCode: '',
        country: 'United States',
        phone: user.phone || '',
        isDefault: user.addresses.length === 0
      });
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
    } else {
      addAddress(addressForm);
    }
    setIsAddressModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: settingsName,
      phone: settingsPhone
    });
    setSettingsSavedFeedback(true);
    setTimeout(() => setSettingsSavedFeedback(false), 2000);
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      const matched = PRODUCTS.find(p => p.id === item.productId);
      if (matched && matched.inStock) {
        addToCart(matched, item.size, undefined, item.quantity);
      }
    });
    setReorderFeedback(order.id);
    setTimeout(() => setReorderFeedback(null), 2500);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-[calc(100vh-140px)] py-10 sm:py-16 text-[#121212] dark:text-[#F5F3EF] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* =========================================================================
            1. MEMBER HEADER BANNER
           ========================================================================= */}
        <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Identity & Status */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] flex items-center justify-center font-serif text-2xl sm:text-3xl font-light shadow-md shrink-0">
                {user.avatarInitials || user.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF] font-normal">
                    {user.name}
                  </h1>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B6C] dark:text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#B89B6C]/10 dark:bg-[#D4AF37]/15">
                    {user.tier}
                  </span>
                </div>
                
                <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-mono">
                  {user.email} · Member since {user.joinedDate}
                </p>
              </div>
            </div>

            {/* Loyalty Metric & Actions */}
            <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-[#E5DFD5] dark:lg:border-[#262626] lg:pl-8">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                  Atelier Tier Points
                </div>
                <div className="text-2xl font-serif text-[#121212] dark:text-[#F5F3EF] flex items-center gap-2">
                  <span>{user.tierPoints.toLocaleString()}</span>
                  <span className="text-xs font-sans text-[#B89B6C] dark:text-[#D4AF37] tracking-wider uppercase font-medium">pts</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                  Private Privileges
                </div>
                <div className="text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                  <span>White-Glove Shipping &amp; Private Harvests</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onNavigate('home');
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-auto lg:ml-0 cursor-pointer"
                title="Sign out of Atelier"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* =========================================================================
            2. ACCOUNT NAVIGATION TABS (Anti-Slop Zero-Pill Architecture)
           ========================================================================= */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-[#E5DFD5] dark:border-[#222222] pb-px overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#121212] dark:border-[#F5F3EF] text-[#121212] dark:text-[#F5F3EF]'
                : 'border-transparent text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders &amp; Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`flex items-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'border-[#121212] dark:border-[#F5F3EF] text-[#121212] dark:text-[#F5F3EF]'
                : 'border-transparent text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Skin &amp; Scent Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-[#121212] dark:border-[#F5F3EF] text-[#121212] dark:text-[#F5F3EF]'
                : 'border-transparent text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({user.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-[#121212] dark:border-[#F5F3EF] text-[#121212] dark:text-[#F5F3EF]'
                : 'border-transparent text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#121212] dark:border-[#F5F3EF] text-[#121212] dark:text-[#F5F3EF]'
                : 'border-transparent text-[#121212]/60 dark:text-[#F5F3EF]/60 hover:text-[#121212] dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Preferences</span>
          </button>
        </div>

        {/* =========================================================================
            3. TAB 1: ORDERS & TRACKING
           ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-12 text-center space-y-4">
                <Package className="w-10 h-10 mx-auto text-stone-400" />
                <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                  No Orders on Record
                </h3>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-sm mx-auto font-light leading-relaxed">
                  Your formulation allocations will appear here with live white-glove dispatch telemetry once ordered.
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]/80 dark:border-[#222222]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#121212] dark:text-[#F5F3EF]">
                          Order {order.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium ${
                            order.status === 'In Transit'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : order.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60">
                        Placed on {order.date} · via {order.paymentMethod}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-[#FAF8F5] dark:bg-[#1E1E1E] hover:bg-[#F0EBE1] dark:hover:bg-[#282828] text-[#121212] dark:text-[#F5F3EF] border border-[#E5DFD5] dark:border-[#333] px-4 py-2 rounded-full text-xs tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Delivery</span>
                      </button>

                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] px-4 py-2 rounded-full text-xs tracking-wider font-medium transition-colors cursor-pointer"
                      >
                        {reorderFeedback === order.id ? 'Added to Bag ✓' : 'Reorder Items'}
                      </button>
                    </div>
                  </div>

                  {/* Order Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-3 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-2xl border border-[#E5DFD5]/60 dark:border-[#262626]"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/10 shrink-0">
                          <LuxuryImage
                            src={item.image}
                            alt={item.productName}
                            fallbackText="Bottle"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#121212] dark:text-[#F5F3EF] truncate">
                            {item.productName}
                          </h4>
                          <div className="text-[11px] text-[#121212]/60 dark:text-[#F5F3EF]/60">
                            {item.size} {item.shade ? `· ${item.shade}` : ''}
                          </div>
                          <div className="text-xs text-[#B89B6C] dark:text-[#D4AF37] font-medium">
                            Qty: {item.quantity} · ${item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Breakdown */}
                  <div className="flex flex-wrap items-center justify-between text-xs pt-2 text-[#121212]/70 dark:text-[#F5F3EF]/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>Destination: {order.shippingAddress.street}, {order.shippingAddress.city}</span>
                    </div>

                    <div className="flex items-center gap-4 font-mono font-medium text-sm text-[#121212] dark:text-[#F5F3EF]">
                      <span>Total: ${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* =========================================================================
            4. TAB 2: PERSONAL SKIN & SCENT DOSSIER
           ========================================================================= */}
        {activeTab === 'dossier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Dossier Card */}
            <div className="lg:col-span-8 bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#E5DFD5] dark:border-[#222222]">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B89B6C] dark:text-[#D4AF37]">
                    Biometric Formulation Profile
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF]">
                    Dermal &amp; Scent Dossier
                  </h2>
                </div>
                
                <button
                  onClick={() => setIsEditingDossier(!isEditingDossier)}
                  className="bg-[#FAF8F5] dark:bg-[#1E1E1E] hover:bg-[#F0EBE1] dark:hover:bg-[#282828] text-[#121212] dark:text-[#F5F3EF] border border-[#E5DFD5] dark:border-[#333] px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingDossier ? 'Cancel' : 'Edit Dossier'}</span>
                </button>
              </div>

              {isEditingDossier ? (
                <form onSubmit={handleSaveDossier} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                      Skin Behavior Classification
                    </label>
                    <select
                      value={dossierSkinType}
                      onChange={(e) => setDossierSkinType(e.target.value)}
                      className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-4 py-2.5 text-xs text-[#121212] dark:text-[#F5F3EF]"
                    >
                      <option value="Dry & Dehydrated">Dry &amp; Dehydrated</option>
                      <option value="Sensitive & Reactive">Sensitive &amp; Reactive</option>
                      <option value="Combination / Sensitive">Combination / Sensitive</option>
                      <option value="Normal & Balanced">Normal &amp; Balanced</option>
                      <option value="Oily & Congested">Oily &amp; Congested</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                      Primary Biological Concerns
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Barrier Resilience', 'Cellular Hydration', 'Redness & Flush Calm', 'Circadian Repair', 'Texture & Micro-Tone', 'Pore Architecture'].map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => handleToggleConcern(c)}
                          className={`px-3 py-1.5 rounded-full text-xs transition-colors border cursor-pointer ${
                            dossierConcerns.includes(c)
                              ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] border-transparent'
                              : 'bg-[#FAF8F5] dark:bg-[#1A1A1A] border-[#E5DFD5] dark:border-[#2A2A2A] text-[#121212] dark:text-[#F5F3EF]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                      Signature Olfactive Resonance
                    </label>
                    <select
                      value={dossierFragrance}
                      onChange={(e) => setDossierFragrance(e.target.value)}
                      className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-4 py-2.5 text-xs text-[#121212] dark:text-[#F5F3EF]"
                    >
                      <option value="Woody Amber & Smoked Resins">Woody Amber &amp; Smoked Resins</option>
                      <option value="Solar Citrus & Neroli Fleur">Solar Citrus &amp; Neroli Fleur</option>
                      <option value="Deep Incense & Atlas Cedar">Deep Incense &amp; Atlas Cedar</option>
                      <option value="Aquatic Sea Salt & Driftwood">Aquatic Sea Salt &amp; Driftwood</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Save Dossier Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-2xl border border-[#E5DFD5]/60 dark:border-[#262626] space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60">
                      Skin Behavior
                    </div>
                    <div className="text-sm font-semibold text-[#121212] dark:text-[#F5F3EF]">
                      {user.skinProfile.skinType}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-2xl border border-[#E5DFD5]/60 dark:border-[#262626] space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60">
                      Olfactive Profile
                    </div>
                    <div className="text-sm font-semibold text-[#121212] dark:text-[#F5F3EF]">
                      {user.skinProfile.fragranceFamily}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-2xl border border-[#E5DFD5]/60 dark:border-[#262626] space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60">
                      Primary Targets
                    </div>
                    <div className="text-xs text-[#121212] dark:text-[#F5F3EF] flex flex-wrap gap-1 pt-0.5">
                      {user.skinProfile.primaryConcerns.map((c, i) => (
                        <span key={i} className="text-[#B89B6C] dark:text-[#D4AF37] font-medium">
                          {c}{i < user.skinProfile.primaryConcerns.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Circadian AM / PM Recommended Protocol */}
              <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#222222] space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B6C] dark:text-[#D4AF37]">
                  Personal Circadian Protocols
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5]/60 dark:border-[#262626] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Morning Activation</span>
                      <span className="text-[#B89B6C] dark:text-[#D4AF37] font-mono">07:30</span>
                    </div>
                    <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                      {user.skinProfile.amProtocolPreference}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5]/60 dark:border-[#262626] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Evening Reconstitution</span>
                      <span className="text-[#B89B6C] dark:text-[#D4AF37] font-mono">22:00</span>
                    </div>
                    <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                      {user.skinProfile.pmProtocolPreference}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Dossier Side Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Atelier Consultation</span>
                </div>
                <h3 className="font-serif text-xl font-normal">
                  Private Dermal Advisory
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  As a {user.tier}, you have unlimited access to our in-house biochemist concierge. Request tailored ingredient adjustments or seasonal formula adaptations.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-[#D4AF37] hover:bg-[#C29D26] text-[#0C0C0C] py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Contact Formulator Concierge
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            5. TAB 3: SAVED ADDRESSES
           ========================================================================= */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                  Atelier Delivery Destinations
                </h2>
                <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                  Manage white-glove courier shipping locations and primary residences.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddressModal()}
                className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white dark:bg-[#141414] border rounded-3xl p-6 space-y-4 relative ${
                    addr.isDefault
                      ? 'border-[#B89B6C] dark:border-[#D4AF37] shadow-md shadow-[#B89B6C]/5'
                      : 'border-[#E5DFD5] dark:border-[#222222]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#121212] dark:text-[#F5F3EF]">
                      {addr.fullName}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#B89B6C]/10 dark:bg-[#D4AF37]/15 text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                        Default Residence
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light space-y-1">
                    <p>{addr.street}</p>
                    {addr.apartment && <p>{addr.apartment}</p>}
                    <p>{addr.city}, {addr.postalCode}</p>
                    <p>{addr.country}</p>
                    {addr.phone && <p className="font-mono pt-1 text-[11px]">{addr.phone}</p>}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#E5DFD5]/80 dark:border-[#222222] text-xs">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[#B89B6C] dark:text-[#D4AF37] hover:underline cursor-pointer"
                      >
                        Make Default
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenAddressModal(addr)}
                      className="text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white cursor-pointer ml-auto flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    {user.addresses.length > 1 && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            6. TAB 4: CURATED WISHLIST
           ========================================================================= */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                  Saved Atelier Formulations
                </h2>
                <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                  Formulations reserved for your next seasonal acquisition.
                </p>
              </div>

              {wishlistProducts.length > 0 && (
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="text-xs uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Open Wishlist Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-12 text-center space-y-4">
                <Heart className="w-10 h-10 mx-auto text-stone-400" />
                <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 max-w-sm mx-auto font-light leading-relaxed">
                  Explore our biomimetic lipid treatments and rare fragrances to save items for private consideration.
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="group cursor-pointer bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="aspect-square bg-stone-100 dark:bg-stone-900 relative">
                      <LuxuryImage
                        src={p.images[0]}
                        alt={p.name}
                        fallbackText={p.type}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#121212]/60 dark:text-[#F5F3EF]/60">
                          {p.category}
                        </div>
                        <h4 className="font-serif text-sm font-normal text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] transition-colors truncate">
                          {p.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-mono font-medium">${p.price.toLocaleString()}</span>
                        <span className="text-[#B89B6C] dark:text-[#D4AF37] text-[11px] uppercase tracking-wider">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            7. TAB 5: PREFERENCES & SECURITY
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#222222] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                Member Credentials &amp; Concierge Alerts
              </h2>
              <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                Manage your Maison profile identifiers and private alert preferences.
              </p>
            </div>

            {settingsSavedFeedback && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Preferences updated successfully.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settingsName}
                  onChange={(e) => setSettingsName(e.target.value)}
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-4 py-2.5 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                  Registered Email Address (Read-only)
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-[#FAF8F5]/50 dark:bg-[#191919] border border-[#E5DFD5] dark:border-[#282828] rounded-xl px-4 py-2.5 text-xs text-stone-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-2">
                  Concierge Contact Phone
                </label>
                <input
                  type="tel"
                  value={settingsPhone}
                  onChange={(e) => setSettingsPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-4 py-2.5 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#222222] space-y-3">
                <label className="flex items-center gap-2.5 text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={user.preferences.newsletter}
                    className="rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212]"
                  />
                  <span>Receive the Private Gazette (strictly restricted fragrance releases)</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={user.preferences.complimentarySamples}
                    className="rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212]"
                  />
                  <span>Include complimentary micro-vials with all dispatch deliveries</span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer mt-4"
              >
                Save Preferences
              </button>
            </form>
          </div>
        )}

      </div>

      {/* =========================================================================
          TRACKING DETAILS MODAL
         ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5] dark:border-[#222222]">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                  White-Glove Telemetry
                </div>
                <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                  Order {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-stone-400 hover:text-[#121212] dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-2xl border border-[#E5DFD5]/60 dark:border-[#262626] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Carrier</span>
                  <span className="font-medium text-[#121212] dark:text-[#F5F3EF]">{selectedOrder.carrier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Tracking ID</span>
                  <span className="font-mono text-[#B89B6C] dark:text-[#D4AF37]">{selectedOrder.trackingNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#121212]/60 dark:text-[#F5F3EF]/60">Status</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{selectedOrder.status}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-[#121212] dark:text-[#F5F3EF]">Cold-Chain Packaging Completed</div>
                    <div className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50">Atelier Clean Room Facility · Hand Inspected</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-[#121212] dark:text-[#F5F3EF]">Dispatched via Dedicated Courier</div>
                    <div className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50">In Transit to Regional Sorting Terminal</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${selectedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-600'}`} />
                  <div>
                    <div className="font-medium text-[#121212] dark:text-[#F5F3EF]">Delivered to Residence</div>
                    <div className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50">
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT ADDRESS MODAL
         ========================================================================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#141414] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#222222]">
              <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                {editingAddressId ? 'Edit Residence Destination' : 'Add New Delivery Destination'}
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-[#121212] dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="e.g. 742 Evergreen Promenade"
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                  Apartment, Suite, Villa (Optional)
                </label>
                <input
                  type="text"
                  value={addressForm.apartment}
                  onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                  placeholder="e.g. Penthouse 14B"
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#121212]/70 dark:text-[#F5F3EF]/70 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-3.5 py-2 text-xs text-[#121212] dark:text-[#F5F3EF]"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212]"
                />
                <span>Set as default residence destination</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
