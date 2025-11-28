export interface DashboardMetrics {
  total_resumes_uploaded: number;
  top_skills: string[];
  badges_earned: Record<string, number>;
  popular_queries: string[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  icon?: string;
  description?: string;
}
