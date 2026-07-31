import React from 'react';
import { Eye, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  approved: {
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    icon: <CheckCircle2 size={12} className="mr-1" />,
    text: 'Approved'
  },
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
  const navigate = useNavigate();

  const name = provider?.businessName || 'N/A';
  const providerId = provider?._id || '';
  const email = provider?.userId?.email || 'N/A';
  const address = provider?.address || 'N/A';
  const category = provider?.categoryId?.name || 'N/A';
  const status = provider?.verificationStatus || 'pending';
  const image = provider?.providerImage || provider?.userId?.profileImage || '';

  const currentStatus = STATUS_CONFIG[status.toLowerCase()] || STATUS_CONFIG.pending;

 

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 min-h-[220px]">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-full border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0 flex items-center justify-center font-bold text-slate-500 text-lg">
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                name?.charAt(0)?.toUpperCase() || 'P'
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-base lg:text-lg leading-snug truncate">
                {name}
              </h3>
              <p className="text-xs lg:text-sm text-slate-400 mt-0.5 truncate">
                {email}
              </p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${currentStatus.classes}`}>
            {currentStatus.icon}
            {currentStatus.text}
          </span>
        </div>

        <div className="space-y-1.5 my-4 text-xs lg:text-sm border-t border-slate-50/80 pt-3">
          <p className="text-slate-500 capitalize">
            <span className="font-semibold text-slate-700">Address: </span>{address}
          </p>
          <p className="text-slate-500">
            <span className="font-semibold text-slate-700">Category: </span>{category}
          </p>
        </div>
      </div>

      <button
        onClick={ () => onViewDetails(providerId) }
        className="w-full mt-2 cursor-pointer bg-[#0a3a35] text-white font-semibold text-xs lg:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:bg-[#072925]"
      >
        <Eye size={14} />
        View Details
      </button>
    </div>
  );
}