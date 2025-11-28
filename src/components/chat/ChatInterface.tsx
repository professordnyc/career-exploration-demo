import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Button, Card, LoadingSpinner } from '../shared';
import { Send, Bot } from 'lucide-react';
import type { Message } from '../../types/chat.types';
import type { ResumeData } from '../../types/resume.types';
import type { Badge } from '../../types/badge.types';
import { DataService } from '../../services/data.service';
import { ResumeService } from '../../services/resume.service';
import { BadgeService } from '../../services/badge.service';
import { BadgeNotification } from '../badges';
import type { AlumniOutcome, JobPosting } from '../../types/alumni.types';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      conversation_id: 'conv-1',
      role: 'assistant',
      content:
        "Hi Alex! I'm your career counseling assistant. I've reviewed your resume and can help you explore career paths, prepare for interviews, or connect you with alumni in your field of interest. What would you like to discuss today?",
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [alumniData, setAlumniData] = useState<AlumniOutcome[]>([]);
  const [jobsData, setJobsData] = useState<JobPosting[]>([]);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadData = async () => {
      const resumeResponse = await fetch('/mock_resume.json');
      const resume: ResumeData = await resumeResponse.json();
      setResumeData(resume);

      const major = ResumeService.extractMajor(resume);
      const alumni = await DataService.getMatchingAlumniByMajor(major);
      setAlumniData(alumni);

      const jobs = await DataService.getMatchingJobsBySkills(resume.skills);
      setJobsData(jobs);
    };

    loadData();
  }, []);

  const getMockResponse = (userMessage: string): string => {
    if (!resumeData) return 'Loading your profile data...';

    const lowerMessage = userMessage.toLowerCase();
    const major = ResumeService.extractMajor(resumeData);

    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      const relevantAlumni = alumniData.length > 0 ? alumniData[0] : null;
      let response = `Based on your background in ${major} and your skills (${resumeData.skills.join(', ')}), here are some insights:\n\n`;

      if (relevantAlumni) {
        response += `📊 Alumni Outcomes for ${relevantAlumni.major} majors:\n`;
        response += `• Industry: ${relevantAlumni.industry}\n`;
        response += `• Median Salary: $${relevantAlumni.medianSalary.toLocaleString()}\n`;
        response += `• Top Skills: ${relevantAlumni.topSkills.join(', ')}\n\n`;
      }

      if (jobsData.length > 0) {
        response += `💼 Matching Job Opportunities:\n`;
        jobsData.forEach(job => {
          const matchPercent = DataService.calculateSkillMatch(resumeData.skills, job.skills_required);
          response += `\n• ${job.title} at ${job.company}\n`;
          response += `  Location: ${job.location}\n`;
          response += `  Skills Match: ${matchPercent}%\n`;
          response += `  Required: ${job.skills_required.join(', ')}\n`;
        });
      }

      response += `\nYour experience at ${resumeData.experiences.map(e => e.organization).join(' and ')} gives you strong credentials. Would you like more details about any of these opportunities?`;
      return response;
    }

    if (lowerMessage.includes('alumni')) {
      if (alumniData.length === 0) {
        return `I'm currently loading alumni data for ${major} majors. This information will help you understand career paths taken by graduates in your field.`;
      }

      let response = `Here's what I found about alumni with your major (${major}):\n\n`;
      alumniData.forEach(alumni => {
        response += `📚 ${alumni.major} → ${alumni.industry}\n`;
        response += `• Median Salary: $${alumni.medianSalary.toLocaleString()}\n`;
        response += `• Key Skills: ${alumni.topSkills.join(', ')}\n\n`;
      });

      response += `This data can help you understand industry expectations and salary ranges in your field.`;
      return response;
    }

    if (lowerMessage.includes('skills') || lowerMessage.includes('improve')) {
      const userSkills = resumeData.skills;
      const allRequiredSkills = new Set<string>();

      jobsData.forEach(job => {
        job.skills_required.forEach(skill => allRequiredSkills.add(skill));
      });

      const missingSkills = Array.from(allRequiredSkills).filter(
        skill => !userSkills.some(us => us.toLowerCase().includes(skill.toLowerCase()))
      );

      let response = `Your current skills: ${userSkills.join(', ')}\n\n`;

      if (missingSkills.length > 0) {
        response += `Based on current job postings, consider developing:\n`;
        missingSkills.forEach(skill => {
          response += `• ${skill}\n`;
        });
        response += `\nThese skills appear frequently in jobs matching your profile.`;
      } else {
        response += `Great news! Your skills align well with current job requirements. Consider deepening your expertise in ${userSkills[0]} and ${userSkills[1]} to stand out even more.`;
      }

      return response;
    }

    if (lowerMessage.includes('interview')) {
      return `Great question! For roles in ${major}-related fields, interviewers typically assess:\n\n• Your practical experience (like at ${resumeData.experiences[0]?.organization})\n• Technical skills: ${resumeData.skills.slice(0, 2).join(', ')}\n• Problem-solving and communication abilities\n• Passion for the field\n\nI can help you prepare specific answers based on your background. What type of role are you interviewing for?`;
    }

    return `That's an interesting question! Based on your ${major} background and experience at ${resumeData.experiences[0]?.organization}, I can provide guidance on career paths, skill development, or connecting with alumni in related fields. Could you tell me more about what specific aspect you'd like to explore?`;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      conversation_id: 'conv-1',
      role: 'user',
      content: inputValue,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    const lowerInput = currentInput.toLowerCase();
    if (lowerInput.includes('alumni')) {
      BadgeService.trackAlumniPathExplored();
    }
    if (lowerInput.includes('skill') || lowerInput.includes('improve')) {
      BadgeService.trackSkillGapIdentified();
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      conversation_id: 'conv-1',
      role: 'assistant',
      content: getMockResponse(currentInput),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    const newBadges = await BadgeService.checkAndAwardBadges();
    if (newBadges.length > 0) {
      setTimeout(() => setEarnedBadge(newBadges[0]), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'What career paths match my background?',
    'How can I improve my skills?',
    'Help me prepare for interviews',
  ];

  const handleSuggestedClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">AI Career Assistant</h2>
        <p className="text-gray-600 mt-1">
          Get personalized career guidance based on your profile
        </p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <LoadingSpinner size="sm" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedClick(question)}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded-lg border border-gray-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 border-t pt-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about career paths, skills, or interview preparation..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="self-end"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {earnedBadge && (
        <BadgeNotification
          badge={earnedBadge}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </div>
  );
};
