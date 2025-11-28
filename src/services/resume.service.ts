import type { ResumeData } from '../types/resume.types';

export class ResumeService {
  static async parseResume(file: File): Promise<ResumeData> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponse = await fetch('/mock_resume.json');
    const mockData: ResumeData = await mockResponse.json();

    return mockData;
  }

  static extractSkills(resumeData: ResumeData): string[] {
    return resumeData.skills;
  }

  static extractMajor(resumeData: ResumeData): string {
    const education = resumeData.education.toLowerCase();

    if (education.includes('psychology')) return 'Psychology';
    if (education.includes('computer science') || education.includes('cs')) return 'Computer Science';
    if (education.includes('biology')) return 'Biology';
    if (education.includes('business')) return 'Business';

    return 'General';
  }

  static formatResumeForContext(resumeData: ResumeData): string {
    return `
Name: ${resumeData.name}
Education: ${resumeData.education}
Skills: ${resumeData.skills.join(', ')}
Experience:
${resumeData.experiences.map(exp => `- ${exp.role} at ${exp.organization}`).join('\n')}
    `.trim();
  }
}
