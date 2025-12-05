'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product.id, 1);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 bg-gray-100 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              unoptimized
            />
            {discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                -{discount}%
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`absolute bottom-2 right-2 p-2 rounded-full shadow-lg transition ${
                product.stock > 0
                  ? addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {product.stock} in stock
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

