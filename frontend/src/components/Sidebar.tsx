import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, Settings, Bell, Award, ChevronLeft, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { UserRole } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: UserRole;
}

const baseItems = [
  { path: '/dashboard',   label: 'Dashboard', icon: Home },
  { path: '/lessons',     label: 'Lecții',    icon: BookOpen },
  { path: '/leaderboard', label: 'Clasament', icon: Trophy },
  { path: '/certificates',  label: 'Certificate',  icon: Award },
  { path: '/notifications', label: 'Notificari',   icon: Bell },
  { path: '/profile',     label: 'Profil',    icon: User },
  { path: '/settings',      label: 'Setari',       icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen, userRole }: SidebarProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const items = userRole === 'admin'
    ? [...baseItems, { path: '/admin', label: 'Admin', icon: Settings }]
    : baseItems;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: isOpen ? 230 : 68,
      background: colors.bgCard,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      zIndex: 100, overflow: 'hidden',
    }}>
      <div className="blush-stripe" />

      {/* Logo */}
      <div style={{
        padding: '18px 14px', display: 'flex', alignItems: 'center', gap: 11,
        borderBottom: `1px solid ${colors.border}`, minHeight: 64,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 800, color: '#fff', flexShrink: 0,
          boxShadow: `0 4px 16px ${colors.blueGlow}`,
        }}>L</div>
        {isOpen && (
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.4px', whiteSpace: 'nowrap', color: colors.textPrimary }}>
            Learn<span style={{ color: colors.blue }}>Flow</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 7px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {items.map(item => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
              borderRadius: 9, border: 'none',
              background: active ? colors.blueGlow : 'transparent',
              color: active ? colors.blue : colors.textMuted,
              cursor: 'pointer', fontSize: 13.5, fontWeight: active ? 600 : 400,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s', position: 'relative', whiteSpace: 'nowrap',
            }}>
              {active && <div style={{
                position: 'absolute', left: 0, top: '22%', bottom: '22%',
                width: 3, borderRadius: 2, background: colors.blue,
              }} />}
              <Icon size={19} style={{ flexShrink: 0 }} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} style={{
        margin: 7, padding: 11, borderRadius: 9,
        border: `1px solid ${colors.border}`,
        background: 'transparent', color: colors.textMuted, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, gap: 7,
        transition: 'background 0.2s',
      }}>
        {isOpen ? <><ChevronLeft size={17} /><span>Minimizează</span></> : <Menu size={17} />}
      </button>
    </div>
  );
}
