'use client';

import { useStore } from '@/lib/store';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md text-lg font-bold">
                  -{discount}% OFF
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-sm text-gray-500">Category: </span>
                <span className="text-blue-600 font-semibold">{product.category}</span>
              </div>

              <div className="mb-6">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through mr-4">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-lg ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <div className="mb-4 flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(Math.max(1, Math.min(val, product.stock)));
                      }}
                      className="w-20 px-3 py-1 border border-gray-300 rounded text-center"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                  product.stock > 0
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

