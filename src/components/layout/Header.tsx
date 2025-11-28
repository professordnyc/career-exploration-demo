import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Career Counseling Platform
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Alex Student</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              AS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
