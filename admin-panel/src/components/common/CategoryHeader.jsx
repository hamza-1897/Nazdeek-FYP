import React from 'react';
import { Plus } from 'lucide-react';

export default function CategoryHeader({ onOpenAddModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Categories Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage app service categories and view active providers
        </p>
      </div>

      <button
        onClick={onOpenAddModal}
        className="bg-[#1a5ea1] hover:bg-[#154c82] cursor-pointer text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
      >
        <Plus size={16} />
        Add New Category
      </button>
    </div>
  );
}