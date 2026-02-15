import React, { useState } from 'react';
import StudentDashboard from './components/StudentDashboard';
import StudentPracticeView from './components/StudentPracticeView';
import TeacherDashboard from './components/TeacherDashboard';

type ViewMode = 'TEACHER' | 'STUDENT';
type StudentView = 'DASHBOARD' | 'PRACTICE';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('STUDENT');
  const [studentView, setStudentView] = useState<StudentView>('DASHBOARD');

  return (
    <div className="flex h-screen bg-surface overflow-hidden font-sans text-neutral-800">
      
      {/* Global Sidebar (Navigation) - HIDDEN if in Practice Mode to maximize focus */}
      {studentView !== 'PRACTICE' && (
        <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-8 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-colors ${viewMode === 'TEACHER' ? 'bg-neutral-900 text-white' : 'bg-pastel-purple text-primary-600'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-bold text-lg text-neutral-900 tracking-tight">Vieta Master</span>
            </div>
            <p className="text-xs text-neutral-400 pl-1">Adaptive Learning Platform</p>
          </div>

          {/* Role Switcher */}
          <div className="px-6 mb-8">
            <div className="bg-neutral-100 p-1 rounded-xl flex">
              <button 
                onClick={() => setViewMode('STUDENT')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${viewMode === 'STUDENT' ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/5' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                Học sinh
              </button>
              <button 
                onClick={() => setViewMode('TEACHER')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${viewMode === 'TEACHER' ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/5' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                Giáo viên
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1">
            {viewMode === 'STUDENT' ? (
              <>
                <div className="px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">Learning</div>
                <button 
                  onClick={() => setStudentView('DASHBOARD')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors ${studentView === 'DASHBOARD' ? 'bg-pastel-blue text-primary-700' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Dashboard
                </button>
                <button 
                   onClick={() => setStudentView('PRACTICE')}
                   className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors ${studentView === 'PRACTICE' ? 'bg-pastel-blue text-primary-700' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
                >
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                   Luyện tập
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">Management</div>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium bg-neutral-800 text-white flex items-center gap-3 shadow-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Upload & Process
                </button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 flex items-center gap-3">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   Kho câu hỏi
                </button>
              </>
            )}
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-neutral-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-500">
                  {viewMode === 'STUDENT' ? 'MA' : 'T'}
                </div>
                <div>
                   <p className="text-sm font-bold text-neutral-800">{viewMode === 'STUDENT' ? 'Minh Anh' : 'Thầy Giáo'}</p>
                   <p className="text-xs text-neutral-400">{viewMode === 'STUDENT' ? 'Học sinh lớp 9A' : 'Administrator'}</p>
                </div>
             </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {viewMode === 'TEACHER' ? (
           <TeacherDashboard />
        ) : (
           // Router Logic for Student
           studentView === 'DASHBOARD' ? (
              <StudentDashboard onNavigate={setStudentView} />
           ) : (
              <StudentPracticeView onBack={() => setStudentView('DASHBOARD')} />
           )
        )}
      </main>
    </div>
  );
};

export default App;