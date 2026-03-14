import { useState } from 'react';
import { Bell, BookOpen, Award, Trophy, Info, Check, CheckCheck, Trash2 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

type NotifType = 'all' | 'lesson' | 'achievement' | 'leaderboard' | 'system';

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 1, type: 'lesson', title: 'Lectie noua disponibila', message: 'REST API Design a fost adaugata in categoria Backend.', time: 'Acum 2 ore', read: false },
  { id: 2, type: 'achievement', title: 'Realizare deblocata', message: 'Ai obtinut "Serie de 7 Zile" pentru 7 zile consecutive de invatare.', time: 'Acum 5 ore', read: false },
  { id: 3, type: 'leaderboard', title: 'Ai urcat in clasament', message: 'Esti acum pe locul #4 in clasamentul general.', time: 'Ieri', read: false },
  { id: 4, type: 'system', title: 'Bine ai venit pe LearnFlow', message: 'Contul tau a fost creat cu succes. Exploreaza lectiile disponibile.', time: 'Acum 2 zile', read: true },
  { id: 5, type: 'lesson', title: 'Lectie actualizata', message: 'Introducere in React a fost actualizata cu continut nou.', time: 'Acum 3 zile', read: true },
  { id: 6, type: 'achievement', title: 'Realizare deblocata', message: 'Ai obtinut "Prima Lectie" dupa completarea primei lectii.', time: 'Acum 4 zile', read: true },
  { id: 7, type: 'leaderboard', title: 'Clasament saptamanal', message: 'Clasamentul saptamanal s-a resetat. Incepe o noua competitie!', time: 'Acum 5 zile', read: true },
  { id: 8, type: 'lesson', title: 'Certificat disponibil', message: 'Ai completat toate lectiile pentru certificatul Node.js Developer.', time: 'Acum 1 saptamana', read: true },
];

const typeConfig: Record<string, { icon: typeof Bell; color: string; label: string }> = {
  lesson: { icon: BookOpen, label: 'Lectii', color: '' },
  achievement: { icon: Award, label: 'Realizari', color: '' },
  leaderboard: { icon: Trophy, label: 'Clasament', color: '' },
  system: { icon: Info, label: 'Sistem', color: '' },
};

export default function NotificationsPage() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<NotifType>('all');

  typeConfig.lesson.color = colors.blue;
  typeConfig.achievement.color = colors.blush;
  typeConfig.leaderboard.color = colors.success;
  typeConfig.system.color = colors.steel;

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filters: { id: NotifType; label: string }[] = [
    { id: 'all', label: 'Toate' },
    { id: 'lesson', label: 'Lectii' },
    { id: 'achievement', label: 'Realizari' },
    { id: 'leaderboard', label: 'Clasament' },
    { id: 'system', label: 'Sistem' },
  ];

  return (
    <div style={{ padding: 28, maxWidth: 760, margin: '0 auto' }}>
      {/* Header */}
      <div className="animate-in delay-1" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.4px' }}>Notificari</h2>
          {unreadCount > 0 && (
            <span style={{
              padding: '3px 10px', borderRadius: 12, fontSize: 11.5, fontWeight: 700,
              background: `${colors.blue}18`, color: colors.blue,
            }}>{unreadCount} necitite</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 12.5,
            border: `1px solid ${colors.border}`, background: 'transparent',
            color: colors.textMuted, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <CheckCheck size={14} /> Marcheaza toate citite
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="animate-in delay-2" style={{ display: 'flex', gap: 5, marginBottom: 22 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '9px 14px', borderRadius: 7,
            border: `1px solid ${filter === f.id ? colors.blue + '38' : colors.border}`,
            background: filter === f.id ? colors.blueGlow : 'transparent',
            color: filter === f.id ? colors.blue : colors.textMuted,
            fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', fontWeight: 500,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="animate-in delay-3" style={{
        background: colors.bgCard, borderRadius: 14,
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: colors.textDim }}>
            <Bell size={38} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>Nu ai notificari in aceasta categorie.</p>
          </div>
        ) : (
          filtered.map((n, i) => {
            const config = typeConfig[n.type] || typeConfig.system;
            const Icon = config.icon;
            return (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 22px',
                borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : 'none',
                background: n.read ? 'transparent' : `${colors.blue}06`,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${config.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={17} color={config.color} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 13.5, fontWeight: n.read ? 500 : 700 }}>{n.title}</span>
                    {!n.read && (
                      <div style={{
                        width: 7, height: 7, borderRadius: '50%', background: colors.blue, flexShrink: 0,
                      }} />
                    )}
                  </div>
                  <p style={{ fontSize: 12.5, color: colors.textMuted, lineHeight: 1.6, marginBottom: 6 }}>
                    {n.message}
                  </p>
                  <span style={{ fontSize: 11, color: colors.textDim }}>{n.time}</span>
                </div>

                <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginTop: 2 }}>
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} title="Marcheaza citit" style={{
                      width: 28, height: 28, borderRadius: 6,
                      border: `1px solid ${colors.border}`, background: 'transparent',
                      color: colors.textDim, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={13} />
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)} title="Sterge" style={{
                    width: 28, height: 28, borderRadius: 6,
                    border: `1px solid ${colors.border}`, background: 'transparent',
                    color: colors.textDim, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
