import React, { useState, useEffect } from 'react';
import PaymentAccountsTab from '../components/common/PaymentAccountsTab';
import PricingAndFeesTab from '../components/common/PricingAndFeesTab';
import ContactDetailsTab from '../components/common/ContactDetailsTab';
import { getSystemSettings } from '../api/adminApi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const [settingsData, setSettingsData] = useState({
    paymentAccounts: [],
    feeConfig: {},
    contactDetails: {}
  });

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      const res = await getSystemSettings();
      
      const data = res?.settings || res || {};
      
      setSettingsData({
        paymentAccounts: data.paymentAccounts || [],
        feeConfig: data.feeConfig || {},
        contactDetails: data.contactDetails || {}
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching system settings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-xs font-semibold text-gray-500 animate-pulse">Loading settings from database...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">System Configuration</h1>
        <p className="text-xs text-gray-500 mt-0.5">Management of receiving accounts, pricing, and contact details.</p>
      </div>

      {toastMessage && (
        <div className="mb-4 p-3 bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2">
          <span>✓</span> {toastMessage}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-5 py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'accounts' ? 'border-[#0f3d2e] text-[#0f3d2e] bg-gray-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Payment Accounts ({(settingsData.paymentAccounts || []).length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'pricing' ? 'border-[#0f3d2e] text-[#0f3d2e] bg-gray-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Pricing & Subscription Plans
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-5 py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'contact' ? 'border-[#0f3d2e] text-[#0f3d2e] bg-gray-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Contact & Support Info
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'accounts' && (
            <PaymentAccountsTab 
              initialAccounts={settingsData.paymentAccounts} 
              onSaveSuccess={showToast} 
              refreshData={fetchSettingsData}
            />
          )}
          {activeTab === 'pricing' && (
            <PricingAndFeesTab 
              initialFeeConfig={settingsData.feeConfig} 
              onSaveSuccess={showToast} 
              refreshData={fetchSettingsData}
            />
          )}
          {activeTab === 'contact' && (
            <ContactDetailsTab 
              initialContact={settingsData.contactDetails} 
              onSaveSuccess={showToast} 
              refreshData={fetchSettingsData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;