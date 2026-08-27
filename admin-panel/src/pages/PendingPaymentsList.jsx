import React, { useState, useEffect } from 'react';
import PaymentCard from '../components/common/PaymentCard';
import { getPendingPayemnts, updatePayments } from '../api/adminApi';

const PendingPaymentsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchPendingList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPendingPayemnts();
      
      const data = response?.data?.data || response?.data || response;
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

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);
      const res = await updatePayments(id, { status: 'approve' });

      if (res?.success || res?.status === 200) {
        setRequests((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error approving payment:", error);
      alert(error?.response?.data?.message || "Failed to approve payment.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);
      const res = await updatePayments(id, { status: 'reject' });

      if (res?.success || res?.status === 200) {
        setRequests((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
      alert(error?.response?.data?.message || "Failed to reject payment.");
    } finally {
      setProcessingId(null);
    }
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
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Pending Payments</h2>
          <p className="text-xs text-gray-400">Review submitted payment slips for verification.</p>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
          {requests.length} Pending
        </span>
      </div>

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
              isProcessing={processingId === item._id}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPaymentsList;