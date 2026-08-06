import React from 'react';
import { Edit2, Trash2, Loader2 } from 'lucide-react';

export default function CategoryTable({
  categories,
  loading,
  onOpenEditModal,
  onDeleteCategory,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50/60">
              <th className="py-4 px-6 w-16">Sr.#</th>
              <th className="py-4 px-6 w-1/4">Category Name</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6 w-32 text-center">Providers</th>
              <th className="py-4 px-6 w-28 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400 text-xs">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-[#1a5ea1]" size={18} />
                    Loading categories...
                  </div>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400 text-xs">
                  No categories found. Click "Add New Category" to create one.
                </td>
              </tr>
            ) : (
              categories.map((category, index) => {
                const categoryId = category._id;
                return (
                  <tr key={categoryId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800 text-xs capitalize">
                      {category.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 leading-relaxed max-w-md">
                      {category.description ? (
                        category.description
                      ) : (
                        <span className="text-slate-300 italic">No description added</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1a5ea1]">
                        {category.providers ?? 0} Providers
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onOpenEditModal(category)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          onClick={() => onDeleteCategory(category._id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}