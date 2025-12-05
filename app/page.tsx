import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OffersBanner from '@/components/OffersBanner';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OffersBanner />
      <CategorySection />
      <FeaturedProducts />
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 ProductSale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

