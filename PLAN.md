# Career Counseling Platform MVP - Implementation Plan

## Project Overview

A comprehensive career counseling platform featuring resume uploads, AI-powered chat assistance with alumni and job market data, private gamification system, counselor dashboard, and pre-built curriculum prompt templates.

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React (icons)
- **Backend**: Supabase (Database, Authentication, Storage)
- **AI Provider**: Flexible abstraction layer (OpenAI, Anthropic Claude, or others)
- **Build Tool**: Vite
- **State Management**: React Context API + Custom Hooks

---

## 2-Phased Development Approach

### Phase 1: Planning ✓ COMPLETED
- Comprehensive project plan created
- Architecture and file structure defined
- Database schema designed
- This PLAN.md serves as the reference guide

### Phase 2: Module-by-Module Implementation (IN PROGRESS)

**Important**: Code will be implemented incrementally based on specific module instructions provided by the user.

**Workflow**:
1. User provides execution instructions for a specific module
2. User may upload or paste mock files (sample data, test files, configurations)
3. Implementation of that specific module only
4. Testing and validation of the module
5. Proceed to next module based on user direction

**Modules Available for Implementation**:
1. Foundation & Configuration
2. Database Schema & Migrations
3. AI Service Abstraction Layer
4. Authentication & User Management
5. Resume Upload & Management
6. AI Chat Assistant
7. Gamification System (Private)
8. Counselor Dashboard
9. Curriculum Prompts (Pre-built Templates)
10. Shared UI Components & Layouts
11. Security & Performance Optimization

---

## Key Requirements

### 1. AI Provider Flexibility
- Abstraction layer supporting multiple AI providers
- Easy switching between OpenAI, Anthropic Claude, or future providers
- Consistent interface regardless of underlying provider
- Environment variable configuration for provider selection

### 2. Private Gamification
- Students see only their own points, badges, and achievements
- No student-to-student visibility of gamification data
- Counselors have full visibility of all students' gamification metrics
- Leaderboard visible only to counselors

### 3. Pre-built Curriculum Prompts
- Library of 20-30 career development prompt templates
- Categories: self-assessment, goal-setting, skills-inventory, networking, job-search
- Templates include variable placeholders that auto-populate with student data
- Counselors assign templates to students with due dates

---

## File Structure

```
/project
├── .env                           # Production environment variables (exists)
├── .env.local                     # Local development overrides
├── .env.example                   # Documented template for team
├── .gitignore                     # Git ignore rules (exists, needs logs/ added)
├── PLAN.md                        # This file - project reference guide
├── logs/                          # Application logs (git ignored)
│   ├── error.log
│   ├── access.log
│   └── debug.log
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── index.ts
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── PasswordReset.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── OnboardingWizard.tsx
│   │   ├── resume/
│   │   │   ├── index.ts
│   │   │   ├── ResumeUpload.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── ResumeAnalysis.tsx
│   │   │   └── ResumeHistory.tsx
│   │   ├── chat/
│   │   │   ├── index.ts
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── SuggestedQuestions.tsx
│   │   │   ├── ChatHistory.tsx
│   │   │   └── CitationList.tsx
│   │   ├── gamification/
│   │   │   ├── index.ts
│   │   │   ├── PointsDisplay.tsx
│   │   │   ├── BadgeCollection.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── AchievementNotification.tsx
│   │   │   └── EngagementStats.tsx
│   │   ├── counselor/
│   │   │   ├── index.ts
│   │   │   ├── StudentList.tsx
│   │   │   ├── StudentProfile.tsx
│   │   │   ├── ResumeReview.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── ActivityLog.tsx
│   │   │   └── PrivateLeaderboard.tsx
│   │   ├── prompts/
│   │   │   ├── index.ts
│   │   │   ├── PromptLibrary.tsx
│   │   │   ├── PromptCard.tsx
│   │   │   ├── PromptAssignment.tsx
│   │   │   ├── PromptResponse.tsx
│   │   │   └── PromptAnalytics.tsx
│   │   ├── shared/
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── FileUploader.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Skeleton.tsx
│   │   └── layout/
│   │       ├── index.ts
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Footer.tsx
│   │       └── MainLayout.tsx
│   ├── pages/
│   │   ├── student/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ResumePage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   ├── AchievementsPage.tsx
│   │   │   ├── PromptsPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── counselor/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StudentsPage.tsx
│   │   │   ├── PromptsManagementPage.tsx
│   │   │   └── AnalyticsPage.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── services/
│   │   ├── supabase.ts
│   │   ├── auth.service.ts
│   │   ├── resume.service.ts
│   │   ├── ai/
│   │   │   ├── index.ts
│   │   │   ├── aiProvider.interface.ts
│   │   │   ├── openaiProvider.ts
│   │   │   ├── anthropicProvider.ts
│   │   │   └── aiFactory.ts
│   │   ├── gamification.service.ts
│   │   ├── chat.service.ts
│   │   └── prompts.service.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useResume.ts
│   │   ├── useChat.ts
│   │   ├── useGamification.ts
│   │   ├── useFileUpload.ts
│   │   └── usePrompts.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── resume.types.ts
│   │   ├── chat.types.ts
│   │   ├── gamification.types.ts
│   │   ├── prompts.types.ts
│   │   └── ai.types.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── fileHelpers.ts
│   │   ├── dateHelpers.ts
│   │   └── logger.ts
│   ├── constants/
│   │   ├── BADGES.ts
│   │   ├── POINTS_CONFIG.ts
│   │   ├── FILE_TYPES.ts
│   │   ├── ROUTES.ts
│   │   └── PROMPT_TEMPLATES.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── migrations/
│   │   ├── 001_create_users_and_profiles.sql
│   │   ├── 002_create_resume_tables.sql
│   │   ├── 003_create_gamification_tables.sql
│   │   ├── 004_create_chat_tables.sql
│   │   ├── 005_create_prompts_tables.sql
│   │   ├── 006_create_alumni_job_tables.sql
│   │   └── 007_setup_rls_policies.sql
│   └── seed.sql
└── package.json
```

