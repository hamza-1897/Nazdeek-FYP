import React from 'react';
import { Home, Users, Settings, ChartBarStacked, ShieldCheck, ChevronLeft, ChevronRight, Flag, Mail } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { label: 'Dashboard', icon: Home, to: '/admin/dashboard' },
    { label: 'Users', icon: Users, to: '/admin/users' },
    { label: 'Providers', icon: Users, to: '/admin/providers' },
    { label: 'Reports', icon: Flag, to: '/admin/reports' },
    { label: 'Email User', icon: Mail, to: '/admin/email' },
    { label: 'Categories', icon: ChartBarStacked, to: '/admin/categories' },
    { label: 'Settings', icon: Settings, to: '/admin/settings' },
  ];

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'
        } bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col relative z-20`}
    >
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <div className="w-10 h-10 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 shadow-md shadow-indigo-200">
          <span className="text-xl font-bold text-white transform -rotate-3">N</span>
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-2xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap overflow-hidden">
            Nazdeek
          </span>
        )}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 hover:shadow text-gray-500 z-50 hidden md:flex transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 scrllbar-hide">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            end={item.label === 'Dashboard'}
          />
        ))}

      </div>
    </aside>
  );
};

export default Sidebar;
