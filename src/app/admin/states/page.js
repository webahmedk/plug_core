// app/states/page.js
'use client';

import { useState, useEffect } from 'react';

export default function StatesPage() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentState, setCurrentState] = useState({ id: '', name: '', code: '' });
  const [formError, setFormError] = useState('');

  // Fetch states
  useEffect(() => {
    fetchStates();
  }, []);

  async function fetchStates() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/states');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to load states (${res.status})`);
      }
      const data = await res.json();
      setStates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Open modal for Add
  const openAddModal = () => {
    setModalMode('add');
    setCurrentState({ id: '', name: '', code: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (state) => {
    setModalMode('edit');
    setCurrentState({
      id: state.id,
      name: state.name || '',
      code: state.code || '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle form submit (Add or Edit)
  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const { name, code, id } = currentState;

    if (!name.trim() || name.trim().length < 2) {
      setFormError('State name must be at least 2 characters');
      return;
    }

    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode || trimmedCode.length !== 2 || !/^[A-Z]{2}$/.test(trimmedCode)) {
      setFormError('State code must be exactly 2 uppercase letters (e.g. TS, AP)');
      return;
    }

    // Safety check for edit mode
    if (modalMode === 'edit' && !id) {
      setFormError('Cannot update: State ID is missing');
      return;
    }

    try {
      let res;
      const payload = { name: name.trim(), code: trimmedCode };

      if (modalMode === 'add') {
        res = await fetch('/api/v1/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/v1/states/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Operation failed');
      }

      setIsModalOpen(false);
      fetchStates(); // refresh list
    } catch (err) {
      setFormError(err.message);
    }
  }

  // Handle delete
  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/states/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Delete failed');
      }

      fetchStates(); // refresh
      alert(`"${name}" deleted successfully`);
    } catch (err) {
      alert(`Error deleting state: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading states...</p>
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
            onClick={fetchStates}
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">States Management</h1>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
          >
            + Add New State
          </button>
        </div>

        {/* Table */}
        {states.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-3">No states found</h3>
            <p className="text-gray-500">Add your first state to get started.</p>
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
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {states.map((state) => (
                    <tr key={state.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{state.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {state.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(state)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(state.id, state.name)}
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {modalMode === 'add' ? 'Add New State' : 'Edit State'}
              </h2>

              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    State Name *
                  </label>
                  <input
                    type="text"
                    value={currentState.name}
                    onChange={(e) => setCurrentState({ ...currentState, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g. Karnataka"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">
                    State Code (2 uppercase letters) *
                  </label>
                  <input
                    type="text"
                    value={currentState.code}
                    onChange={(e) =>
                      setCurrentState({ ...currentState, code: e.target.value.toUpperCase() })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase transition"
                    placeholder="e.g. KA"
                    maxLength={2}
                    required
                  />
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
                    disabled={modalMode === 'edit' && !currentState.id}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition font-medium ${
                      modalMode === 'edit' && !currentState.id
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700'
                    }`}
                  >
                    {modalMode === 'add' ? 'Add State' : 'Save Changes'}
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