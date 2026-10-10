import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserAddress, UserOrder } from '../types';
import { NOIR_FRAGRANCE_IMAGE, CLOUD_BARRIER_IMAGE, SKIN_TINT_IMAGE, GROOMING_SERUM_IMAGE } from '../data/products';

interface SignupData {
  name: string;
  email: string;
  password?: string;
  skinType?: string;
  concerns?: string[];
  fragranceFamily?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  orders: UserOrder[];
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSkinProfile: (skinUpdates: Partial<UserProfile['skinProfile']>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  updateAddress: (id: string, address: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (orderData: Partial<UserOrder>) => UserOrder;
}

const DEMO_USER: UserProfile = {
  id: 'usr_auren_001',
  name: 'Ariadne Vance',
  email: 'ariadne.vance@auren-atelier.com',
  phone: '+1 (212) 849-3012',
  joinedDate: 'October 2024',
  tier: 'Noir Connoisseur',
  tierPoints: 2450,
  avatarInitials: 'AV',
  skinProfile: {
    skinType: 'Combination / Sensitive',
    primaryConcerns: ['Barrier Resilience', 'Circadian Repair', 'Radiance Balance'],
    fragranceFamily: 'Woody Amber & Smoked Resins',
    amProtocolPreference: 'Cloud Barrier Cream + Soft Focus Skin Tint',
    pmProtocolPreference: 'Botanical Cleansing Elixir + Peptide Recovery Sleep Mask'
  },
  addresses: [
    {
      id: 'addr_1',
      isDefault: true,
      fullName: 'Ariadne Vance',
      street: '742 Evergreen Promenade, Suite 14B',
      apartment: 'Penthouse 14B',
      city: 'New York',
      postalCode: '10012',
      country: 'United States',
      phone: '+1 (212) 849-3012'
    },
    {
      id: 'addr_2',
      isDefault: false,
      fullName: 'Ariadne Vance',
      street: '18 Cap d\'Antibes Boulevard',
      apartment: 'Villa Solaris',
      city: 'Antibes',
      postalCode: '06600',
      country: 'France',
      phone: '+33 4 93 61 00 22'
    }
  ],
  preferences: {
    newsletter: true,
    smsNotifications: false,
    privateHarvestAlerts: true,
    complimentarySamples: true
  }
};

const DEMO_ORDERS: UserOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'AUR-89421-EXP',
    date: 'Yesterday, 14:32',
    status: 'In Transit',
    trackingNumber: 'AUR-NY-98124901-TRK',
    carrier: 'Atelier White-Glove Courier',
    items: [
      {
        productId: 'auren-02',
        productName: 'Noir 03 Eau de Parfum',
        subtitle: 'Florentine Orris & Smoked Cedar',
        image: NOIR_FRAGRANCE_IMAGE,
        size: '50 ml Flacon',
        quantity: 1,
        price: 3690
      },
      {
        productId: 'auren-01',
        productName: 'Cloud Barrier Cream',
        subtitle: 'Ceramide Tri-Complex 3:1:1',
        image: CLOUD_BARRIER_IMAGE,
        size: '50 ml',
        quantity: 1,
        price: 1890
      }
    ],
    subtotal: 5580,
    shipping: 0,
    total: 5580,
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'Amex Platinum (•••• 9021)'
  },
  {
    id: 'ord_2',
    orderNumber: 'AUR-76190-ARCH',
    date: 'September 18, 2024',
    status: 'Delivered',
    trackingNumber: 'AUR-DL-77291044-DEL',
    carrier: 'DHL Express Climate Neutral',
    items: [
      {
        productId: 'auren-03',
        productName: 'Soft Focus Skin Tint',
        subtitle: 'Luminous Micro-Pigment Fluid',
        image: SKIN_TINT_IMAGE,
        size: '30 ml Dropper',
        shade: '02 Sand Bisque',
        quantity: 1,
        price: 2190
      },
      {
        productId: 'auren-05',
        productName: 'Cypress & Vetiver Shave Serum',
        subtitle: 'Ultra-Glide Barrier Cushion',
        image: GROOMING_SERUM_IMAGE,
        size: '100 ml Pump',
        quantity: 1,
        price: 1650
      }
    ],
    subtotal: 3840,
    shipping: 0,
    total: 3840,
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'Apple Pay'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('auren_user');
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<UserOrder[]>(() => {
    try {
      const stored = localStorage.getItem('auren_orders');
      if (stored) {
        return JSON.parse(stored);
      }
      return DEMO_ORDERS;
    } catch {
      return DEMO_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('auren_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('auren_user');
      }
    } catch (e) {
      console.error('Failed to sync user storage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('auren_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders storage', e);
    }
  }, [orders]);

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate luxury verification latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid atelier email address.' };
    }

    // If matches demo or any email, log them in or restore demo
    if (email.toLowerCase().includes('ariadne') || email.toLowerCase().includes('demo')) {
      setUser(DEMO_USER);
      return { success: true };
    }

    // Otherwise create or sign in with that custom email
    const initials = email
      .split('@')[0]
      .split(/[._-]/)
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || 'AU';

    const customName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const loggedInUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: customName,
      email: email,
      joinedDate: 'Today',
      tier: 'Cellular Member',
      tierPoints: 350,
      avatarInitials: initials,
      skinProfile: {
        skinType: 'Balanced',
        primaryConcerns: ['Cellular Protection', 'Barrier Radiance'],
        fragranceFamily: 'Woody Amber',
        amProtocolPreference: 'Cloud Barrier Cream',
        pmProtocolPreference: 'Botanical Cleansing Elixir'
      },
      addresses: DEMO_USER.addresses,
      preferences: {
        newsletter: true,
        smsNotifications: false,
        privateHarvestAlerts: true,
        complimentarySamples: true
      }
    };

