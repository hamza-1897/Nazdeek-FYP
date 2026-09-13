
import React from 'react';
import { Plus } from 'lucide-react';

export default function CityHeader({ onOpenAddModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cities Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Control which cities providers can register from and customers 
        </p>
      </div>

      <button
        onClick={onOpenAddModal}
        className="bg-[#1a5ea1] hover:bg-[#154c82] cursor-pointer text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
      >
        <Plus size={16} />
        Add New City
      </button>
    </div>
  );
}