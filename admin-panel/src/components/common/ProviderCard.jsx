import React from 'react';
import { Eye, CheckCircle2, Clock, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  verified: {
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    icon: <CheckCircle2 size={12} className="mr-1" />,
    text: 'Verified'
  },
  pending: {
    classes: 'bg-amber-50 text-amber-700 border border-amber-100',
    icon: <Clock size={12} className="mr-1" />,
    text: 'Pending'
  },
  rejected: {
    classes: 'bg-rose-50 text-rose-700 border border-rose-100',
    icon: <XCircle size={12} className="mr-1" />,
    text: 'Rejected'
  }
};

export default function ProviderCard({ provider, onViewDetails }) {
  const { name, email, address, category, status, image } = provider;
  const currentStatus = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center font-bold text-slate-500">
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                name.charAt(0)
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">{name}</h3>
              <p className="text-xs text-slate-400 break-all">{email}</p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${currentStatus.classes}`}>
            {currentStatus.icon}
            {currentStatus.text}
          </span>
        </div>

        <div className="space-y-1.5 my-4 text-xs">
          <p className="text-slate-500">
            <span className="font-semibold text-slate-700">Address: </span>{address}
          </p>
          <p className="text-slate-500">
            <span className="font-semibold text-slate-700">Category: </span>{category}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(provider)}
        className="w-full mt-2 bg-[#0a3a35]  bg-[#0a3a35]  text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shadow-indigo-100"
      >
        <Eye size={14} />
        View Details
      </button>
    </div>
  );
}