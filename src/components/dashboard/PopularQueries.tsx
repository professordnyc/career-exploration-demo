import React from 'react';
import { Card } from '../shared';
import { TrendingUp } from 'lucide-react';

interface PopularQueriesProps {
  queries: string[];
}

export const PopularQueries: React.FC<PopularQueriesProps> = ({ queries }) => {
  return (
    <Card title="Popular Student Queries">
      <div className="space-y-3">
        {queries.map((query, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{query}</p>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        ))}
      </div>
    </Card>
  );
};
