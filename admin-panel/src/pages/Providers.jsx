import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import ProviderCard from '../components/common/ProviderCard'; 
import { getAllProviders } from '../api/adminApi'; 
import { useNavigate } from 'react-router-dom';
  
export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(false); 
      setLoading(true);
      const response = await getAllProviders();
      console.log("Raw API Response:", response);
      
      const rawData = Array.isArray(response) ? response : (response?.data || []);
      
      setProviders(rawData);
    } catch (error) { 
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = providers.length;
  const verified = providers.filter(p => (p.verificationStatus || p.status) === 'verified').length;
  const pending = providers.filter(p => (p.verificationStatus || p.status) === 'pending').length;
  const rejected = providers.filter(p => (p.verificationStatus || p.status) === 'rejected').length;

  const filteredProviders = providers.filter((provider) => {
    const businessName = provider?.businessName || provider?.name || '';
    const email = provider?.userId?.email || provider?.email || '';
    const address = provider?.address || '';
    const category = provider?.categoryId?.name || provider?.category || '';
    const currentStatus = provider?.verificationStatus || provider?.status || 'pending';

    const matchesSearch = 
      businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || currentStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

 const handleViewDetails = (providerId) => {
  navigate(`/admin/providerDetail/${providerId}`);
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Providers</h1>
        <div className="text-xs font-semibold text-slate-400 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
          Total: <span className="text-slate-700 font-bold">{total}</span> | 
          Verified: <span className="text-emerald-600 font-bold"> {verified}</span> | 
          Pending: <span className="text-amber-600 font-bold"> {pending}</span> | 
          Rejected: <span className="text-rose-600 font-bold"> {rejected}</span>
        </div>
      </div>

      <div className="flex gap-4 items-center flex-wrap md:flex-nowrap bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by business name, email, category or address..."
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="relative flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 pr-10 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="all">All Status ({filteredProviders.length})</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500"></div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={36} />
        </div>
      ) : filteredProviders.length > 0 ? (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {filteredProviders.map((provider) => (
            <ProviderCard 
              key={provider._id || provider.id} 
              provider={provider} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 font-medium">
          No providers found matching your search.
        </div>
      )}
    </div>
  );
}