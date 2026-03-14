import { useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, TopBar, AuthModal } from '@/components';
import {
  LandingPage, DashboardPage, LessonsPage, LessonDetailPage,
  LeaderboardPage, ProfilePage, AdminPage, SettingsPage,
  CertificatesPage, NotificationsPage, HealthCheckPage, ErrorPage,
} from '@/pages';

import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import AppAxiosProvider from '@/providers/AxiosProvider';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function Layout() {
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

function AppRoutes() {
  const { role } = useAuth();
  return (
    <Routes>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard"   element={<DashboardPage />} />
        <Route path="/lessons"     element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/notifications"  element={<RequireAuth><NotificationsPage /></RequireAuth>} />
        <Route path="/certificates"   element={<RequireAuth><CertificatesPage /></RequireAuth>} />
        <Route path="/profile"        element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/settings"       element={<RequireAuth><SettingsPage /></RequireAuth>} />
        <Route path="/health"         element={<HealthCheckPage />} />
        <Route path="/admin"          element={role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="*"            element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
          <AppAxiosProvider>
                <AppRoutes />
          </AppAxiosProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
