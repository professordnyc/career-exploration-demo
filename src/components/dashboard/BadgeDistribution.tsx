import React from 'react';
import { Card } from '../shared';
import { Award } from 'lucide-react';

interface BadgeDistributionProps {
  badgesEarned: Record<string, number>;
}

export const BadgeDistribution: React.FC<BadgeDistributionProps> = ({
  badgesEarned,
}) => {
  const total = Object.values(badgesEarned).reduce((sum, count) => sum + count, 0);
  const entries = Object.entries(badgesEarned).sort((a, b) => b[1] - a[1]);

  const colors = [
    { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' },
    { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' },
    { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' },
  ];

  return (
    <Card title="Badge Distribution">
      <div className="space-y-4">
        {entries.map(([badgeName, count], index) => {
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          const colorSet = colors[index % colors.length];

          return (
            <div key={badgeName} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${colorSet.bg} flex items-center justify-center`}>
                    <Award className={`w-4 h-4 ${colorSet.text}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {badgeName}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colorSet.bar} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Total Badges</span>
            <span className="text-lg font-bold text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
