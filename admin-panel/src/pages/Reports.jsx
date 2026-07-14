import React, { useState } from 'react';
import { Search, Flag, Mail } from 'lucide-react';
import ReportCard from '../components/common/ReportCard'; 

const Reports = () => {
  const [activeTab, setActiveTab] = useState('provider');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [reports, setReports] = useState([
    {
      id: 1,
      category: 'SPAM',
      targetName: 'TechStore Pro',
      reporter: 'Sara Khan',
      date: '2024-04-09',
      views: 34,
      status: 'Pending',
      reason: 'Reported for repeated spam messages and unsolicited promotions sent to multiple users.',
      reportedItemType: 'Service Provider'
    },
    {
      id: 2,
      category: 'UNUSUAL ACTIVITY',
      targetName: 'Quick Fix Services',
      reporter: 'Ali Ahmed',
      date: '2024-04-08',
      views: 12,
      status: 'Pending',
      reason: 'Multiple rapid account updates and suspicious login attempts from unfamiliar IPs.',
      reportedItemType: 'Service Provider'
    }
  ]);

  const handleMarkAsResolved = (id) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Resolved' } : r)
    );
  };

  const handleDeleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = reportTypeFilter === 'All types' || report.category.toLowerCase() === reportTypeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All statuses' || report.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('provider')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'provider'
              ? 'bg-[#0D4D47] text-white shadow-md'
              : 'bg-[#F1F5F9] text-gray-600 hover:bg-gray-200'
          }`}
        >
          Provider Reports
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'support'
              ? 'bg-[#0D4D47] text-white shadow-md'
              : 'bg-[#F1F5F9] text-gray-600 hover:bg-gray-200'
          }`}
        >
          Support Messages
        </button>
      </div>

      {activeTab === 'provider' ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#0D4D47] mb-1">
                <Flag className="w-6 h-6" />
                <h1 className="text-2xl font-extrabold text-slate-800">Provider Reports</h1>
              </div>
              <p className="text-sm text-gray-500">
                Review reports submitted against providers for spam, policy violations, and unusual activity.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Search reports</label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by reporter, target, or reason"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4D47] focus:border-[#0D4D47]"
                />
              </div>
            </div>

<div className="flex gap-4">
  <div className="w-full md:w-48 relative">
    <label className="text-xs font-semibold text-slate-700 block mb-1">Report type</label>
    <button
      type="button"
      onClick={() => setIsTypeOpen(!isTypeOpen)}
      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 text-left flex justify-between items-center focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800"
    >
      <span className="capitalize">{reportTypeFilter.toLowerCase()}</span>
      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isTypeOpen && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
        {[
          { label: "All types", value: "All types" },
          { label: "Spam", value: "SPAM" },
          { label: "Unusual Activity", value: "UNUSUAL ACTIVITY" }
        ].map((opt) => (
          <div
            key={opt.value}
            onClick={() => {
              setReportTypeFilter(opt.value);
              setIsTypeOpen(false);
            }}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-teal-800 hover:text-white transition-colors"
          >
            {opt.label}
          </div>
        ))}
      </div>
    )}
  </div>

  <div className="w-full md:w-48 relative">
    <label className="text-xs font-semibold text-slate-700 block mb-1">Status</label>
    <button
      type="button"
      onClick={() => setIsStatusOpen(!isStatusOpen)}
      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 text-left flex justify-between items-center focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800"
    >
      <span className="capitalize">{statusFilter.toLowerCase()}</span>
      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isStatusOpen && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
        {[
          { label: "All statuses", value: "All statuses" },
          { label: "Pending", value: "Pending" },
          { label: "Resolved", value: "Resolved" }
        ].map((opt) => (
          <div
            key={opt.value}
            onClick={() => {
              setStatusFilter(opt.value);
              setIsStatusOpen(false);
            }}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-teal-800 hover:text-white transition-colors"
          >
            {opt.label}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
          </div>

          <div>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onResolve={handleMarkAsResolved}
                  onDelete={handleDeleteReport}
                />
              ))
            ) : (
              <div className="bg-white text-center py-12 rounded-2xl border border-slate-100">
                <p className="text-gray-500">No reports match your filters.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
          <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Support Messages</h2>
          <p className="text-gray-500 text-sm mt-2">
            Messages, inquiries, and customer help requests will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;