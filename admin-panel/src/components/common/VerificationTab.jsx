import React, { useState } from 'react';

const VerificationTab = ({ provider, onApprove, onBlock }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const profileImg = provider?.providerImage || provider?.userId?.profileImage || 'https://via.placeholder.com/150';
  const status = (provider?.verificationStatus || provider?.status || 'pending').toLowerCase();
  const regFeeStatus = (provider?.registrationFee || 'unpaid').toLowerCase();
  const isPremium = provider?.isPremium || false;

  const statusColors = {
    approved: 'text-emerald-600 font-bold',
    rejected: 'text-red-600 font-bold',
    unsubmitted: 'text-red-600 font-bold',
    pending: 'text-amber-600 font-bold',
  };

  const regFeeBadges = {
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    pending_approval: 'bg-amber-100 text-amber-800 border-amber-300',
    unpaid: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please enter a rejection reason.');
      return;
    }
    // Passing providerId and accountRejectionReason to parent handler
    onBlock && onBlock(provider?._id, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview Box */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <a href={profileImg} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img 
              src={profileImg} 
              alt="Provider Profile" 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0f3d2e] hover:opacity-90 transition-opacity cursor-pointer"
            />
          </a>
          
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{provider?.businessName || 'N/A'}</h3>
              <p className="text-xs text-gray-400">
                Category: <span className="font-semibold text-gray-600">{provider?.categoryId?.name || 'N/A'}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${regFeeBadges[regFeeStatus] || 'bg-gray-100 text-gray-700'}`}>
                Reg. Fee: {regFeeStatus.toUpperCase().replace('_', ' ')}
              </span>

              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                isPremium ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}>
                {isPremium ? '⭐ Premium Tier' : 'Free Tier'}
              </span>
            </div>
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
            <p className="font-semibold text-gray-700">{isPremium ? 'Premium Tier' : 'Free Tier'}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50">
          <p className="text-gray-400 text-xs">Business Detail</p>
          <p className="text-sm font-medium text-gray-600 mt-1">{provider?.description || 'No bio provided.'}</p>
        </div>
      </div>

      {/* Verification Documents */}
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
                      className="w-full h-32 object-cover rounded-lg border hover:opacity-90 transition-all cursor-pointer"
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
                  <a key={index} href={imgUrl} target="_blank" rel="noreferrer" className="inline-block">
                    <img 
                      src={imgUrl} 
                      alt={`Work sample ${index + 1}`} 
                      className="w-24 h-24 object-cover rounded-lg border hover:opacity-90 cursor-pointer transition-all"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No work images uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Verification Action Box */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Verification Status Action</h4>
          <p className="text-xs text-gray-400 mt-0.5">
            Current status: <span className={`uppercase ${statusColors[status] || 'text-gray-600'}`}>{status}</span>
          </p>
          {isRejected && provider?.accountRejectionReason && (
            <p className="text-xs text-red-500 font-medium mt-1">
              Reason: "{provider.accountRejectionReason}"
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <button 
            type="button"
            disabled={isRejected}
            onClick={() => setShowRejectModal(true)}
            className={`px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all shadow-sm ${
              isRejected
                ? 'bg-red-300 cursor-not-allowed opacity-60'
                : 'bg-red-600 hover:bg-red-700 active:scale-95 cursor-pointer'
            }`}
          >
            {isRejected ? 'Rejected / Blocked' : 'Reject Provider'}
          </button>

          <button 
            type="button"
            disabled={isApproved}
            onClick={() => onApprove && onApprove(provider?._id)}
            className={`px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all shadow-sm ${
              isApproved
                ? 'bg-emerald-300 cursor-not-allowed opacity-60'
                : 'bg-[#0f3d2e] hover:bg-[#0b2e22] active:scale-95 cursor-pointer'
            }`}
          >
            {isApproved ? 'Already Approved' : 'Approve Provider'}
          </button>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Reject Application</h3>
            <p className="text-xs text-gray-500">
              State the reason for rejection so the provider can rectify and re-upload documents.
            </p>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. CNIC photo is blurry, or work portfolio lacks genuine samples..."
              className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationTab;