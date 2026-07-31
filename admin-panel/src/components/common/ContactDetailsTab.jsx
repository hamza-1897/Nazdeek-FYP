import React, { useState, useEffect } from 'react';
import { updateContactDetails } from '../../api/adminApi';

const ContactDetailsTab = ({ initialContact, onSaveSuccess, refreshData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contactData, setContactData] = useState(initialContact || {});

  useEffect(() => {
    if (initialContact) setContactData(initialContact);
  }, [initialContact]);

  const handleChange = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateContactDetails(contactData);
      
      setIsSaving(false);
      setIsEditing(false);
      if (onSaveSuccess) onSaveSuccess('Contact details successfully updated!');
      if (refreshData) refreshData(); 
    } catch (error) {
      console.error('Error updating contact details:', error);
      alert(error.response?.data?.message || 'Failed to update contact details');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-gray-800">Support & Contact Information</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg">
            Edit Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 bg-gray-200 text-xs font-semibold rounded-lg">
              Cancel
            </button>
            <button onClick={handleSave} disabled={isSaving} className="px-3 py-1.5 bg-[#0f3d2e] text-white text-xs font-semibold rounded-lg">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-600">Support Phone</label>
          <input
            type="text"
            disabled={!isEditing}
            value={contactData.supportPhone || ''}
            onChange={(e) => handleChange('supportPhone', e.target.value)}
            className="w-full text-xs p-2 border rounded-lg mt-1 disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">WhatsApp Support</label>
          <input
            type="text"
            disabled={!isEditing}
            value={contactData.supportWhatsapp || ''}
            onChange={(e) => handleChange('supportWhatsapp', e.target.value)}
            className="w-full text-xs p-2 border rounded-lg mt-1 disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Support Email</label>
          <input
            type="email"
            disabled={!isEditing}
            value={contactData.supportEmail || ''}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            className="w-full text-xs p-2 border rounded-lg mt-1 disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Office Address</label>
          <input
            type="text"
            disabled={!isEditing}
            value={contactData.officeAddress || ''}
            onChange={(e) => handleChange('officeAddress', e.target.value)}
            className="w-full text-xs p-2 border rounded-lg mt-1 disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsTab;