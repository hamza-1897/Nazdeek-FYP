import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import VerificationTab from '../components/common/VerificationTab';
import ActivityTab from '../components/common/ActivityTab';
import { getProviderDetails, updateStatus } from '../api/adminApi';

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('verification');
  const [loading, setLoading] = useState(true);

  const [providerData, setProviderData] = useState({
    provider: null,
    services: [],
    reviews: []
  });

  const fetchProviderDetails = async () => {
    try {
      setLoading(true);
      const res = await getProviderDetails(id);
      
      const actualProviderData = res?.provider || res;

      setProviderData({
        provider: actualProviderData,
        services: res?.services || [],
        reviews: res?.reviews || []
      });
    } catch (error) {
      console.error("Error fetching provider details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProviderDetails();
    }
  }, [id]);

  const handleApprove = async (providerId) => {
    try {
      const targetId = providerId || id;
      const res = await updateStatus(targetId, 'approved');
      console.log(res)
        alert('Provider Approved Successfully!');
        await fetchProviderDetails(); 
      
    } catch (err) {
      console.error("Approve Error:", err);
      alert(err?.response?.data?.message || err?.message || 'Error updating status');
    }
  };

 const handleBlock = async (providerId, rejectionReason) => {
  try {
    const targetId = providerId || id;
    const res = await updateStatus(targetId, 'rejected', rejectionReason);
    console.log(res);

    alert('Provider Rejected Successfully!');
    await fetchProviderDetails(); 
    
  } catch (err) {
    console.error("Block Error:", err);
    alert(err?.response?.data?.message || err?.message || 'Error updating status');
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#0f3d2e]" size={36} />
      </div>
    );
  }

  const provider = providerData?.provider;
  const currentStatus = provider?.verificationStatus || provider?.status || 'pending';

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6 transition-all cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Providers
      </button>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0f3d2e]">
              {provider?.businessName || provider?.userId?.name || 'Provider Detail'}
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              currentStatus === 'approved' || currentStatus === 'verified'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                : currentStatus === 'rejected' || currentStatus === 'blocked'
                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                : 'bg-amber-50 text-amber-700 border border-amber-100'
            }`}>
              {currentStatus}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Managed by {provider?.userId?.name || provider?.name || 'N/A'}
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'verification' ? 'bg-white text-[#0f3d2e] shadow-sm' : 'text-gray-500'
            }`}
          >
            Verification Data
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'activity' ? 'bg-white text-[#0f3d2e] shadow-sm' : 'text-gray-500'
            }`}
          >
            Live App Activity
          </button>
        </div>
      </div>

      {activeTab === 'verification' ? (
        <VerificationTab 
          provider={provider} 
          onApprove={handleApprove} 
          onBlock={handleBlock} 
        />
      ) : (
        <ActivityTab 
          services={providerData.services} 
          reviews={providerData.reviews} 
        />
      )}
    </div>
  );
};

export default ProviderDetail;