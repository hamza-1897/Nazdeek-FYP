import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProviderCard from '../components/common/ProviderCard'; 

export default function Providers() {
  const [providersData] = useState([
    { id: 1, name: 'TechStore Pro', email: 'contact@techstore.com', address: '123 Tech Street, Karachi', category: 'Electronics', status: 'verified' },
    { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.com', address: '45 Fashion Avenue, Lahore', category: 'Clothing', status: 'pending' },
    { id: 3, name: 'Garden Master', email: 'support@gardenmaster.com', address: '78 Garden Road, Islamabad', category: 'Home & Garden', status: 'verified' },
    { id: 4, name: 'Sports Zone', email: 'hello@sportszone.com', address: '9 Sports Plaza, Peshawar', category: 'Sports', status: 'rejected' },
    { id: 5, name: 'Bookworm Haven', email: 'books@bookwormhaven.com', address: '22 Book Street, Karachi', category: 'Books', status: 'pending' },
    { id: 6, name: 'Electro World', email: 'sales@electroworld.com', address: '54 Commerce Blvd, Lahore', category: 'Electronics', status: 'verified' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const total = providersData.length;
  const verified = providersData.filter(p => p.status === 'verified').length;
  const pending = providersData.filter(p => p.status === 'pending').length;
  const rejected = providersData.filter(p => p.status === 'rejected').length;

  const filteredProviders = providersData.filter((provider) => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (provider) => {
    console.log("Viewing details for:", provider.name);
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
            placeholder="Search by business name, email, or address..."
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

      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard 
              key={provider.id} 
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