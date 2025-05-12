
import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
