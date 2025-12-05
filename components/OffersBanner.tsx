'use client';

import { useStore } from '@/lib/store';
import { Tag } from 'lucide-react';

export default function OffersBanner() {
  const offers = useStore((state) => state.offers);
  const activeOffers = offers.filter((o) => o.active);

  if (activeOffers.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4">
          <Tag className="h-6 w-6" />
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              Special Offers Available!
            </h3>
            {activeOffers.map((offer) => (
              <p key={offer.id} className="text-lg">
                {offer.title}: {offer.description} - {offer.discount}% OFF
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

