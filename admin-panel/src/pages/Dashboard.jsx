import React, { useState } from 'react';
import { Users, Folder, UserCheck, Clock, TrendingUp, Briefcase } from 'lucide-react';
import StatCard from '../components/common/StatCard';

export default function Dashboard() {
  const [stats] = useState({
    totalUsers: 10,
    categories: 5,
    totalProviders: 6,
    pendingProviders: 2
  });

  const [recentUsers] = useState([
    { id: 1, name: 'Henry Ford', email: 'henry@example.com', status: 'Active', date: '2023-10-25' },
    { id: 2, name: 'Grace Lee', email: 'grace@example.com', status: 'Active', date: '2023-09-14' },
    { id: 3, name: 'Frank Miller', email: 'frank@example.com', status: 'Inactive', date: '2023-08-30' },
    { id: 4, name: 'Eve Adams', email: 'eve@example.com', status: 'Active', date: '2023-07-22' },
  ]);

  const [recentProviders] = useState([
    { id: 1, name: 'Electro World', category: 'Electronics', status: 'Verified', date: '2023-06-18' },
    { id: 2, name: 'Bookworm Haven', category: 'Books', status: 'Pending', date: '2023-05-12' },
    { id: 3, name: 'Sports Zone', category: 'Sports', status: 'Rejected', date: '2023-04-05' },
    { id: 4, name: 'Garden Master', category: 'Home & Garden', status: 'Verified', date: '2023-03-10' },
  ]);

  return (
    <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-xl font-bold text-[#0f172a]">Welcome to Nazdeek Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" count={stats.totalUsers} icon={<Users size={20} />} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Categories" count={stats.categories} icon={<Folder size={20} />} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Total Providers" count={stats.totalProviders} icon={<UserCheck size={20} />} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Pending Providers" count={stats.pendingProviders} icon={<Clock size={20} />} iconBg="bg-amber-50" iconColor="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <TrendingUp size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold text-[#0f172a]">Recent Users</h2>
          </div>
          <div className="space-y-3">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-[#0f172a]">{user.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{user.email}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {user.status === 'Active' ? '✓ ' : '✕ '} {user.status}
                  </span>
                  <span className="text-[10px] text-slate-400">{user.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <Briefcase size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold text-[#0f172a]">Recent Providers</h2>
          </div>
          <div className="space-y-3">
            {recentProviders.map(provider => (
              <div key={provider.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-[#0f172a]">{provider.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{provider.category}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    provider.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : provider.status === 'Pending' ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {provider.status === 'Verified' ? '✓ ' : provider.status === 'Pending' ? '🕒 ' : '✕ '} {provider.status}
                  </span>
                  <span className="text-[10px] text-slate-400">{provider.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}