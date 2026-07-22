import React, { useState } from 'react';

const ContactDetailsTab = ({ initialContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contact, setContact] = useState(initialContact);
  const [tempContact, setTempContact] = useState(initialContact);

  const handleChange = (field, value) => {
    setTempContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setTempContact(contact);
    setIsEditing(false);
  };

  const handleSaveToBackend = async () => {
    setIsSaving(true);
    const payload = { contactDetails: tempContact };

    console.log('📡 API CALL: PUT /api/admin/settings/contact -> Payload:', payload);

    setTimeout(() => {
      setContact(tempContact);
      setIsSaving(false);
      setIsEditing(false);
      alert('Contact & Support info updated in DB!');
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800">Support & Contact Information</h3>
          <p className="text-xs text-gray-500">Public contact info shown on mobile apps.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => { setTempContact(contact); setIsEditing(true); }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              Edit Contacts
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
                {isSaving ? 'Saving...' : ' Save Contacts'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Support Phone Number</label>
          <input
            type="text"
            disabled={!isEditing}
            value={tempContact.supportPhone}
            onChange={(e) => handleChange('supportPhone', e.target.value)}
            className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Support WhatsApp Number</label>
          <input
            type="text"
            disabled={!isEditing}
            value={tempContact.supportWhatsapp}
            onChange={(e) => handleChange('supportWhatsapp', e.target.value)}
            className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Support Email Address</label>
          <input
            type="email"
            disabled={!isEditing}
            value={tempContact.supportEmail}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

       

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Office Address</label>
          <textarea
            rows="2"
            disabled={!isEditing}
            value={tempContact.officeAddress}
            onChange={(e) => handleChange('officeAddress', e.target.value)}
            className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-[#0f3d2e] disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsTab;