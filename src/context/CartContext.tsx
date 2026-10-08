import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Shade } from '../types';

export const COMPLIMENTARY_SAMPLES = [
  { id: 's-noir', name: 'Noir 03 Eau de Parfum (2ml Discovery Flacon)', category: 'Fragrance' },
  { id: 's-solaris', name: 'Solaris Eau Fraîche (2ml Discovery Flacon)', category: 'Fragrance' },
  { id: 's-cloud', name: 'Cloud Barrier Cream (5ml Deluxe Vial)', category: 'Skincare' },
  { id: 's-cleanser', name: 'Botanical Cleansing Elixir (10ml Travel Flask)', category: 'Skincare' }
];

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, shade?: Shade, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  total: number;
  totalItemCount: number;
  selectedSamples: string[];
  toggleSample: (sampleId: string) => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  orderCompleted: {
    orderNumber: string;
    items: CartItem[];
    total: number;
    shippingAddress: {
      fullName: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
    };
  } | null;
  completeOrder: (shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  }) => void;
  resetOrderComplete: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('auren_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>(['s-noir']);
  const [orderCompleted, setOrderCompleted] = useState<any>(null);

  const freeShippingThreshold = 1499;

  useEffect(() => {
    try {
      localStorage.setItem('auren_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [items]);

  const addToCart = (product: Product, size: string, shade?: Shade, quantity: number = 1) => {
    // Find matching size price
    const sizeObj = product.sizes.find(s => s.size === size);
    const unitPrice = sizeObj ? sizeObj.price : product.price;
    const cartItemId = `${product.id}-${size}-${shade ? shade.id : 'noshade'}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === cartItemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          productId: product.id,
          product,
          size,
          shade,
          price: unitPrice,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleSample = (sampleId: string) => {
    setSelectedSamples(prev => {
      if (prev.includes(sampleId)) {
        return prev.filter(s => s !== sampleId);
      }
      if (prev.length >= 2) {
        return [prev[1], sampleId];
      }
      return [...prev, sampleId];
    });
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 150;
  const total = subtotal + shippingFee;
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const completeOrder = (shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  }) => {
    const generatedOrderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompleted({
      orderNumber: generatedOrderNumber,
      items: [...items],
      total,
      shippingAddress: shippingDetails
    });
    setItems([]);
    setIsCheckoutOpen(false);
  };

  const resetOrderComplete = () => {
    setOrderCompleted(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        freeShippingThreshold,
        shippingFee,
        total,
        totalItemCount,
        selectedSamples,
        toggleSample,
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        orderCompleted,
        completeOrder,
        resetOrderComplete
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
