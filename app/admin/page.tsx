'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { Package, Tag, Activity, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const products = useStore((state) => state.products);
  const offers = useStore((state) => state.offers);
  const activities = useStore((state) => state.activities);

  const stats = [
    { name: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { name: 'Active Offers', value: offers.filter((o) => o.active).length, icon: Tag, color: 'bg-green-500' },
    { name: 'Recent Activities', value: activities.length, icon: Activity, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products, offers, and monitor activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-4">Manage your product catalog</p>
            <div className="flex items-center text-blue-600 font-semibold">
              View Products <Plus className="ml-2 h-5 w-5" />
            </div>
          </Link>

          <Link
            href="/admin/offers"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Offers</h2>
              <Tag className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600 mb-4">Create and manage sales offers</p>
            <div className="flex items-center text-green-600 font-semibold">
              Manage Offers <Plus className="ml-2 h-5 w-5" />
            </div>
          </Link>

          <Link
            href="/admin/activities"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Activities</h2>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-gray-600 mb-4">View system activities and logs</p>
            <div className="flex items-center text-purple-600 font-semibold">
              View Activities <Plus className="ml-2 h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

