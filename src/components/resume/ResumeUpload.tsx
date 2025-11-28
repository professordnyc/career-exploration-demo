import React, { useState } from 'react';
import { FileUploader, Card, Button, LoadingSpinner } from '../shared';
import { CheckCircle } from 'lucide-react';
import type { ResumeData } from '../../types/resume.types';
import type { Badge } from '../../types/badge.types';
import { ResumeAnalysis } from './ResumeAnalysis';
import { ResumeService } from '../../services/resume.service';
import { BadgeService } from '../../services/badge.service';
import { BadgeNotification } from '../badges';

export const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploadSuccess(false);
    setResumeData(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    const parsedData = await ResumeService.parseResume(file);

    setResumeData(parsedData);
    setUploadSuccess(true);
    setIsUploading(false);

    BadgeService.trackResumeUpload();
    const newBadges = await BadgeService.checkAndAwardBadges();
    if (newBadges.length > 0) {
      setEarnedBadge(newBadges[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upload Resume</h2>
        <p className="text-gray-600 mt-1">
          Upload your resume to get personalized career guidance
        </p>
      </div>

      <Card>
        <FileUploader
          onFileSelect={handleFileSelect}
          accept=".pdf,.doc,.docx"
          maxSize={10485760}
          disabled={isUploading}
        />

        {file && !uploadSuccess && (
          <div className="mt-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button onClick={handleUpload} isLoading={isUploading}>
                Upload
              </Button>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="mt-4 flex flex-col items-center gap-2 py-8">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-gray-600">Processing your resume...</p>
          </div>
        )}

        {uploadSuccess && resumeData && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Resume uploaded successfully!</span>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Resume Analysis
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-gray-900">{resumeData.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Education</p>
                  <p className="text-gray-900">{resumeData.education}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Skills Identified
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Experience
                  </p>
                  <div className="space-y-2">
                    {resumeData.experiences.map((exp, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">{exp.role}</p>
                        <p className="text-sm text-gray-600">
                          {exp.organization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {uploadSuccess && resumeData && <ResumeAnalysis resumeData={resumeData} />}

      {earnedBadge && (
        <BadgeNotification
          badge={earnedBadge}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </div>
  );
};
