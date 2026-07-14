import React from 'react';
import { Eye, CheckCircle2, Trash2 } from 'lucide-react';

const ReportCard = ({ report, onResolve, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative mb-6">
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 block mb-1 uppercase">
            {report.category}
          </span>
          <h2 className="text-lg font-bold text-slate-800">{report.targetName}</h2>
          <p className="text-xs text-gray-400 mt-1">
            Reported by <span className="font-semibold text-slate-600">{report.reporter}</span> on {report.date}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            report.status === 'Pending' 
              ? 'bg-green-900-50 text-green-900-600' 
              : 'bg-emerald-50 text-emerald-600'
          }`}>
            {report.status}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-4 h-4" />
            {report.views} views
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Reason</span>
          <p className="text-sm text-slate-700 leading-relaxed">{report.reason}</p>
        </div>

        <div className="w-full lg:w-60 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            { report.status !== 'Resolved' && (
              <button
                onClick={() => onResolve(report.id)}
                className="w-full flex items-center justify-center gap-2 bg-[#0D4D47] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0a3a35] transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Resolved
              </button>
            )}
            <button
              onClick={() => onDelete(report.id)}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete Report
            </button>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Reported Item
            </span>
            <p className="text-xs font-bold text-slate-700">{report.reportedItemType}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReportCard;