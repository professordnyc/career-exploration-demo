import React, { useEffect, useState } from 'react';
import { Award, X } from 'lucide-react';
import type { Badge } from '../../types/badge.types';

interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  badge,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-sm transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-2xl p-4 border-2 border-yellow-300">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Award className="w-7 h-7 text-yellow-500" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm mb-1">Badge Unlocked!</p>
            <p className="font-semibold text-yellow-900">{badge.name}</p>
            <p className="text-xs text-yellow-800 mt-1">{badge.description}</p>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-yellow-900 hover:text-yellow-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
