import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import VerificationTab from '../components/common/VerificationTab';
import ActivityTab from '../components/common/ActivityTab';

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('verification');
  const [loading, setLoading] = useState(false);

  const [providerData, setProviderData] = useState({
    provider: {
      _id: id,
      name: 'Abu Bakar',
      businessName: 'Abu Bakar Traders',
      email: 'abubakar@gmail.com',
      phone: '03001234567',
      cnicNumber: '34101-1234567-1',
      status: 'pending',
      cnicFront: '',
      cnicBack: '',
      businessImage: ''
    },
    services: [
      { _id: 's1', title: 'AC Repairing & Service', description: 'Complete AC gas refilling and servicing.', price: '3500', category: 'Electrician' }
    ],
    reviews: [
      { _id: 'r1', userId: { name: 'Ali Raza' }, rating: 5, comment: 'Bohot achi service thi, time par aye.' }
    ]
  });

  const handleApprove = (providerId) => {
    alert(`Provider ${providerId} Approved!`);
  };

  const handleBlock = (providerId) => {
    alert(`Provider ${providerId} Blocked!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-[#0f3d2e]" size={36} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6 transition-all"
      >
        <ArrowLeft size={16} /> Back to Providers
      </button>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0f3d2e]">{providerData.provider.businessName}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              providerData.provider.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {providerData.provider.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Managed by {providerData.provider.name}</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'verification' ? 'bg-white text-[#0f3d2e] shadow-sm' : 'text-gray-500'
            }`}
          >
            Verification Data
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'activity' ? 'bg-white text-[#0f3d2e] shadow-sm' : 'text-gray-500'
            }`}
          >
            Live App Activity
          </button>
        </div>
      </div>

      {activeTab === 'verification' ? (
        <VerificationTab 
          provider={providerData.provider} 
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