import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Grid, Settings } from 'lucide-react';
import { useAdmin } from '../../context/AuthContext'; 

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const { admin } = useAdmin(); 


  const navItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', name: 'Users', icon: Users },
    { path: '/admin/categories', name: 'Categories', icon: Grid },
    { path: '/admin/settings', name: 'Settings', icon: Settings }
  ];

  return (
    <aside className={`bg-[#0D4D47] text-white h-screen transition-all duration-300 flex flex-col
      ${isCollapsed ? 'w-20' : 'w-64'} md:flex hidden`}
    >
      {/* Brand Logo Section */}
      <div className="h-20 flex items-center justify-center border-b border-[#0a3a35] px-6">
        <h1 className={`font-black tracking-wider transition-all ${isCollapsed ? 'text-lg' : 'text-2xl'}`}>
          {isCollapsed ? 'NZ' : 'Nazdeek'}
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Exact and active path tracking logic
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-white text-[#0D4D47] shadow-lg font-bold' 
                  : 'text-gray-200 hover:bg-[#0a3a35] hover:text-white'}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && admin && (
        <div className="p-4 border-t border-[#0a3a35] bg-[#0a3a35] text-center">
          <p className="text-xs text-gray-300">Logged in as</p>
          <p className="text-sm font-bold truncate">{admin.name || 'Admin'}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;