import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut
} from 'lucide-react';

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin logout?');
    if (confirmed) {
      // Hapus token jika ada, lalu redirect ke login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  };
  

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Proyek', icon: <FolderKanban size={20} />, path: '/projects' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-16'
      } flex flex-col justify-between shadow-2xl`}
    >
      <div className="relative flex-1 flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 top-6 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        >
          <Menu size={18} />
        </button>

        {/* Header */}
        {isOpen && (
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Manajemen Proyek
                </h1>
                <p className="text-slate-400 text-sm mt-1">Sistem Manajemen Proyek</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`${isOpen ? 'mt-4' : 'mt-16'} px-3 flex-1 overflow-hidden`}>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center p-4 rounded-2xl transition-all duration-200 group hover:bg-slate-700/50 hover:shadow-lg hover:translate-x-1 ${
                    !isOpen ? 'justify-center' : ''
                  } ${location.pathname.startsWith(item.path.split(':')[0]) ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' : ''}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                    location.pathname.startsWith(item.path.split(':')[0]) 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                  }`}>
                    {item.icon}
                  </div>
                  {isOpen && (
                    <div className="flex items-center justify-between w-full ml-4">
                      <span className="font-medium text-lg">{item.name}</span>
                      {location.pathname.startsWith(item.path.split(':')[0]) && (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg" />
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="p-3 border-t border-slate-700/50">

        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-4 rounded-2xl hover:bg-red-600/20 transition-all duration-200 group ${
            !isOpen && 'justify-center'
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700/50 group-hover:bg-red-600/30 transition-colors">
            <LogOut size={20} />
          </div>
          {isOpen && <span className="ml-4 font-medium text-lg">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
