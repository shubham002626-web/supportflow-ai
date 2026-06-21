import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MissionControlLayout from './components/layout/MissionControlLayout';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import Tickets from './pages/Tickets';
import KnowledgeBase from './pages/KnowledgeBase';
import Automations from './pages/Automations';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MissionControlLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="automations" element={<Automations />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

