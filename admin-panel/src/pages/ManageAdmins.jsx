import React, { useState, useEffect } from 'react';
import { addAdmin, getAllAdmins, deleteAdmin } from '../api/adminApi';
import { useAdmin } from '../context/AuthContext';
import { ShieldCheck, UserPlus, Eye, EyeOff, Loader2, Trash2 } from 'lucide-react';
import { validateEmail, validatePassword, validateNoNumbers } from '../utils/validations';

export default function ManageAdmins() {
  const { admin } = useAdmin();
  const isSuperAdmin = admin?.role === 'superadmin';

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await getAllAdmins();
      const data = res?.admins || res?.data || res;
      setAdmins(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) fetchAdmins();
    else setLoading(false);
  }, [isSuperAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateNoNumbers(formData.name, "Name");
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || passwordError) {
      alert(nameError || emailError || passwordError);
      return;
    }

    try {
      setSubmitting(true);
      await addAdmin(formData);
      alert('New admin added successfully!');
      setFormData({ name: '', email: '', password: '', role: 'admin' });
      await fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
      alert(error.response?.data?.message || 'Failed to add admin.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (adminId, adminName) => {
    if (adminId === admin?._id) {
      alert("You cannot delete your own account!");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${adminName}?`);
    if (!confirmDelete) return;

    try {
      await deleteAdmin(adminId);
      alert('Admin deleted successfully!');
      setAdmins((prev) => prev.filter((item) => item._id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert(error.response?.data?.message || 'Failed to delete admin.');
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center max-w-lg mx-auto mt-10">
        <ShieldCheck className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-800">Access Restricted</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Only a Super Admin can view or manage admin accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Admins</h1>
        <p className="text-gray-500 text-sm">Add or remove Admins and Super Admins on the platform.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold text-[#0a3a35] flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5" /> Add New Admin
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none"
                placeholder="Temporary password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {passwordVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#0D4D47] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:bg-[#0a3a35] transition-colors disabled:opacity-70"
            >
              {submitting ? 'Adding...' : 'Add Admin'}
            </button>
          </div>
        </form>
      </div>

      {/* Admins Table Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Existing Admins</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-[#0D4D47]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Added On</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a._id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-800">{a.name}</td>
                    <td className="py-2 pr-4 text-gray-600">{a.email}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          a.role === 'superadmin'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {a.role}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-500">
                      {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-2 pr-4 text-right">
                      {a._id !== admin?._id && (
                        <button
                          onClick={() => handleDelete(a._id, a.name)}
                          className="p-1.5 text-red-500 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}