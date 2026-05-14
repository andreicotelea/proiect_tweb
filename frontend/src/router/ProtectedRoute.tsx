import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './paths';
import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
  requiredRole: 'Admin' | 'Profesor' | 'Student' | 'Guest';
}

const roleHierarchy = ['guest', 'student', 'profesor', 'admin'];

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoggedIn } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const userLevel = user ? roleHierarchy.indexOf(user.role) : -1;
  const requiredLevel = roleHierarchy.indexOf(requiredRole.toLowerCase());
  const hasAccess = isLoggedIn && !!user && userLevel >= requiredLevel;

  useEffect(() => {
    if (isLoggedIn && !hasAccess && !showAlert) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setShouldRedirect(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, hasAccess, showAlert]);

  if (!isLoggedIn || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!hasAccess) {
    return (
      <>
        {showAlert && (
          <div style={{
            position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
            background: 'rgba(239, 68, 68, 0.9)', border: '1px solid #f87171',
            borderRadius: 8, padding: '12px 24px', color: 'white', fontSize: 14, fontWeight: 600,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            Acces interzis — necesită rol de {requiredRole}.
            <button onClick={() => window.history.back()} style={{
              marginTop: 16, padding: '10px 22px', borderRadius: 9,
              border: '1px solid #444', background: 'transparent',
              color: '#ccc', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5, fontWeight: 500,
            }}>
              ← Inapoi
            </button>
          </div>
        )}
        {shouldRedirect && <Navigate to={ROUTES.DASHBOARD} replace />}
      </>
    );
  }

  return <Outlet />;
};
