import type { Badge, BadgeId, UserProgress } from '../types/badge.types';

export class BadgeService {
  private static badges: Badge[] | null = null;
  private static progress: UserProgress = {
    alumniPathsExplored: 0,
    skillGapsIdentified: 0,
    resumeUploaded: false,
  };

  private static listeners: Set<(badges: Badge[]) => void> = new Set();

  static async loadBadges(): Promise<Badge[]> {
    if (this.badges) {
      return this.badges;
    }

    try {
      const response = await fetch('/mock_badges.json');
      this.badges = await response.json();
      return this.badges;
    } catch (error) {
      console.error('Error loading badges:', error);
      return [];
    }
  }

  static async getBadges(): Promise<Badge[]> {
    return await this.loadBadges();
  }

  static async earnBadge(badgeId: BadgeId): Promise<Badge | null> {
    const badges = await this.loadBadges();
    const badge = badges.find(b => b.id === badgeId);

    if (badge && !badge.earned) {
      badge.earned = true;
      badge.earnedAt = new Date().toISOString();

      this.notifyListeners(badges);
      return badge;
    }

    return null;
  }

  static async checkAndAwardBadges(): Promise<Badge[]> {
    const newlyEarned: Badge[] = [];

    if (this.progress.resumeUploaded) {
      const badge = await this.earnBadge('badge_resume_upload');
      if (badge) newlyEarned.push(badge);
    }

    if (this.progress.alumniPathsExplored >= 3) {
      const badge = await this.earnBadge('badge_alumni_paths');
      if (badge) newlyEarned.push(badge);
    }

    if (this.progress.skillGapsIdentified >= 1) {
      const badge = await this.earnBadge('badge_skill_builder');
      if (badge) newlyEarned.push(badge);
    }

    return newlyEarned;
  }

  static trackResumeUpload(): void {
    this.progress.resumeUploaded = true;
    this.checkAndAwardBadges();
  }

  static trackAlumniPathExplored(): void {
    this.progress.alumniPathsExplored += 1;
    this.checkAndAwardBadges();
  }

  static trackSkillGapIdentified(): void {
    this.progress.skillGapsIdentified += 1;
    this.checkAndAwardBadges();
  }

  static getProgress(): UserProgress {
    return { ...this.progress };
  }

  static subscribe(callback: (badges: Badge[]) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private static notifyListeners(badges: Badge[]): void {
    this.listeners.forEach(callback => callback(badges));
  }

  static async getEarnedBadges(): Promise<Badge[]> {
    const badges = await this.loadBadges();
    return badges.filter(b => b.earned);
  }

  static async getUnearnedBadges(): Promise<Badge[]> {
    const badges = await this.loadBadges();
    return badges.filter(b => !b.earned);
  }
}
