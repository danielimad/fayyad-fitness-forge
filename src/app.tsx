import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/app-store';
import AppRouter from './lib/router';
import { AuthProvider } from './hooks/use-auth';

function App() {
  const theme = useSelector((state: RootState) => state.app.theme);
  const language = useSelector((state: RootState) => state.app.language);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [theme, language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Router>
        <AuthProvider>
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <AppRouter />
          </Suspense>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;