import React, { useState, useEffect } from 'react';
import { Users, UserCheck, CreditCard, Clock, Crown, Briefcase } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import { getdashboard } from '../api/adminApi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProviders: 0,
    pendingPayments: 0,
    pendingVerifications: 0,
    premiumProviders: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProviders, setRecentProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await getdashboard();
        if (res?.data?.success) {
          setStats(res.data.stats || {});
          setRecentUsers(res.data.recentCustomers || []);
          setRecentProviders(res.data.recentProviders || []);
        } else if (res?.success) {
          setStats(res.stats || {});
          setRecentUsers(res.recentCustomers || []);
          setRecentProviders(res.recentProviders || []);
        }
      } catch (err) {
        console.error("Dashboard data load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-xl font-bold text-[#0f172a]">Nazdeek Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">Platform overview and activity metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Customers" 
          count={stats.totalCustomers || 0} 
          icon={<Users size={20} />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <StatCard 
          title="Total Providers" 
          count={stats.totalProviders || 0} 
          icon={<UserCheck size={20} />} 
          iconBg="bg-purple-50" 
          iconColor="text-purple-600" 
        />
        <StatCard 
          title="Pending Payments" 
          count={stats.pendingPayments || 0} 
          icon={<CreditCard size={20} />} 
          iconBg="bg-rose-50" 
          iconColor="text-rose-600" 
        />
        <StatCard 
          title="Pending Verifications" 
          count={stats.pendingVerifications || 0} 
          icon={<Clock size={20} />} 
          iconBg="bg-amber-50" 
          iconColor="text-amber-500" 
        />
        <StatCard 
          title="Premium Providers" 
          count={stats.premiumProviders || 0} 
          icon={<Crown size={20} />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <Users size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold text-[#0f172a]">Recent Customers</h2>
          </div>
          <div className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No recent customers found</p>
            ) : (
              recentUsers.map(user => (
                <div key={user._id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a]">{user.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {user.isActive ? '✓ Active' : '✕ Inactive'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <Briefcase size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold text-[#0f172a]">Recent Providers</h2>
          </div>
          <div className="space-y-3">
            {recentProviders.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No recent providers found</p>
            ) : (
              recentProviders.map(provider => (
                <div key={provider._id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a]">{provider.businessName}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Owner: <span className="font-medium text-slate-600">{provider.userId?.name || 'N/A'}</span> • {provider.categoryId?.name || 'Category'}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      provider.verificationStatus === 'approved' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : provider.verificationStatus === 'pending' 
                        ? 'bg-amber-50 text-amber-500' 
                        : 'bg-rose-50 text-rose-600'
                    }`}>
                      {provider.verificationStatus}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(provider.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}