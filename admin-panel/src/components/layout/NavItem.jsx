import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, label, isCollapsed, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 mx-2 my-1 rounded-xl transition-all duration-200 group ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
            : 'text-gray-500 hover:bg-gray-100/80 hover:text-indigo-600'
        }`
      }
      title={isCollapsed ? label : undefined}
    >
      <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110`} />
      
      {!isCollapsed && (
        <span className="font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;
