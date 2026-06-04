import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Login from '../../pages/Login';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;