    setUser(loggedInUser);
    return { success: true };
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!data.name || data.name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!data.email || !data.email.includes('@')) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    const initials = data.name
      .trim()
      .split(' ')
      .map(p => p[0]?.toUpperCase())
      .filter(Boolean)
      .join('')
      .slice(0, 2) || 'AU';

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      joinedDate: 'Today',
      tier: 'Atelier Collector',
      tierPoints: 500, // Welcome gift points
      avatarInitials: initials,
      skinProfile: {
        skinType: data.skinType || 'Balanced',
        primaryConcerns: data.concerns && data.concerns.length > 0 ? data.concerns : ['Cellular Hydration'],
        fragranceFamily: data.fragranceFamily || 'Woody Amber & Botanicals',
        amProtocolPreference: 'Cloud Barrier Cream',
        pmProtocolPreference: 'Botanical Cleansing Elixir'
      },
      addresses: [],
      preferences: {
        newsletter: true,
        smsNotifications: false,
        privateHarvestAlerts: true,
        complimentarySamples: true
      }
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const updateSkinProfile = (skinUpdates: Partial<UserProfile['skinProfile']>) => {
    if (!user) return;
    setUser({
      ...user,
      skinProfile: {
        ...user.skinProfile,
        ...skinUpdates
      }
    });
  };

  const addAddress = (addressData: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddress: UserAddress = {
      ...addressData,
      id: `addr_${Date.now()}`
    };

    let updatedList = [...user.addresses];
    if (newAddress.isDefault) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
    } else if (updatedList.length === 0) {
      newAddress.isDefault = true;
    }
    updatedList.push(newAddress);

    setUser({
      ...user,
      addresses: updatedList
    });
  };

  const updateAddress = (id: string, addressUpdates: Partial<UserAddress>) => {
    if (!user) return;
    let updatedList = user.addresses.map(a => {
      if (a.id === id) {
        return { ...a, ...addressUpdates };
      }
      return addressUpdates.isDefault ? { ...a, isDefault: false } : a;
    });

    setUser({ ...user, addresses: updatedList });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const remaining = user.addresses.filter(a => a.id !== id);
    if (remaining.length > 0 && !remaining.some(a => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    setUser({ ...user, addresses: remaining });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setUser({ ...user, addresses: updated });
  };

  const addOrder = (orderData: Partial<UserOrder>): UserOrder => {
    const newOrder: UserOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `AUR-${Math.floor(10000 + Math.random() * 90000)}-ATM`,
      date: 'Just now',
      status: 'Processing',
      trackingNumber: `AUR-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'Atelier White-Glove Courier',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      shipping: orderData.shipping || 0,
      total: orderData.total || 0,
      shippingAddress: orderData.shippingAddress || (user?.addresses[0] || DEMO_USER.addresses[0]),
      paymentMethod: orderData.paymentMethod || 'Atelier Vault Checkout'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Give loyalty reward points if user is logged in
    if (user) {
      const addedPoints = Math.round(newOrder.total * 0.1);
      setUser(u => u ? { ...u, tierPoints: u.tierPoints + addedPoints } : null);
    }

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        signup,
        logout,
        updateProfile,
        updateSkinProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
