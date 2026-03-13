// app/cities/page.js
'use client';

import { useState, useEffect } from 'react';

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]); // for dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentCity, setCurrentCity] = useState({ id: '', name: '', stateId: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [citiesRes, statesRes] = await Promise.all([
        fetch('/api/v1/cities'),
        fetch('/api/v1/states'),
      ]);

      if (!citiesRes.ok) throw new Error('Failed to load cities');
      if (!statesRes.ok) throw new Error('Failed to load states');

      const citiesData = await citiesRes.json();
      const statesData = await statesRes.json();

      setCities(citiesData);
      setStates(statesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode('add');
    setCurrentCity({ id: '', name: '', stateId: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (city) => {
    setModalMode('edit');
    setCurrentCity({
      id: city.id,
      name: city.name || '',
      stateId: city.state?.id || '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const { name, stateId, id } = currentCity;

    if (!name.trim() || name.trim().length < 2) {
      setFormError('City name must be at least 2 characters');
      return;
    }

    if (!stateId) {
      setFormError('Please select a state');
      return;
    }

    if (modalMode === 'edit' && !id) {
      setFormError('City ID is missing for update');
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        stateId,
      };

      let res;
      if (modalMode === 'add') {
        res = await fetch('/api/v1/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/v1/cities/${id}`, {
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
      fetchData(); // refresh everything
    } catch (err) {
      setFormError(err.message);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete city "${name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/v1/cities/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Delete failed');
      }

      fetchData();
      alert(`"${name}" deleted successfully`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading cities...</p>
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
            onClick={fetchData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Cities Management</h1>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
          >
            + Add New City
          </button>
        </div>

        {/* Table */}
        {cities.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-3">No cities found</h3>
            <p className="text-gray-500">Add your first city or seed data.</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cities.map((city) => (
                    <tr key={city.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{city.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {city.state?.name || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {city.state?.code ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {city.state.code}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(city)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(city.id, city.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {modalMode === 'add' ? 'Add New City' : 'Edit City'}
              </h2>

              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    City Name *
                  </label>
                  <input
                    type="text"
                    value={currentCity.name}
                    onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g. Hyderabad"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">
                    State *
                  </label>
                  <select
                    value={currentCity.stateId}
                    onChange={(e) => setCurrentCity({ ...currentCity, stateId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name} ({state.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalMode === 'edit' && !currentCity.id}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition font-medium ${
                      modalMode === 'edit' && !currentCity.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {modalMode === 'add' ? 'Add City' : 'Save Changes'}
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