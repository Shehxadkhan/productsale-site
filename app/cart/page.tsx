'use client';

import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = useStore((state) => state.getCartItems());
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const cartTotal = useStore((state) => state.getCartTotal());
  const cartItemCount = useStore((state) => state.getCartItemCount());

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <div className="relative h-32 w-32 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.stock < 10 && (
                      <p className="text-sm text-orange-600 mt-1">
                        Only {product.stock} left in stock
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-600 hover:text-red-800 transition flex items-center"
                    >
                      <Trash2 className="h-5 w-5 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-lg shadow-md p-6">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cartItemCount})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition mb-4"
                >
                  Proceed to Checkout
                </button>
                <Link
                  href="/products"
                  className="block w-full text-center text-blue-600 hover:text-blue-800 transition font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

