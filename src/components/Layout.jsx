import React, { useState } from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
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
          marginLeft: isSidebarOpen ? '18rem' : '4rem', // 72 = 18rem, 16 = 4rem
          width: isSidebarOpen ? 'calc(100% - 18rem)' : 'calc(100% - 4rem)',
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
