'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = useStore((state) => state.getCartItemCount());

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ProductSale</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition">
              Admin
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gray-700 hover:text-blue-600 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Products
            </Link>
            <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Admin
            </Link>
            <button
              onClick={() => {
                setCartOpen(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}

