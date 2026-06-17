import React from 'react';

export default function UserRow({ srNo, user, onToggleStatus }) {
  const { id, name, email, role, status, joinedAt } = user;
  
  const isActive = status.toLowerCase() === 'active';

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6 font-medium text-slate-500">{srNo}</td>
      
      <td className="py-4 px-6 font-semibold text-[#0f172a]">{name}</td>
      
      <td className="py-4 px-6 text-slate-600">{email}</td>
      
      <td className="py-4 px-6 text-slate-600 capitalize">{role}</td>
      
      <td className="py-4 px-6">
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
          isActive 
            ? 'bg-emerald-50 text-emerald-600' 
            : 'bg-rose-50 text-rose-600'
        }`}>
          {isActive ? '✓ Active' : '✕ Inactive'}
        </span>
      </td>
      
      <td className="py-4 px-6 text-slate-500">{joinedAt}</td>
      
      <td className="py-4 px-6">
        <button
          onClick={() => onToggleStatus(id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            isActive
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100/80'
              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80'
          }`}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  );
}