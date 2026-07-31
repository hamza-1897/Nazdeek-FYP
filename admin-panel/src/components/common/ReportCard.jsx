import React from 'react';

const ReportCard = ({ report, onResolve, onDelete }) => {
  const reportId = report?._id;
  const category = report?.reportType ? report.reportType.replace('_', ' ') : 'N/A';
  const targetName = report?.providerId?.businessName || 'Unknown Provider';
  const reporter = report?.reporterId?.name || 'Anonymous';
  const reason = report?.reason || 'No reason provided';
  const status = report?.status || 'pending';
  
  const formattedDate = report?.createdAt 
    ? new Date(report.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between gap-6">
      
      <div className="flex-1">
        <div className="text-xs font-bold text-blue-600 tracking-wider mb-1 uppercase">
          {category}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{targetName}</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Reported by <span className="font-medium text-gray-600">{reporter}</span> on {formattedDate}
        </p>

        <div className="mt-4 bg-slate-50 border border-gray-100 rounded-xl p-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 tracking-wider">Reason</span>
          <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end min-w-[200px]">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4 md:mb-0">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
            status.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {status}
          </span>
        </div>

        <div className="w-full flex flex-col gap-2 mt-auto">
          {status.toLowerCase() === 'pending' && (
            <button 
              onClick={() => onResolve(reportId)}
              className="w-full bg-[#0f3d2e] hover:bg-[#0b2e22] text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark as Resolved
            </button>
          )}
          
          <button 
            onClick={() => onDelete(reportId)}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;