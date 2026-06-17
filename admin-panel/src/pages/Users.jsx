import React, { useState } from 'react';
import { User, UserCheck, Search } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import UserRow from '../components/common/UserRow';

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'Active', joinedAt: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'provider', status: 'Inactive', joinedAt: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'customer', status: 'Active', joinedAt: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'provider', status: 'Active', joinedAt: '2023-04-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'customer', status: 'Inactive', joinedAt: '2023-05-12' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'provider', status: 'Active', joinedAt: '2023-06-18' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status.toLowerCase() === 'active' ? 'Inactive' : 'Active'
        };
      }
      return user;
    }));
  };

  const totalCustomers = users.filter(u => u.role === 'customer').length;
  const totalProviders = users.filter(u => u.role === 'provider').length;

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
      
      <h1 className="text-2xl font-bold text-[#0f172a]">Users</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <StatCard 
          title="Total Customers" 
          count={totalCustomers} 
          icon={<User size={20} />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <StatCard 
          title="Total Providers" 
          count={totalProviders} 
          icon={<UserCheck size={20} />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
      </div>

      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Search users by name, email, role, or status..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-400 shadow-sm shadow-slate-100/50"
        />
      </div>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10 shadow-sm shadow-slate-100">
              <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50/50">
                <th className="py-4 px-6 w-24">Sr.No</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined At</th>
                <th className="py-4 px-6 w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserRow 
                    key={user.id}
                    srNo={index + 1}
                    user={user}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400 font-medium">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}