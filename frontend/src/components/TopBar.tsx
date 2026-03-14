import { useLocation } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface TopBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onShowAuth: () => void;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/lessons': 'Lecții',
  '/leaderboard': 'Clasament',
  '/profile': 'Profilul Meu',
  '/admin': 'Panou Admin',
};

export default function TopBar({ isLoggedIn, onLogout, onShowAuth }: TopBarProps) {
  const { colors, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const isLessonDetail = location.pathname.startsWith('/lessons/') && location.pathname !== '/lessons';
  const title = isLessonDetail ? 'Detalii Lecție' : (pageTitles[location.pathname] || 'LearnFlow');

  return (
    <div style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', borderBottom: `1px solid ${colors.border}`,
      background: `${colors.bgCard}dd`, backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <h1 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.4px', color: colors.textPrimary }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Dark/Light mode toggle */}
        <button onClick={toggleTheme} title={isDark ? 'Mod luminos' : 'Mod întunecat'} style={{
          width: 38, height: 38, borderRadius: 9,
          border: `1px solid ${colors.border}`,
          background: 'transparent', color: colors.textMuted,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, transition: 'border-color 0.2s',
        }}>
          {isDark ? '☀️' : '🌙'}
        </button>

        {isLoggedIn ? (
          <>
            <button style={{
              width: 38, height: 38, borderRadius: 9,
              border: `1px solid ${colors.border}`,
              background: 'transparent', color: colors.textMuted, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Bell size={17} />
              <div style={{
                position: 'absolute', top: 7, right: 7, width: 6, height: 6,
                borderRadius: '50%', background: colors.blush,
              }} />
            </button>
            <button onClick={onLogout} style={{
              padding: '7px 14px', borderRadius: 8,
              border: `1px solid ${colors.border}`,
              background: 'transparent', color: colors.textMuted, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <LogOut size={15} /> Logout
            </button>
          </>
        ) : (
          <button onClick={onShowAuth} style={{
            padding: '9px 22px', borderRadius: 9, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5, fontWeight: 600, boxShadow: `0 4px 18px ${colors.blueGlow}`,
          }}>
            Conectează-te
          </button>
        )}
      </div>
    </div>
  );
}
