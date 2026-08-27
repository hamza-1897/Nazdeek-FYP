import React, { useState } from 'react';

const PaymentCard = ({ data, onApprove, onReject, onViewDetails, isProcessing = false }) => {
  const [showSlip, setShowSlip] = useState(false);

  
  const {
    _id,
    businessName = 'N/A',
    providerImage,
    userId = {},
    categoryId = {},
    paymentDetails = {},
    subscriptionDetails = {},
    registrationFee = 'unpaid',
    isPremium = false,
  } = data || {};

  const paymentType = paymentDetails?.paymentType || 'registration';
  const slipUrl = paymentDetails?.paymentSlip;
  const isPremiumType = paymentType === 'premium';

 
  const submittedAt = paymentDetails?.submittedAt
    ? new Date(paymentDetails.submittedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'N/A';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span
            className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${
              isPremiumType
                ? 'bg-purple-100 text-purple-700'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {paymentType} Fee
          </span>
          <span className="text-xs text-gray-400">{submittedAt}</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={providerImage || 'https://via.placeholder.com/60'}
            alt={businessName}
            className="w-12 h-12 rounded-full object-cover border border-gray-100 shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="font-bold text-gray-800 text-sm truncate">{businessName}</h4>
            <p className="text-xs text-gray-500">{userId.name || 'Owner N/A'}</p>
            <p className="text-xs text-gray-400">{userId.phone || 'No phone'}</p>
            <p className="text-[11px] text-emerald-700 font-medium">
              {categoryId.name || 'Category N/A'}
            </p>
          </div>
        </div>

        {isPremiumType && subscriptionDetails?.planTitle && (
          <div className="mb-3 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100 flex justify-between items-center">
            <span className="text-[11px] text-purple-600 font-medium">Requested Plan:</span>
            <span className="text-xs font-bold text-purple-800">
              {subscriptionDetails.planTitle}
            </span>
          </div>
        )}

        <div className="relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 h-32 flex items-center justify-center mb-3">
          {slipUrl ? (
            <img
              src={slipUrl}
              alt="Payment Slip"
              onClick={() => setShowSlip(true)}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          ) : (
            <span className="text-xs text-gray-400">No Slip Available</span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => onReject && onReject(_id)}
            disabled={isProcessing}
            className="flex-1 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove && onApprove(_id)}
            disabled={isProcessing}
            className="flex-1 py-1.5 bg-[#0f3d2e] text-white hover:bg-[#0b2e22] disabled:opacity-50 text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            {isProcessing ? 'Processing...' : 'Approve'}
          </button>
        </div>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(_id)}
            className="w-full text-center text-[11px] text-gray-400 hover:text-gray-700 py-0.5 cursor-pointer"
          >
            Full Profile →
          </button>
        )}
      </div>

      {showSlip && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSlip(false)}
        >
          <div className="bg-white p-2 rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={slipUrl}
              alt="Slip Full View"
              className="w-full max-h-[80vh] object-contain rounded"
            />
            <p className="text-center text-xs text-gray-400 mt-2">Click outside or tap image to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;