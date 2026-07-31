import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AuthContext'; 

const Header = () => {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdmin(); 

  const handleLogout = () => {
    logoutAdmin();
    navigate('/', { replace: true });
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-6 z-10 w-full">
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all active:scale-95 cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default Header;