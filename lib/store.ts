'use client';

import { create } from 'zustand';
import { Product, Offer, Activity, CartItem } from '@/types';

interface StoreState {
  products: Product[];
  offers: Offer[];
  activities: Activity[];
  cart: CartItem[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItems: () => Array<{ product: Product; quantity: number }>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

// Initial sample data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    description: 'Premium sports shoes with air cushioning',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Sports Shoes',
    stock: 50,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    price: 999.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    category: 'Mobiles',
    stock: 30,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop for professionals',
    price: 2499.99,
    originalPrice: 2799.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    category: 'Laptops',
    stock: 20,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Gaming Headphones Pro',
    description: 'High-quality gaming headphones with surround sound',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Mobile Accessories',
    stock: 100,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Wireless Handsfree',
    description: 'Bluetooth handsfree with noise cancellation',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    category: 'Mobile Accessories',
    stock: 150,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

const initialOffers: Offer[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Up to 30% off on all products',
    discount: 30,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    active: true,
  },
];

const initialActivities: Activity[] = [
  {
    id: '1',
    type: 'product_added',
    description: 'New product added: Nike Air Max 270',
    timestamp: new Date().toISOString(),
  },
];

export const useStore = create<StoreState>((set, get) => ({
  products: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('products') || JSON.stringify(initialProducts))
    : initialProducts,
  offers: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('offers') || JSON.stringify(initialOffers))
    : initialOffers,
  activities: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('activities') || JSON.stringify(initialActivities))
    : initialActivities,
  cart: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [],
  
  addProduct: (product) => {
    set((state) => {
      const newProducts = [...state.products, product];
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(newProducts));
      }
      return { products: newProducts };
    });
  },
  
  updateProduct: (id, updates) => {
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(newProducts));
      }
      return { products: newProducts };
    });
  },
  
  deleteProduct: (id) => {
    set((state) => {
      const newProducts = state.products.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(newProducts));
      }
      return { products: newProducts };
    });
  },
  
  addOffer: (offer) => {
    set((state) => {
      const newOffers = [...state.offers, offer];
      if (typeof window !== 'undefined') {
        localStorage.setItem('offers', JSON.stringify(newOffers));
      }
      return { offers: newOffers };
    });
  },
  
  updateOffer: (id, updates) => {
    set((state) => {
      const newOffers = state.offers.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('offers', JSON.stringify(newOffers));
      }
      return { offers: newOffers };
    });
  },
  
  deleteOffer: (id) => {
    set((state) => {
      const newOffers = state.offers.filter((o) => o.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('offers', JSON.stringify(newOffers));
      }
      return { offers: newOffers };
    });
  },
  
  addActivity: (activity) => {
    set((state) => {
      const newActivity: Activity = {
        ...activity,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      const newActivities = [newActivity, ...state.activities].slice(0, 100);
      if (typeof window !== 'undefined') {
        localStorage.setItem('activities', JSON.stringify(newActivities));
      }
      return { activities: newActivities };
    });
  },

  addToCart: (productId, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.productId === productId);
      let newCart: CartItem[];
      
      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { productId, quantity }];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.productId !== productId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
  },

  updateCartQuantity: (productId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const newCart = state.cart.filter((item) => item.productId !== productId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(newCart));
        }
        return { cart: newCart };
      }
      
      const newCart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
  },

  clearCart: () => {
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', '[]');
      }
      return { cart: [] };
    });
  },

  getCartItems: () => {
    const state = get();
    return state.cart.map((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    }).filter((item): item is { product: Product; quantity: number } => item !== null);
  },

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  getCartItemCount: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
}));

