import { BookOpen, Clock, Trophy, Award, Edit, Check, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { StatCard } from '@/components';
import { mockAchievements } from '@/services/mockData';

export default function ProfilePage() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const recentActivity = [
    { action: 'Ai completat', item: 'Docker & Kubernetes', time: 'Acum 2 ore', icon: Check, color: colors.success },
    { action: 'Ai inceput', item: 'CSS Animations Deep Dive', time: 'Ieri', icon: Play, color: colors.blue },
    { action: 'Quiz reusit', item: 'Introducere in React', time: 'Acum 3 zile', icon: Award, color: colors.blush },
  ];

  return (
    <div style={{ padding: 28 }}>
      {/* Profile Header */}
      <div className="animate-in delay-1" style={{
        display: 'flex', gap: 22, alignItems: 'center',
        background: colors.bgCard, borderRadius: 18, padding: 28,
        border: `1px solid ${colors.border}`, marginBottom: 28,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 72,
          background: `linear-gradient(135deg, ${colors.blue}12, ${colors.blush}0E)`,
        }} />
        <div style={{
          width: 90, height: 90, borderRadius: 18, flexShrink: 0,
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 800, color: '#fff',
          zIndex: 1, boxShadow: `0 8px 28px ${colors.blueGlow}`,
        }}>{user?.name?.split(' ').map(w => w[0]).join('') || 'U'}</div>
        <div style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 3 }}>{user?.name || 'Utilizator'}</h2>
          <p style={{ color: colors.textMuted, fontSize: 13.5, marginBottom: 7 }}>{user?.email || ''}</p>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ padding: '3px 10px', borderRadius: 5, fontSize: 11.5, fontWeight: 600, background: 'rgba(109,191,160,0.15)', color: colors.success }}>Pro Member</span>
            <span style={{ fontSize: 11.5, color: colors.textDim }}>Membru din Ianuarie 2025</span>
          </div>
        </div>
        <button style={{
          marginLeft: 'auto', padding: '9px 18px', borderRadius: 9,
          border: `1px solid ${colors.border}`, background: 'transparent',
          color: colors.textMuted, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 5, zIndex: 1,
        }}>
          <Edit size={15} /> Editeaza
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard icon={BookOpen} label="Lectii Completate" value="12" color={colors.blue} delay={2} />
        <StatCard icon={Clock} label="Ore Totale" value="34h" color={colors.steel} delay={3} />
        <StatCard icon={Trophy} label="Puncte" value="2,840" color={colors.blush} delay={4} />
        <StatCard icon={Award} label="Certificari" value="3" color={colors.success} delay={5} />
      </div>

      {/* Achievements */}
      <div className="animate-in delay-6">
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Realizari</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 11 }}>
          {mockAchievements.map(a => (
            <div key={a.id} style={{
              background: colors.bgCard, borderRadius: 12, padding: 18,
              border: `1px solid ${a.earned ? colors.blue + '28' : colors.border}`,
              opacity: a.earned ? 1 : 0.5, textAlign: 'center',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 11, margin: '0 auto 9px',
                background: `${colors.blue}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, fontWeight: 800, color: colors.blue,
              }}>{a.icon}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{a.title}</div>
              {a.earned && (
                <div style={{ marginTop: 7, fontSize: 10.5, color: colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <CheckCircle size={11} /> Obtinut
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="animate-in delay-7" style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Activitate Recenta</h3>
        <div style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {recentActivity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px',
                borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color={a.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13.5 }}>{a.action} <strong>{a.item}</strong></span>
                </div>
                <span style={{ fontSize: 11.5, color: colors.textDim }}>{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
