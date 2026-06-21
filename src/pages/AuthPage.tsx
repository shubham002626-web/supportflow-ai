import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Auth is bypassed for hackathon — redirect straight to dashboard
export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return null;
}
