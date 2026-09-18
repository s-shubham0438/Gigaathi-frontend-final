import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/components/shell/Navbar';
import Footer from '../../shared/components/shell/Footer';
import Toast from '../../shared/components/shell/Toast';

export const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default PublicLayout;
