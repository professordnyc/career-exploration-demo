import { MainLayout } from './components/layout';
import { Dashboard } from './components/dashboard';
import { ResumeUpload } from './components/resume';
import { ChatInterface } from './components/chat';
import { BadgeList } from './components/badges';

function App() {
  return (
    <MainLayout>
      {(activePage) => (
        <>
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'resume' && <ResumeUpload />}
          {activePage === 'chat' && <ChatInterface />}
          {activePage === 'badges' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Badges</h2>
                <p className="text-gray-600 mt-1">
                  Track your progress and unlock achievements
                </p>
              </div>
              <BadgeList />
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default App;
