import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar'; 

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;