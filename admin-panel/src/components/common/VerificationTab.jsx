import React from 'react';

const VerificationTab = ({ provider, onApprove, onBlock }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <img 
            src={provider?.providerImage || provider?.userId?.profileImage || 'https://via.placeholder.com/150'} 
            alt="Provider Profile" 
            className="w-16 h-16 rounded-full object-cover border-2 border-[#0f3d2e]"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{provider?.businessName || 'N/A'}</h3>
            <p className="text-xs text-gray-400">Category: <span className="font-semibold text-gray-600">{provider?.categoryId?.name || 'N/A'}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Owner Name</p>
            <p className="font-semibold text-gray-700">{provider?.userId?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Email Address</p>
            <p className="font-semibold text-gray-700">{provider?.userId?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">CNIC Number</p>
            <p className="font-semibold text-gray-700">{provider?.cnicNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Address</p>
            <p className="font-semibold text-gray-700 capitalize">{provider?.address || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Experience</p>
            <p className="font-semibold text-gray-700">{provider?.experience ? `${provider.experience} Years` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Subscription Type</p>
            <p className="font-semibold text-gray-700">{provider?.isPremium ? 'Premium Tier' : 'Free Tier'}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50">
          <p className="text-gray-400 text-xs">Business Detail</p>
          <p className="text-sm font-medium text-gray-600 mt-1">{provider?.description || 'No bio provided.'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">Verification Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">CNIC Document Images</p>
            {provider?.cnicImages && provider.cnicImages.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {provider.cnicImages.map((imgUrl, index) => (
                  <a key={index} href={imgUrl} target="_blank" rel="noreferrer" className="w-full md:w-48">
                    <img 
                      src={imgUrl} 
                      alt={`CNIC Document ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-lg border hover:opacity-95 transition-all"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No CNIC images uploaded.</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Work Portfolio / Work Images</p>
            {provider?.workImages && provider.workImages.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {provider.workImages.map((imgUrl, index) => (
                  <img 
                    key={index}
                    src={imgUrl} 
                    alt={`Work sample ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No work images uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Verification Status Action</h4>
          <p className="text-xs text-gray-400">Current status: <span className="font-semibold uppercase text-amber-600">{provider?.verificationStatus || 'Pending'}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onBlock(provider?._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all"
          >
            Reject / Block
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