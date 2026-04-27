import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, TopBar, AuthModal } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function MainLayout() {
  const { colors } = useTheme();
  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ minHeight: '100vh', background: colors.bgPrimary, color: colors.textPrimary }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} userRole={role} />
      <div style={{
        marginLeft: sidebarOpen ? 230 : 68,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh',
      }}>
        <TopBar isLoggedIn={isLoggedIn} onLogout={handleLogout} onShowAuth={() => setShowAuth(true)} />
        <Outlet />
      </div>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} onLogin={() => setShowAuth(false)} />
    </div>
  );
}
