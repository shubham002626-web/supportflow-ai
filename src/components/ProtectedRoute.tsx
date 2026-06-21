import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // Always allow through in demo mode (mock user is always set)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
