import React from 'react';

export default function StatCard({ title, count, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 flex-1">
      <div className={`p-3 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-[#0f172a] mt-0.5">{count}</p>
      </div>
    </div>
  );
}