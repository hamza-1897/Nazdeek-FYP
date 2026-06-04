import React, { useRef } from 'react';
import { Menu, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // A mock state for the image to show interactivity, though it would usually sit in a global context.
  const [profilePic, setProfilePic] = React.useState('https://i.pravatar.cc/150?img=11');

  const handleLogout = () => {
    // Implement actual logout logic here
    navigate('/');
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL just for the preview
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10">
      {/* Left section: Mobile Toggle */}
      <div className="flex items-center">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          title="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right section: Profile & Logout */}
      <div className="flex items-center gap-6">
        
        {/* Admin Profile Area */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right  sm:flex">
            <span className="text-sm font-bold text-gray-900">Maha Naseer</span>
            <span className="text-xs font-medium text-indigo-600">Super Admin</span>
          </div>
          
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <img 
              src={profilePic} 
              alt="Admin Profile" 
              className="w-12 h-12 rounded-full border-2 border-indigo-100 object-cover group-hover:border-indigo-300 transition-colors"
            />
            {/* Edit overlay on hover */}
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
            
            {/* Hidden file input for image upload */}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 focus:outline-hidden transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
