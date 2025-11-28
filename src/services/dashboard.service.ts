import type { DashboardMetrics } from '../types/dashboard.types';

export class DashboardService {
  private static metricsCache: DashboardMetrics | null = null;

  static async getMetrics(): Promise<DashboardMetrics> {
    if (this.metricsCache) {
      return this.metricsCache;
    }

    try {
      const response = await fetch('/mock_dashboard_metrics.json');
      this.metricsCache = await response.json();
      return this.metricsCache;
    } catch (error) {
      console.error('Error loading dashboard metrics:', error);
      return {
        total_resumes_uploaded: 0,
        top_skills: [],
        badges_earned: {},
        popular_queries: [],
      };
    }
  }

  static clearCache(): void {
    this.metricsCache = null;
  }

  static async getTotalResumesUploaded(): Promise<number> {
    const metrics = await this.getMetrics();
    return metrics.total_resumes_uploaded;
  }

  static async getTopSkills(): Promise<string[]> {
    const metrics = await this.getMetrics();
    return metrics.top_skills;
  }

  static async getBadgesEarned(): Promise<Record<string, number>> {
    const metrics = await this.getMetrics();
    return metrics.badges_earned;
  }

  static async getPopularQueries(): Promise<string[]> {
    const metrics = await this.getMetrics();
    return metrics.popular_queries;
  }

  static async getTotalBadgesEarned(): Promise<number> {
    const badges = await this.getBadgesEarned();
    return Object.values(badges).reduce((sum, count) => sum + count, 0);
  }
}
