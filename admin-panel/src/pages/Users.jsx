import React, { useState, useEffect } from 'react';
import { User, UserCheck, Search } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import UserRow from '../components/common/UserRow';
import { getAllUsers , updateUserStatus} from '../api/adminApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      const fetchedData = response?.data || response || [];
      setUsers(fetchedData);
      console.log("Real Data Loaded:", fetchedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

 const updateStatus = async (userId)=>{
  try{
      const response = await updateUserStatus(userId);
      alert("user status updated")
    fetchUsers();
  }catch(error){
    
          console.error("Error fetching users:", error);

  }
    
 }

  const totalCustomers = users.filter(u => u.role?.toLowerCase() === 'customer').length;
  const totalProviders = users.filter(u => u.role?.toLowerCase() === 'provider').length;

  const filteredUsers = users.filter(user => {
    const name = user.name?.toLowerCase() || '';
    const email = user.email?.toLowerCase() || '';
    const role = user.role?.toLowerCase() || '';
    const status = user.status?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    return name.includes(query) || email.includes(query) || role.includes(query) || status.includes(query);
  });

 


  return (
    <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
      
      <h1 className="text-2xl font-bold text-[#0f172a]">Users</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <StatCard 
          title="Total Customers" 
          count={loading ? '...' : totalCustomers} 
          icon={<User size={20} />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <StatCard 
          title="Total Providers" 
          count={loading ? '...' : totalProviders} 
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 font-medium">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce" />
                      <span>Loading real-time user database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserRow 
                    key={user._id || user.id} 
                    srNo={index + 1}
                    user={{
                      ...user,
                      id: user._id || user.id, 
                      joinedAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' 
                    }}
                    onToggleStatus={updateStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 font-medium">
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