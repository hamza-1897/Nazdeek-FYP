import React, { useState } from 'react';
import PaymentAccountsTab from '../components/common/PaymentAccountsTab';
import PricingAndFeesTab from '../components/common/PricingAndFeesTab';
import ContactDetailsTab from '../components/common/ContactDetailsTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  const dummyAccounts = [
    { id: '1', bankName: 'EasyPaisa', accountTitle: 'Nazdeek Admin', accountNumber: '03001234567', isActive: true },
    { id: '2', bankName: 'JazzCash', accountTitle: 'Nazdeek Official', accountNumber: '03019876543', isActive: true },
  ];

  const dummyPricing = {
    registrationFeeAmount: 1000,
    isRegistrationFree: false,
    monthlyPremiumPrice: 1500,
    quarterlyPremiumPrice: 3800,
    yearlyPremiumPrice: 12000,
  };

  const dummyContact = {
    supportPhone: '+92 300 1234567',
    supportWhatsapp: '+92 300 1234567',
    supportEmail: 'support@nazdeek.com',
    officeAddress: 'Main Commercial Area, Mandi Bahauddin',
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">System Configuration</h1>
        <p className="text-xs text-gray-500 mt-0.5">Independent management of receiving accounts, pricing, and contact details.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-5 py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'accounts' ? 'border-[#0f3d2e] text-[#0f3d2e] bg-gray-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
             Payment Accounts
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
          {activeTab === 'accounts' && <PaymentAccountsTab initialAccounts={dummyAccounts} />}
          {activeTab === 'pricing' && <PricingAndFeesTab initialFeeConfig={dummyPricing} />}
          {activeTab === 'contact' && <ContactDetailsTab initialContact={dummyContact} />}
        </div>
      </div>
    </div>
  );
};

export default Settings;