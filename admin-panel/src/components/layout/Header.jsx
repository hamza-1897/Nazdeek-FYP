import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AuthContext'; 

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useAdmin(); 

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 w-full">
      <div className="flex items-center">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          title="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

     <div className="flex items-center gap-6">
      

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;