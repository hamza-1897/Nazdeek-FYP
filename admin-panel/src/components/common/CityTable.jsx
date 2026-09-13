
import React from 'react';
import { Edit2, Trash2, Loader2 } from 'lucide-react';

export default function CityTable({
  cities,
  loading,
  onOpenEditModal,
  onDeleteCity,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50/60">
              <th className="py-4 px-6 w-16">Sr.#</th>
              <th className="py-4 px-6 w-1/3">City Name</th>
              <th className="py-4 px-6 w-32 text-center">Status</th>
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
                    Loading cities...
                  </div>
                </td>
              </tr>
            ) : cities.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400 text-xs">
                  No cities found. Click "Add New City" to create one.
                </td>
              </tr>
            ) : (
              cities.map((city, index) => {
                const cityId = city._id;
                return (
                  <tr key={cityId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800 text-xs capitalize">
                      {city.name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          city.isActive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {city.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1a5ea1]">
                        {city.providers ?? 0} Providers
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onOpenEditModal(city)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit City"
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          onClick={() => onDeleteCity(city._id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete City"
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