import React, { useEffect, useState } from 'react';
import { MetricCard } from './MetricCard';
import { SkillsChart } from './SkillsChart';
import { BadgeDistribution } from './BadgeDistribution';
import { PopularQueries } from './PopularQueries';
import { LoadingSpinner } from '../shared';
import { DashboardService } from '../../services/dashboard.service';
import type { DashboardMetrics } from '../../types/dashboard.types';
import { FileText, Award, TrendingUp, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      const data = await DashboardService.getMetrics();
      setMetrics(data);
      setLoading(false);
    };

    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-gray-600">
        Failed to load dashboard metrics
      </div>
    );
  }

  const totalBadges = Object.values(metrics.badges_earned).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Platform insights and key metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Resumes"
          value={metrics.total_resumes_uploaded}
          icon={FileText}
          description="Uploaded by students"
          trend={{ value: 12, isPositive: true }}
        />

        <MetricCard
          title="Badges Earned"
          value={totalBadges}
          icon={Award}
          description="Across all students"
          trend={{ value: 8, isPositive: true }}
        />

        <MetricCard
          title="Top Skills"
          value={metrics.top_skills.length}
          icon={TrendingUp}
          description="Most in-demand"
        />

        <MetricCard
          title="Active Users"
          value="125"
          icon={Users}
          description="This week"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsChart skills={metrics.top_skills} />
        <BadgeDistribution badgesEarned={metrics.badges_earned} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularQueries queries={metrics.popular_queries} />

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Platform Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Career Interest Trends</p>
                <p className="text-sm text-blue-100 mt-1">
                  Data science and tech roles showing 45% increase in student
                  queries
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Engagement Growth</p>
                <p className="text-sm text-blue-100 mt-1">
                  80% of students earn their first badge within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Alumni Connections</p>
                <p className="text-sm text-blue-100 mt-1">
                  Students exploring 3+ alumni paths show higher career clarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
