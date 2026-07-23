import React, { useState, useEffect } from 'react';
import { updatePaymentAccounts } from '../../api/adminApi';

const PaymentAccountsTab = ({ initialAccounts, onSaveSuccess, refreshData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [accounts, setAccounts] = useState(initialAccounts || []);
  const [tempAccounts, setTempAccounts] = useState(initialAccounts || []);

  useEffect(() => {
    if (initialAccounts) {
      setAccounts(initialAccounts);
      setTempAccounts(initialAccounts);
    }
  }, [initialAccounts]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...tempAccounts];
    updated[index][field] = value;
    setTempAccounts(updated);
  };

  const toggleActive = (index) => {
    if (!isEditing) return;
    const updated = [...tempAccounts];
    updated[index].isActive = !updated[index].isActive;
    setTempAccounts(updated);
  };

  const handleAddAccount = () => {
    setTempAccounts([
      ...tempAccounts,
      { id: Date.now().toString(), bankName: '', accountTitle: '', accountNumber: '', isActive: true },
    ]);
  };

  const handleDeleteAccount = (index) => {
    setTempAccounts(tempAccounts.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setTempAccounts(accounts);
    setIsEditing(false);
  };

  const handleSaveToBackend = async () => {
    try {
      setIsSaving(true);
      await updatePaymentAccounts(tempAccounts);

      setAccounts(tempAccounts);
      setIsSaving(false);
      setIsEditing(false);
      if (onSaveSuccess) onSaveSuccess('Payment accounts updated successfully!');
      if (refreshData) refreshData();
    } catch (error) {
      console.error('Error updating payment accounts:', error);
      alert(error.response?.data?.message || 'Failed to update payment accounts');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800">Payment Receiving Accounts</h3>
          <p className="text-xs text-gray-500">Manage EasyPaisa, JazzCash, or Bank accounts shown to providers.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => { setTempAccounts(accounts); setIsEditing(true); }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              Edit Accounts
            </button>
          ) : (
            <>
              <button
                onClick={handleAddAccount}
                className="px-3 py-2 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                + Add Row
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveToBackend}
                disabled={isSaving}
                className="px-4 py-2 bg-[#0f3d2e] hover:bg-[#0b2e22] text-white text-xs font-bold rounded-lg cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Accounts'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {(tempAccounts || []).map((acc, index) => (
          <div
            key={acc._id || acc.id || index}
            className={`p-4 rounded-xl border transition-all ${
              acc.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-gray-600 uppercase">Account #{index + 1}</span>
              <div className="flex items-center gap-3">
                <label className={`flex items-center gap-2 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={acc.isActive}
                    onChange={() => toggleActive(index)}
                    className="w-4 h-4 accent-[#0f3d2e] rounded"
                  />
                  <span className="text-xs font-medium text-gray-600">{acc.isActive ? 'Active' : 'Inactive'}</span>
                </label>
                {isEditing && (
                  <button onClick={() => handleDeleteAccount(index)} className="text-xs text-red-500 hover:text-red-700 font-semibold">
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Bank / Method Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={acc.bankName || ''}
                  onChange={(e) => handleAccountChange(index, 'bankName', e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Account Title</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={acc.accountTitle || ''}
                  onChange={(e) => handleAccountChange(index, 'accountTitle', e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Account Number</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={acc.accountNumber || ''}
                  onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentAccountsTab;