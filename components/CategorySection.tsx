'use client';

import Link from 'next/link';
import { Smartphone, Laptop, Headphones, Footprints } from 'lucide-react';

const categories = [
  { name: 'Sports Shoes', icon: Footprints, href: '/products?category=Sports Shoes', color: 'bg-orange-500' },
  { name: 'Mobiles', icon: Smartphone, href: '/products?category=Mobiles', color: 'bg-blue-500' },
  { name: 'Laptops', icon: Laptop, href: '/products?category=Laptops', color: 'bg-purple-500' },
  { name: 'Accessories', icon: Headphones, href: '/products?category=Mobile Accessories', color: 'bg-green-500' },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

