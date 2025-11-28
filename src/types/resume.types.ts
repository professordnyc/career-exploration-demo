export type ResumeStatus = 'pending' | 'reviewed' | 'approved';

export interface Resume {
  id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  parsed_content?: string;
  skills_extracted?: string[];
  status: ResumeStatus;
  version: number;
  created_at: string;
}

export interface ResumeData {
  name: string;
  education: string;
  skills: string[];
  experiences: {
    role: string;
    organization: string;
  }[];
}
