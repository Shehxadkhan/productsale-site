'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ProductSale
          </h1>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            Your One Stop Shop for Everything
          </p>
          <p className="text-base mb-8 text-blue-50 max-w-2xl mx-auto">
            Discover amazing deals on sports shoes, mobiles, laptops, and accessories.
            Shop the latest trends at unbeatable prices.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

