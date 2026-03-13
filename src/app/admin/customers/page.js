// app/customers/page.js    (or app/admin/customers/page.js — depending on your structure)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Modal state for add/edit customer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentCustomer, setCurrentCustomer] = useState({
    id: '',
    name: '',
    mobile: '',
    email: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/customers');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to load customers (${res.status})`);
      }
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode('add');
    setCurrentCustomer({ id: '', name: '', mobile: '', email: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (customer) => {
    setModalMode('edit');
    setCurrentCustomer({
      id: customer.id,
      name: customer.name || '',
      mobile: customer.mobile || '',
      email: customer.email || '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Navigate to customer detail page
  const viewCustomerDetails = (customerId) => {
    router.push(`/admin/customers/${customerId}`);
    // If your detail page is not under /admin, change to:
    // router.push(`/customers/${customerId}`);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const { name, mobile, email, id } = currentCustomer;

    if (!name.trim() || name.trim().length < 2) {
      setFormError('Name must be at least 2 characters');
      return;
    }

    if (!mobile.trim() || mobile.trim().length < 10) {
      setFormError('Valid mobile number is required (min 10 digits)');
      return;
    }

    if (modalMode === 'edit' && !id) {
      setFormError('Customer ID is missing');
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email ? email.trim() : null,
      };

      let res;
      if (modalMode === 'add') {
        res = await fetch('/api/v1/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/v1/customers/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Operation failed');
      }

      setIsModalOpen(false);
      fetchCustomers(); // refresh list
    } catch (err) {
      setFormError(err.message);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete customer "${name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/v1/customers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Delete failed');
      }

      fetchCustomers();
    } catch (err) {
      alert(`Error deleting customer: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={fetchCustomers}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          + Add New Customer
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-3">No customers found</h3>
          <p className="text-gray-500">Add your first customer to get started.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((cust) => (
                  <tr 
                    key={cust.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/admin/customers/${cust.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600 hover:underline">
                        {cust.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cust.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cust.email || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* Prevent row click when clicking buttons */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(cust);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(cust.id, cust.name);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {modalMode === 'add' ? 'Add New Customer' : 'Edit Customer'}
            </h2>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={currentCustomer.name}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. Ravi Kumar"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={currentCustomer.mobile}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={currentCustomer.email}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. ravi@example.com"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {modalMode === 'add' ? 'Add Customer' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}