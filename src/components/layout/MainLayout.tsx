import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: (activePage: 'dashboard' | 'resume' | 'chat' | 'badges') => React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState<'dashboard' | 'resume' | 'chat' | 'badges'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 p-8">
          {children(activePage)}
        </main>
      </div>
    </div>
  );
};
