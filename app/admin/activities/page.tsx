'use client';

import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { Activity as ActivityIcon, Package, Tag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function ActivitiesPage() {
  const activities = useStore((state) => state.activities);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'product_added':
      case 'product_updated':
        return Package;
      case 'offer_created':
        return Tag;
      case 'order_placed':
        return ShoppingCart;
      default:
        return ActivityIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'product_added':
        return 'bg-blue-100 text-blue-800';
      case 'product_updated':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer_created':
        return 'bg-green-100 text-green-800';
      case 'order_placed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-2">Monitor all system activities and changes</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activities ({activities.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {activities.length === 0 ? (
              <div className="p-12 text-center">
                <ActivityIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No activities yet.</p>
              </div>
            ) : (
              activities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900 font-medium">{activity.description}</p>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${getActivityColor(activity.type)}`}>
                          {activity.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

