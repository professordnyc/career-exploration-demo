import React from 'react';
import { Card } from '../shared';

interface SkillsChartProps {
  skills: string[];
}

export const SkillsChart: React.FC<SkillsChartProps> = ({ skills }) => {
  const maxValue = 100;
  const values = skills.map((_, index) => maxValue - index * 15);

  return (
    <Card title="Top Skills in Demand">
      <div className="space-y-4">
        {skills.map((skill, index) => {
          const percentage = values[index];

          return (
            <div key={skill}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{skill}</span>
                <span className="text-sm text-gray-500">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
