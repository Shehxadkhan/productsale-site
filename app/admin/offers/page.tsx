'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { Offer } from '@/types';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Link from 'next/link';

export default function OffersManagement() {
  const offers = useStore((state) => state.offers);
  const addOffer = useStore((state) => state.addOffer);
  const updateOffer = useStore((state) => state.updateOffer);
  const deleteOffer = useStore((state) => state.deleteOffer);
  const addActivity = useStore((state) => state.addActivity);
  
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: '',
    description: '',
    discount: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      updateOffer(editingOffer.id, {
        ...formData,
        startDate: new Date(formData.startDate!).toISOString(),
        endDate: new Date(formData.endDate!).toISOString(),
      });
      addActivity({
        type: 'offer_created',
        description: `Offer updated: ${formData.title}`,
      });
    } else {
      const newOffer: Offer = {
        id: Date.now().toString(),
        title: formData.title!,
        description: formData.description!,
        discount: formData.discount!,
        startDate: new Date(formData.startDate!).toISOString(),
        endDate: new Date(formData.endDate!).toISOString(),
        active: formData.active || false,
      };
      addOffer(newOffer);
      addActivity({
        type: 'offer_created',
        description: `New offer created: ${newOffer.title}`,
      });
    }
    setShowModal(false);
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      discount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true,
    });
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      ...offer,
      startDate: new Date(offer.startDate).toISOString().split('T')[0],
      endDate: new Date(offer.endDate).toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the offer "${title}"?`)) {
      deleteOffer(id);
      addActivity({
        type: 'offer_created',
        description: `Offer deleted: ${title}`,
      });
    }
  };

  const toggleActive = (offer: Offer) => {
    updateOffer(offer.id, { active: !offer.active });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-blue-600 hover:underline mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Offers Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingOffer(null);
              setFormData({
                title: '',
                description: '',
                discount: 0,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                active: true,
              });
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Offer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {offer.discount}% OFF
                  </div>
                </div>
                <button
                  onClick={() => toggleActive(offer)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    offer.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {offer.active ? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <p>Start: {new Date(offer.startDate).toLocaleDateString()}</p>
                <p>End: {new Date(offer.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id, offer.title)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No offers created yet.</p>
            <p className="text-gray-400 text-sm mt-2">Click "Create Offer" to get started.</p>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingOffer ? 'Edit Offer' : 'Create New Offer'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active || false}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editingOffer ? 'Update' : 'Create'} Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

