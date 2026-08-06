import React from 'react';
import { X, FolderPlus, Loader2 } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  isEditing,
  formData,
  setFormData,
  onSubmit,
  onClose,
  submitting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FolderPlus size={18} className="text-[#1a5ea1]" />
            <h3 className="text-sm font-bold text-slate-900">
              {isEditing ? 'Edit Category' : 'Add New Category'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Electrician"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1a5ea1] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Briefly describe what services fall under this category..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1a5ea1] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#1a5ea1] hover:bg-[#154c82] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}