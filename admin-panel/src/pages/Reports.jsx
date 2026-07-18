import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ReportCard from '../components/common/ReportCard';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');

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
      reporter: 'Ali Raza',
      date: '2024-04-10',
      views: 12,
      status: 'Pending',
      reason: 'Multiple rapid logins and sudden change in service rates within an hour.',
      reportedItemType: 'Service Provider'
    }
  ]);

  const handleResolve = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'Resolved' } : report
    ));
  };

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = reportTypeFilter === 'All types' || report.category === reportTypeFilter;
    const matchesStatus = statusFilter === 'All statuses' || report.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0f3d2e]">Provider Reports</h2>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by reporter, target, or reason"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d2e] focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="flex flex-col w-1/2 md:w-40">
            <label className="text-xs text-gray-500 mb-1 font-medium">Report type</label>
            <select
              className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d2e]"
              value={reportTypeFilter}
              onChange={(e) => setReportTypeFilter(e.target.value)}
            >
              <option>All types</option>
              <option>SPAM</option>
              <option>UNUSUAL ACTIVITY</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2 md:w-40">
            <label className="text-xs text-gray-500 mb-1 font-medium">Status</label>
            <select
              className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d2e]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All statuses</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard 
              key={report.id} 
              report={report} 
              onResolve={handleResolve} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">
            No reports found matching criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;