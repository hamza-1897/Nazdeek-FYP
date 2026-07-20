import React from 'react';

const VerificationTab = ({ provider, onApprove, onBlock }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">Personal & Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Full Name</p>
            <p className="font-semibold text-gray-700">{provider?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Email Address</p>
            <p className="font-semibold text-gray-700">{provider?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Phone Number</p>
            <p className="font-semibold text-gray-700">{provider?.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">CNIC Number</p>
            <p className="font-semibold text-gray-700">{provider?.cnicNumber || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">Verification Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">CNIC Front & Back</p>
            <div className="flex gap-2">
              <img 
                src={provider?.cnicFront || 'https://via.placeholder.com/150'} 
                alt="CNIC Front" 
                className="w-1/2 h-32 object-cover rounded-lg border"
              />
              <img 
                src={provider?.cnicBack || 'https://via.placeholder.com/150'} 
                alt="CNIC Back" 
                className="w-1/2 h-32 object-cover rounded-lg border"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Business/Shop Photo</p>
            <img 
              src={provider?.businessImage || 'https://via.placeholder.com/300x150'} 
              alt="Business" 
              className="w-full h-32 object-cover rounded-lg border"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Account Status Action</h4>
          <p className="text-xs text-gray-400">Current status: <span className="font-semibold uppercase">{provider?.status || 'Pending'}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onBlock(provider?._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all"
          >
            Block Provider
          </button>
          <button 
            onClick={() => onApprove(provider?._id)}
            className="px-4 py-2 bg-[#0f3d2e] hover:bg-[#0b2e22] text-white text-xs font-semibold rounded-lg transition-all"
          >
            Approve Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;