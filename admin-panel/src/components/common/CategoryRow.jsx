import React from 'react';
import { Trash2 } from 'lucide-react';

export default function CategoryRow({ srNo, id, name, providersCount, onDelete }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6 font-medium text-slate-500">
        {srNo}
      </td>
      
      <td className="py-4 px-6 font-semibold text-[#0f172a]">
        {name}
      </td>
      
      <td className="py-4 px-6">
        <span className="bg-[#dbeafe] text-[#2563eb] text-xs font-bold px-3 py-1 rounded-full inline-block min-w-8 text-center">
          {providersCount}
        </span>
      </td>
      
      <td className="py-4 px-6">
        <button 
          onClick={() => onDelete(id)}
          className="flex items-center gap-1.5 text-red-500 bg-red-50 hover:bg-red-100/80 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </td>
    </tr>
  );
}