---

## Module Implementation Details

### Module 1: Foundation & Configuration

**Purpose**: Set up project configuration, environment variables, and logging infrastructure

**Files to Create**:
- `.env.example` - Documented environment variable template
- `.env.local` - Local development configuration
- `logs/` folder structure
- Update `.gitignore` to include logs folder

**Environment Variables**:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Service Configuration
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key

# File Upload Configuration
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=.pdf,.doc,.docx

# Feature Flags
VITE_ENABLE_GAMIFICATION=true
VITE_ENABLE_LEADERBOARD=true

# Application Configuration
VITE_APP_NAME=Career Counseling Platform
VITE_APP_URL=http://localhost:5173
```

**Deliverables**:
- Environment configuration files
- Logging infrastructure
- Updated .gitignore

---

### Module 2: Database Schema & Migrations

**Purpose**: Create all database tables, relationships, and Row Level Security policies

**Database Tables**:

1. **profiles** - Extended user information
   - id (uuid, FK to auth.users)
   - role (enum: 'student', 'counselor')
   - full_name (text)
   - avatar_url (text)
   - created_at (timestamptz)
   - updated_at (timestamptz)

2. **resumes** - Resume storage and metadata
   - id (uuid)
   - user_id (uuid, FK to profiles)
   - file_url (text)
   - file_name (text)
   - file_size (int)
   - parsed_content (text)
   - skills_extracted (text[])
   - status (enum: 'pending', 'reviewed', 'approved')
   - version (int)
   - created_at (timestamptz)

3. **user_points** - Gamification points tracking
   - id (uuid)
   - user_id (uuid, FK to profiles)
   - points (int)
   - reason (text)
   - created_at (timestamptz)

4. **badges** - Badge definitions
   - id (uuid)
   - name (text)
   - description (text)
   - icon (text)
   - criteria (jsonb)
   - points_required (int)
   - created_at (timestamptz)

5. **user_badges** - User badge awards
   - id (uuid)
   - user_id (uuid, FK to profiles)
   - badge_id (uuid, FK to badges)
   - awarded_at (timestamptz)

6. **alumni_profiles** - Alumni career data
   - id (uuid)
   - full_name (text)
   - company (text)
   - role (text)
   - years_experience (int)
   - skills (text[])
   - career_path (jsonb)
   - contact_info (text)
   - created_at (timestamptz)

7. **job_postings** - Job market data
   - id (uuid)
   - title (text)
   - company (text)
   - description (text)
   - required_skills (text[])
   - salary_range (text)
   - location (text)
   - posted_at (timestamptz)

8. **curriculum_prompts** - Pre-built prompt templates
   - id (uuid)
   - title (text)
   - description (text)
   - category (enum: 'self_assessment', 'goal_setting', 'skills_inventory', 'networking', 'job_search')
   - prompt_text (text)
   - template_variables (text[])
   - points_reward (int)
   - created_at (timestamptz)

9. **prompt_assignments** - Assigned prompts to students
   - id (uuid)
   - prompt_id (uuid, FK to curriculum_prompts)
   - student_id (uuid, FK to profiles)
   - counselor_id (uuid, FK to profiles)
   - due_date (timestamptz)
   - assigned_at (timestamptz)

10. **prompt_responses** - Student responses to prompts
    - id (uuid)
    - assignment_id (uuid, FK to prompt_assignments)
    - response_text (text)
    - submitted_at (timestamptz)
    - counselor_feedback (text)
    - reviewed_at (timestamptz)

11. **chat_conversations** - Chat session tracking
    - id (uuid)
    - user_id (uuid, FK to profiles)
    - title (text)
    - created_at (timestamptz)
    - updated_at (timestamptz)

12. **chat_messages** - Individual chat messages
    - id (uuid)
    - conversation_id (uuid, FK to chat_conversations)
    - role (enum: 'user', 'assistant')
    - content (text)
    - context_data (jsonb)
    - created_at (timestamptz)

13. **activity_logs** - Audit trail for counselors
    - id (uuid)
    - user_id (uuid, FK to profiles)
    - action (text)
    - details (jsonb)
    - created_at (timestamptz)

**RLS Policies**:
- Students can only read/write their own data
- Counselors can read all student data
- Public read access for badges and curriculum_prompts
- No student-to-student data visibility

**Deliverables**:
- 7 migration SQL files in `supabase/migrations/`
- `seed.sql` with sample badges and curriculum prompts
- Complete RLS policy setup

---

### Module 3: AI Service Abstraction Layer

**Purpose**: Create flexible AI provider system supporting multiple vendors

**Components**:

1. **aiProvider.interface.ts** - Base interface
   ```typescript
   interface IAIProvider {
     generateChatResponse(messages: Message[], context: AIContext): Promise<string>;
     streamChatResponse(messages: Message[], context: AIContext): AsyncIterator<string>;
     countTokens(text: string): number;
   }
   ```

2. **openaiProvider.ts** - OpenAI implementation
3. **anthropicProvider.ts** - Anthropic Claude implementation
4. **aiFactory.ts** - Provider factory based on env variable
5. **AI context preparation** - Format resume, alumni, job data

**Deliverables**:
- Complete AI abstraction layer
- Provider switching via environment variable
- Context assembly utilities
- Prompt template library

---

### Module 4: Authentication & User Management

**Purpose**: Implement secure authentication and user profile management

**Components**:
- Supabase email/password authentication
- Login and registration forms
- Password reset flow
- Role-based routing (student vs counselor)
- User profile management
- Profile picture upload
- Onboarding wizard for new students

**Deliverables**:
- Authentication service
- Auth context and hooks
- Login/Register pages
- Protected route component
- Profile management UI

---

### Module 5: Resume Upload & Management

**Purpose**: Allow students to upload resumes and view analysis

**Features**:
- Drag-and-drop file upload
- File type validation (PDF, DOC, DOCX)
- File size validation (max 10MB)
- Supabase Storage integration
- Resume text parsing
- Skills extraction and display
- Version history tracking
- Resume status workflow

**Deliverables**:
- Resume upload component
- File validation utilities
- Resume parsing service
- Resume preview and analysis UI
- Resume history component

---

### Module 6: AI Chat Assistant

**Purpose**: Provide AI-powered career guidance using contextual data

**Features**:
- Real-time chat interface
- Streaming AI responses
- Context from resume, alumni profiles, and job postings
- Conversation history persistence
- Suggested questions based on user profile
- Citation system showing data sources
- Feedback mechanism (thumbs up/down)
- Multiple conversation threads

**Deliverables**:
- Chat interface components
- Message history management
- Context assembly from multiple data sources
- Suggested questions generator
- Citation display component

---

### Module 7: Gamification System (Private)

**Purpose**: Motivate student engagement through achievements

**Features**:
- Points awarded for actions (resume upload, chat usage, prompt completion)
- Badge system with unlock criteria
- Achievement notifications with animations
- Personal progress tracking
- NO student-to-student visibility
- Counselor access to all student gamification data
- Private leaderboard (counselor view only)

**Point Awards**:
- Resume upload: 50 points
- Resume approved: 100 points
- Chat message sent: 5 points
- Prompt completed: 75 points
- Profile completed: 25 points

**Badge Categories**:
- Getting Started (first actions)
- Engagement (consistent usage)
- Achiever (milestones reached)
- Career Ready (preparation complete)

**Deliverables**:
- Points calculation engine
- Badge definitions and unlock logic
- Achievement notification component
- Student gamification dashboard
- Counselor leaderboard view

---

### Module 8: Counselor Dashboard

**Purpose**: Provide comprehensive oversight of student progress

**Features**:
- Overview with aggregate metrics
- Student list with search and filters
- Individual student profiles with full history
- Resume review interface with annotations
- Analytics charts (engagement trends)
- Activity feed of recent actions
- Alert system for low engagement
- Bulk prompt assignment
- Data export (CSV)
- Calendar view for deadlines

**Deliverables**:
- Counselor overview dashboard
- Student list with advanced filtering
- Student profile detail view
- Resume review interface
- Analytics visualizations
- Activity log component

---

### Module 9: Curriculum Prompts (Pre-built Templates)

**Purpose**: Provide structured career development activities

**Template Categories**:
1. **Self-Assessment** (5-7 prompts)
   - Values identification
   - Strengths analysis
   - Interest exploration
   - Personality reflection

2. **Goal-Setting** (5-7 prompts)
   - Short-term career goals
   - Long-term vision
   - Action planning
   - Milestone definition

3. **Skills-Inventory** (5-7 prompts)
   - Technical skills audit
   - Soft skills assessment
   - Skill gap analysis
   - Learning objectives

4. **Networking** (5-7 prompts)
   - Network mapping
   - Elevator pitch development
   - LinkedIn optimization
   - Informational interview planning

5. **Job-Search** (5-7 prompts)
   - Target company research
   - Application strategy
   - Interview preparation
   - Offer evaluation

**Features**:
- 20-30 pre-built prompt templates
- Template variables (e.g., {student_name}, {career_goal})
- Auto-population of student data
- Counselor assignment interface
- Due date setting and reminders
- Student response submission
- Counselor feedback and review
- Completion tracking with points award

**Deliverables**:
- Prompt template constants file
- Prompt library component
- Assignment interface for counselors
- Response submission form for students
- Review interface for counselors
- Prompt analytics dashboard

---

### Module 10: Shared UI Components & Layouts

**Purpose**: Create consistent, reusable UI components

**Components**:
- Button (primary, secondary, danger variants)
- Input (with validation states)
- Modal (with backdrop)
- Card (content container)
- FileUploader (drag-and-drop)
- LoadingSpinner
- Toast notifications
- Skeleton loaders
- Header (navigation + user menu)
- Sidebar (role-based navigation)
- Footer
- MainLayout (responsive wrapper)

**Design Guidelines**:
- NO purple, indigo, or violet hues
- Use neutral tones, blues, greens, or professional colors
- Consistent spacing using 8px system
- Proper contrast ratios for accessibility
- Responsive breakpoints for mobile/tablet/desktop
- Modern, clean aesthetic
- Subtle animations for interactions

**Deliverables**:
- Complete shared component library
- Layout components
- Design system with consistent styling
- Responsive navigation

---

### Module 11: Security & Performance Optimization

**Purpose**: Ensure production-ready security and performance

**Security**:
- Input sanitization (XSS prevention)
- File upload virus scanning
- Rate limiting for AI requests
- CORS configuration
- SQL injection prevention (Supabase parameterized queries)
- Authentication token refresh
- Audit logging for counselor actions
- Data retention policies
- GDPR-compliant data export/deletion

**Performance**:
- React lazy loading for routes
- Code splitting by route
- Image optimization
- Infinite scroll for long lists
- Debounced search inputs
- Data caching layer
- Optimistic UI updates
- Loading skeletons
- Service worker for offline assets

**Deliverables**:
- Security utilities
- Performance optimizations
- Lazy-loaded routes
- Caching strategies

---

## Implementation Status

### ✓ Completed
- [x] Project planning and architecture design
- [x] PLAN.md documentation created

### 🔄 In Progress
- [ ] Awaiting module-specific implementation instructions

### ⏳ Pending
- [ ] Module 1: Foundation & Configuration
- [ ] Module 2: Database Schema & Migrations
- [ ] Module 3: AI Service Abstraction Layer
- [ ] Module 4: Authentication & User Management
- [ ] Module 5: Resume Upload & Management
- [ ] Module 6: AI Chat Assistant
- [ ] Module 7: Gamification System
- [ ] Module 8: Counselor Dashboard
- [ ] Module 9: Curriculum Prompts
- [ ] Module 10: Shared UI Components & Layouts
- [ ] Module 11: Security & Performance

---

## Development Workflow

### Git Workflow
- Branch naming: `feature/module-name`, `bugfix/issue-name`, `hotfix/critical-fix`
- Meaningful commit messages
- Pull requests for code review

### Code Standards
- PascalCase for React components
- camelCase for functions and variables
- SCREAMING_SNAKE_CASE for constants
- TypeScript strict mode enabled
- ESLint configuration followed
- No console.logs in production code

### Testing Strategy
- Component testing for UI elements
- Integration testing for user flows
- Mock data for development
- Supabase local development when possible

---

## Next Steps

**Ready for Module Implementation!**

Please provide instructions for the first module you'd like to implement, along with any mock files or specific requirements.

**Recommended Order**:
1. Foundation & Configuration (sets up environment)
2. Database Schema & Migrations (creates data layer)
3. Shared UI Components (builds reusable pieces)
4. Authentication & User Management (enables user access)
5. Additional modules based on priority

---

## Notes

- All sensitive data in environment variables
- Supabase handles authentication, database, and file storage
- AI provider can be switched via environment variable
- Gamification is private to students (counselor visibility only)
- Pre-built curriculum prompts ready to deploy
- Module-by-module approach allows for iterative testing and validation

---

**Document Version**: 1.0
**Last Updated**: 2025-11-27
**Status**: Ready for Implementation
