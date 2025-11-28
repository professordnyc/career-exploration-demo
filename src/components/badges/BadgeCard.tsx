import React from 'react';
import { Award, Lock } from 'lucide-react';
import type { Badge } from '../../types/badge.types';

interface BadgeCardProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
        badge.earned
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${
          badge.earned
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg'
            : 'bg-gray-300'
        }`}
      >
        {badge.earned ? (
          <Award className={`${iconSizes[size]} text-white`} />
        ) : (
          <Lock className={`${iconSizes[size]} text-gray-500`} />
        )}
      </div>

      <div className="text-center">
        <p
          className={`font-semibold ${
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          } ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}
        >
          {badge.name}
        </p>
        <p
          className={`${
            size === 'sm' ? 'text-xs' : 'text-xs'
          } text-gray-600 mt-1`}
        >
          {badge.description}
        </p>
        {badge.id === 'badge_alumni_paths' && !badge.earned && (
          <p className="text-xs text-blue-600 mt-1 font-medium">
            Coming Soon
          </p>
        )}
      </div>

      {badge.earned && badge.earnedAt && (
        <p className="text-xs text-yellow-700 font-medium">
          Earned {new Date(badge.earnedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};
