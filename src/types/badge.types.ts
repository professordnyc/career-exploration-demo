export type BadgeId = 'badge_resume_upload' | 'badge_alumni_paths' | 'badge_skill_builder';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface UserProgress {
  alumniPathsExplored: number;
  skillGapsIdentified: number;
  resumeUploaded: boolean;
}
