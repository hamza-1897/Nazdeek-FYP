import React, { useState, useEffect } from 'react';
import PaymentCard from '../components/common/PaymentCard';
import { getPendingPayemnts } from '../api/adminApi';

const PendingPaymentsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch Data from API
  const fetchPendingList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPendingPayemnts();
      
      // Check response data structure (e.g., response.data or response.data.requests)
      const data = response?.data?.pendingPayments || response?.data || response;
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending payments:", err);
      setError("Failed to load pending payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  // Button Handlers
  const handleApprove = async (id) => {
    console.log("Approve Clicked for ID:", id);
    // TODO: Call approve API here
    // e.g., await approvePaymentApi(id);
    // Re-fetch list to sync state
    // fetchPendingList();
  };

  const handleReject = async (id) => {
    console.log("Reject Clicked for ID:", id);
    // TODO: Call reject API here
    // e.g., await rejectPaymentApi(id);
    // Re-fetch list to sync state
    // fetchPendingList();
  };

  const handleViewDetails = (id) => {
    console.log("View Details for ID:", id);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-gray-500 py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f3d2e] mb-2"></div>
        <p className="text-sm">Loading pending payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-10">
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button
          onClick={fetchPendingList}
          className="px-4 py-2 bg-[#0f3d2e] text-white text-xs font-semibold rounded-lg hover:bg-[#0b2e22] transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Pending Payments</h2>
          <p className="text-xs text-gray-400">Review submitted payment slips for verification.</p>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
          {requests.length} Pending
        </span>
      </div>

      {/* Cards Grid */}
      {requests.length === 0 ? (
        <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-xl border border-gray-200">
          No pending payment requests right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((item) => (
            <PaymentCard
              key={item._id}
              data={item}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPaymentsList;