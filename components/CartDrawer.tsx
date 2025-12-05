'use client';

import { useStore } from '@/lib/store';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cartItems = useStore((state) => state.getCartItems());
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cartTotal = useStore((state) => state.getCartTotal());

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2" />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Start adding products to your cart!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1 rounded hover:bg-gray-200 transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-1 rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-bold text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="mt-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

