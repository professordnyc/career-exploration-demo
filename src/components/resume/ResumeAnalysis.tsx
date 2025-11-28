import React, { useEffect, useState } from 'react';
import { Card } from '../shared';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import type { ResumeData } from '../../types/resume.types';
import type { AlumniOutcome, JobPosting } from '../../types/alumni.types';
import { DataService } from '../../services/data.service';
import { ResumeService } from '../../services/resume.service';

interface ResumeAnalysisProps {
  resumeData: ResumeData;
}

export const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ resumeData }) => {
  const [alumni, setAlumni] = useState<AlumniOutcome[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const major = ResumeService.extractMajor(resumeData);
      const alumniData = await DataService.getMatchingAlumniByMajor(major);
      const jobsData = await DataService.getMatchingJobsBySkills(resumeData.skills);

      setAlumni(alumniData);
      setJobs(jobsData);
      setLoading(false);
    };

    loadData();
  }, [resumeData]);

  if (loading) {
    return (
      <div className="mt-6">
        <Card>
          <p className="text-gray-600">Loading career insights...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {alumni.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Alumni Outcomes</h3>
          </div>

          <div className="space-y-3">
            {alumni.map((alum, index) => (
              <div
                key={index}
                className="p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {alum.major} → {alum.industry}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Median Salary: ${alum.medianSalary.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>

                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Top Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {alum.topSkills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-0.5 bg-white text-xs text-blue-700 rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {jobs.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Matching Job Opportunities</h3>
          </div>

          <div className="space-y-3">
            {jobs.map((job, index) => {
              const matchPercent = DataService.calculateSkillMatch(
                resumeData.skills,
                job.skills_required
              );

              return (
                <div
                  key={index}
                  className="p-4 bg-green-50 rounded-lg border border-green-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {matchPercent}%
                      </p>
                      <p className="text-xs text-gray-600">Match</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Required Skills:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {job.skills_required.map((skill, skillIndex) => {
                        const hasSkill = resumeData.skills.some(
                          (userSkill) =>
                            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                            skill.toLowerCase().includes(userSkill.toLowerCase())
                        );

                        return (
                          <span
                            key={skillIndex}
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              hasSkill
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-300'
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
