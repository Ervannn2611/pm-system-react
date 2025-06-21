import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className="transition-all duration-500 overflow-auto p-6"
        style={{
          marginLeft: isSidebarOpen ? '18rem' : '4rem',
          width: isSidebarOpen ? 'calc(100% - 18rem)' : 'calc(100% - 4rem)',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
