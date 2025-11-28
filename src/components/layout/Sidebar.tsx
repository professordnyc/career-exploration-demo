import React from 'react';
import { FileText, MessageSquare, Award, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activePage: 'dashboard' | 'resume' | 'chat' | 'badges';
  onPageChange: (page: 'dashboard' | 'resume' | 'chat' | 'badges') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'resume' as const, label: 'Resume', icon: FileText },
    { id: 'chat' as const, label: 'AI Assistant', icon: MessageSquare },
    { id: 'badges' as const, label: 'Badges', icon: Award },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors text-left
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
