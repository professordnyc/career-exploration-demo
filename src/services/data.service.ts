import { parseCSV, parseSkillsString } from '../utils/csvParser';
import type { AlumniOutcome, JobPosting } from '../types/alumni.types';

export class DataService {
  private static alumniCache: AlumniOutcome[] | null = null;
  private static jobsCache: JobPosting[] | null = null;

  static async getAlumniOutcomes(): Promise<AlumniOutcome[]> {
    if (this.alumniCache) {
      return this.alumniCache;
    }

    try {
      const response = await fetch('/mock_alumni_outcomes.csv');
      const csvText = await response.text();
      const parsed = parseCSV(csvText);

      this.alumniCache = parsed.rows.map(row => ({
        major: row.Major,
        industry: row.Industry,
        medianSalary: parseInt(row.MedianSalary),
        topSkills: parseSkillsString(row.TopSkills),
      }));

      return this.alumniCache;
    } catch (error) {
      console.error('Error loading alumni outcomes:', error);
      return [];
    }
  }

  static async getJobPostings(): Promise<JobPosting[]> {
    if (this.jobsCache) {
      return this.jobsCache;
    }

    try {
      const response = await fetch('/mock_job_postings.json');
      this.jobsCache = await response.json();
      return this.jobsCache;
    } catch (error) {
      console.error('Error loading job postings:', error);
      return [];
    }
  }

  static async getMatchingAlumniByMajor(major: string): Promise<AlumniOutcome[]> {
    const alumni = await this.getAlumniOutcomes();
    return alumni.filter(a =>
      a.major.toLowerCase().includes(major.toLowerCase())
    );
  }

  static async getMatchingJobsBySkills(skills: string[]): Promise<JobPosting[]> {
    const jobs = await this.getJobPostings();
    const lowerSkills = skills.map(s => s.toLowerCase());

    return jobs.filter(job => {
      const jobSkills = job.skills_required.map(s => s.toLowerCase());
      return jobSkills.some(js =>
        lowerSkills.some(us => js.includes(us) || us.includes(js))
      );
    });
  }

  static calculateSkillMatch(userSkills: string[], requiredSkills: string[]): number {
    const lowerUserSkills = userSkills.map(s => s.toLowerCase());
    const lowerRequiredSkills = requiredSkills.map(s => s.toLowerCase());

    const matches = lowerRequiredSkills.filter(rs =>
      lowerUserSkills.some(us => us.includes(rs) || rs.includes(us))
    );

    return Math.round((matches.length / lowerRequiredSkills.length) * 100);
  }
}
