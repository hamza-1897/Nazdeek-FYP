import React, { useState } from 'react';

const PricingAndFeesTab = ({ initialFeeConfig }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feeConfig, setFeeConfig] = useState(initialFeeConfig);
  const [tempConfig, setTempConfig] = useState(initialFeeConfig);

  const handleChange = (field, value) => {
    setTempConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setTempConfig(feeConfig);
    setIsEditing(false);
  };

  const handleSaveToBackend = async () => {
    setIsSaving(true);
    const payload = { feeConfig: tempConfig };

    console.log('📡 API CALL: PUT /api/admin/settings/pricing -> Payload:', payload);

    setTimeout(() => {
      setFeeConfig(tempConfig);
      setIsSaving(false);
      setIsEditing(false);
      alert('✓ Pricing & Subscription details saved to DB!');
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800">Registration & Subscription Pricing</h3>
          <p className="text-xs text-gray-500">Manage 1-time onboarding fee, promo switch, and premium monthly plans.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => { setTempConfig(feeConfig); setIsEditing(true); }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
               Edit Pricing
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="px-3 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleSaveToBackend}
                disabled={isSaving}
                className="px-4 py-2 bg-[#0f3d2e] hover:bg-[#0b2e22] text-white text-xs font-bold rounded-lg cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : ' Save Pricing'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-gray-800">Free Registration Promo Mode</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">If ON, providers bypass 1-time registration fee.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              disabled={!isEditing}
              checked={tempConfig.isRegistrationFree}
              onChange={(e) => handleChange('isRegistrationFree', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0f3d2e]"></div>
          </label>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <label className="block text-xs font-bold text-gray-700 mb-1">Standard 1-Time Registration Fee (PKR)</label>
          <input
            type="number"
            disabled={!isEditing || tempConfig.isRegistrationFree}
            value={tempConfig.registrationFeeAmount}
            onChange={(e) => handleChange('registrationFeeAmount', Number(e.target.value))}
            className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
        <h4 className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-2">
          ⭐ Premium Featured Subscription Plans
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Monthly Premium Plan (PKR)</label>
            <input
              type="number"
              disabled={!isEditing}
              value={tempConfig.monthlyPremiumPrice}
              onChange={(e) => handleChange('monthlyPremiumPrice', Number(e.target.value))}
              className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Quarterly Premium Plan (PKR / 3 Months)</label>
            <input
              type="number"
              disabled={!isEditing}
              value={tempConfig.quarterlyPremiumPrice}
              onChange={(e) => handleChange('quarterlyPremiumPrice', Number(e.target.value))}
              className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Yearly Premium Plan (PKR / 1 Year)</label>
            <input
              type="number"
              disabled={!isEditing}
              value={tempConfig.yearlyPremiumPrice}
              onChange={(e) => handleChange('yearlyPremiumPrice', Number(e.target.value))}
              className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingAndFeesTab;