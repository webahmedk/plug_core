// app/admin/customers/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Address modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressMode, setAddressMode] = useState('add');
  const [currentAddress, setCurrentAddress] = useState({
    id: '',
    addressLine: '',
    landmark: '',
    pincode: '',
    areaId: '',
    isDefault: false,
  });
  const [addressFormError, setAddressFormError] = useState('');
  const [addressSaving, setAddressSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCustomer();
      fetchAreas();
    }
  }, [id]);

  async function fetchCustomer() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/customers/${id}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load customer (${res.status})`);
      }
      const data = await res.json();
      setCustomer(data);
      setAddresses(data.addresses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAreas() {
    try {
      const res = await fetch('/api/v1/areas');
      if (res.ok) {
        const data = await res.json();
        setAreas(data);
      } else {
        console.warn('Areas fetch failed');
      }
    } catch (err) {
      console.error('Areas fetch error:', err);
    }
  }

  const openAddAddress = () => {
    setAddressMode('add');
    setCurrentAddress({ id: '', addressLine: '', landmark: '', pincode: '', areaId: '', isDefault: false });
    setAddressFormError('');
    setIsModalOpen(true);
  };

  const openEditAddress = (addr) => {
    setAddressMode('edit');
    setCurrentAddress({
      id: addr.id,
      addressLine: addr.addressLine || '',
      landmark: addr.landmark || '',
      pincode: addr.pincode || '',
      areaId: addr.areaId || '',
      isDefault: addr.isDefault || false,
    });
    setAddressFormError('');
    setIsModalOpen(true);
  };

  async function handleAddressSubmit(e) {
    e.preventDefault();
    setAddressFormError('');
    setAddressSaving(true);

    const { addressLine, landmark, pincode, areaId, isDefault } = currentAddress;

    if (!addressLine.trim()) {
      setAddressFormError('Address line is required');
      setAddressSaving(false);
      return;
    }

    if (!areaId) {
      setAddressFormError('Please select an area');
      setAddressSaving(false);
      return;
    }

    try {
      const payload = {
        addressLine: addressLine.trim(),
        landmark: landmark.trim() || null,
        pincode: pincode.trim() || null,
        areaId,
        isDefault: !!isDefault,
      };

      let res;
      if (addressMode === 'add') {
        res = await fetch(`/api/v1/customers/${id}/addresses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/v1/customers/${id}/addresses/${currentAddress.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save address');
      }

      setIsModalOpen(false);
      fetchCustomer(); // refresh
    } catch (err) {
      setAddressFormError(err.message);
    } finally {
      setAddressSaving(false);
    }
  }

  async function handleDeleteAddress(addrId) {
    if (!window.confirm('Delete this address permanently?')) return;

    try {
      const res = await fetch(`/api/v1/customers/${id}/addresses/${addrId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Delete failed');
      }

      fetchCustomer();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Found</h2>
          <p className="text-gray-600 mb-6">Customer not found</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button & Title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            ← Back to Customers
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex-1">
            {customer.name}
          </h1>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="text-lg font-medium">{customer.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{customer.email || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Addresses</p>
              <p className="text-lg font-medium">{addresses.length}</p>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Addresses</h2>
            <button
              onClick={openAddAddress}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
            >
              + Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-2">No addresses added yet</p>
              <p className="text-gray-500">Click "+ Add New Address" to create one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded-xl p-6 relative ${
                    addr.isDefault ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
                  } transition-all`}
                >
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      DEFAULT
                    </span>
                  )}

                  <p className="font-medium text-gray-900 mb-2 text-lg">{addr.addressLine}</p>
                  {addr.landmark && (
                    <p className="text-sm text-gray-600 mb-1">Landmark: {addr.landmark}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-1">
                    Pincode: {addr.pincode || '—'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Area: {addr.area?.name || 'Unknown Area'}
                  </p>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => openEditAddress(addr)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {addressMode === 'add' ? 'Add New Address' : 'Edit Address'}
            </h2>

            {addressFormError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {addressFormError}
              </div>
            )}

            <form onSubmit={handleAddressSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Address Line *
                </label>
                <input
                  type="text"
                  value={currentAddress.addressLine}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, addressLine: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="House No 123, Street Name, Colony"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Landmark (optional)
                </label>
                <input
                  type="text"
                  value={currentAddress.landmark}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, landmark: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Near Park / Temple / School"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Pincode (optional)
                </label>
                <input
                  type="text"
                  value={currentAddress.pincode}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, pincode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="500034"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Area / Locality *
                </label>
                <select
                  value={currentAddress.areaId}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, areaId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} {area.pincode ? `(${area.pincode})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentAddress.isDefault}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, isDefault: e.target.checked })}
                    className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Set as default delivery address</span>
                </label>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                  disabled={addressSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addressSaving}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition font-medium ${
                    addressSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {addressSaving ? 'Saving...' : addressMode === 'add' ? 'Add Address' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}