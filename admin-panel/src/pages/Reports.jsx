import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react'; 
import ReportCard from '../components/common/ReportCard';
import { getAllReports } from '../api/adminApi'; 

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [reportsData, setReportsData] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      setReportsData(actualData);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id) => {
    try {
      setReportsData(prevData => 
        prevData.map(report => 
          report._id === id ? { ...report, status: 'resolved' } : report
        )
      );
    } catch (error) {
      console.error("Error resolving report:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        setReportsData(prevData => prevData.filter(report => report._id !== id));
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };

  const filteredReports = reportsData.filter(report => {
    const targetName = report?.providerId?.businessName || '';
    const reporterName = report?.reporterId?.name || '';
    const reasonText = report?.reason || '';
    const currentType = report?.reportType || '';
    const currentStatus = report?.status || 'pending';

    const matchesSearch = targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reasonText.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = reportTypeFilter === 'All types' || 
                        currentType.replace('_', ' ').toLowerCase() === reportTypeFilter.toLowerCase();
    
    const matchesStatus = statusFilter === 'All statuses' || 
                          currentStatus.toLowerCase() === statusFilter.toLowerCase();

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
              <option value="All types">All types</option>
              <option value="spam">SPAM</option>
              <option value="unusual activity">UNUSUAL ACTIVITY</option>
              <option value="fraud">FRAUD</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2 md:w-40">
            <label className="text-xs text-gray-500 mb-1 font-medium">Status</label>
            <select
              className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d2e]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-[#0f3d2e]" size={36} />
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filteredReports.map((report) => (
            <ReportCard 
              key={report._id} 
              report={report} 
              onResolve={handleResolve} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">
          No reports found matching criteria.
        </div>
      )}
    </div>
  );
};

export default Reports;