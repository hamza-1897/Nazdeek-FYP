import React from 'react';

export default function UserRow({ srNo, user, onToggleStatus }) {
  const role = user?.role?.toLowerCase() || 'customer';
  let status;
  if(user?.isActive){
     status = 'Active';
  } else {
    status = 'Inactive';
  }
  const name = user?.name || 'Unknown User';
  const email = user?.email || 'No Email';
  const joinedAt = user?.joinedAt || 'N/A';
  const userId = user?.id || user?._id;

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6 font-medium text-slate-400">{srNo}</td>
      <td className="py-4 px-6 font-semibold text-slate-700">{name}</td>
      <td className="py-4 px-6 text-slate-500">{email}</td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
          role === 'provider' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
        }`}>
          {role}
        </span>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
          status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-6 text-slate-500">{joinedAt}</td>
      <td className="py-4 px-6">
        <button
          onClick={() => onToggleStatus(userId)}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            status === 'active' 
              ? 'text-rose-600 bg-rose-50 border-rose-100 hover:bg-rose-100' 
              : 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100'
          }`}
        >
          {status === 'active' ? 'Block' : 'Activate'}
        </button>
      </td>
    </tr>
  );
}