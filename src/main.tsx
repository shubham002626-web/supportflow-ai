import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import App from './App.tsx';
import {AuthProvider} from './contexts/AuthContext';
import {ThemeProvider} from './contexts/ThemeContext';
import './index.css';

function Fallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4 bg-slate-50 dark:bg-[#0A0A0A]">
      <div className="max-w-md w-full bg-white dark:bg-[#111113] p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-black/20 p-3 rounded-lg overflow-hidden text-ellipsis whitespace-nowrap">
          {error.message}
        </p>
        <button 
          onClick={resetErrorBoundary}
          className="w-full mt-4 bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-xl font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
