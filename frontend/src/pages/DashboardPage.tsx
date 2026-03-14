import { BookOpen, Clock, Zap, Trophy, Play, ChevronRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { StatCard, LessonCard } from '@/components';
import { mockLessons, mockLeaderboard } from '@/services/mockData';

export default function DashboardPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const inProgress = mockLessons.filter(l => l.progress > 0 && l.progress < 100);

  return (
    <div style={{ padding: 28 }}>
      {/* Welcome Banner */}
      <div className="animate-in delay-1" style={{
        background: `linear-gradient(135deg, ${colors.blue}12, ${colors.blush}10)`,
        borderRadius: 18, padding: '28px 32px', marginBottom: 28,
        border: `1px solid ${colors.blue}18`, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -35, right: -35, width: 180, height: 180,
          borderRadius: '50%', background: `${colors.blush}06`,
        }} />
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 7, letterSpacing: '-0.4px' }}>
          Buna dimineata!
        </h2>
        <p style={{ color: colors.textMuted, fontSize: 14, maxWidth: 480 }}>
          Ai {inProgress.length} lectii in progres. Continua de unde ai ramas sau exploreaza ceva nou.
        </p>
        <button onClick={() => navigate('/lessons')} style={{
          marginTop: 18, padding: '11px 24px', borderRadius: 9, border: 'none',
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
          color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          display: 'flex', alignItems: 'center', gap: 7,
          boxShadow: `0 4px 18px ${colors.blueGlow}`,
        }}>
          <Play size={15} /> Continua Lectiile
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard icon={BookOpen} label="Lectii Completate" value="12" trend={15} color={colors.blue} delay={2} />
        <StatCard icon={Clock} label="Ore Invatate" value="34h" trend={8} color={colors.steel} delay={3} />
        <StatCard icon={Zap} label="Serie Zilnica" value="7" trend={40} color={colors.blush} delay={4} />
        <StatCard icon={Trophy} label="Puncte Totale" value="2,840" trend={12} color={colors.success} delay={5} />
      </div>

      {/* In Progress Lessons */}
      <div className="animate-in delay-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Lectii in Progres</h3>
          <button onClick={() => navigate('/lessons')} style={{
            background: 'none', border: 'none', color: colors.blue, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            Vezi toate <ChevronRight size={15} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {inProgress.map((l, i) => (
            <LessonCard key={l.id} lesson={l} delay={Math.min(i + 6, 8)}
              onClick={ls => navigate(`/lessons/${ls.id}`)} />
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="animate-in delay-7" style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Top Studenti</h3>
          <button onClick={() => navigate('/leaderboard')} style={{
            background: 'none', border: 'none', color: colors.blue, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            Clasament complet <ChevronRight size={15} />
          </button>
        </div>
        <div style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {mockLeaderboard.slice(0, 5).map((u, i) => {
            const podiumColors = [colors.blush, '#AAB8C2', '#A0866A'];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '13px 22px',
                borderBottom: i < 4 ? `1px solid ${colors.border}` : 'none',
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 7, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 700,
                  background: i < 3 ? `${podiumColors[i]}25` : colors.bgElevated,
                  color: i < 3 ? podiumColors[i] : colors.textMuted, marginRight: 14,
                }}>{u.rank}</span>
                <span style={{
                  width: 28, height: 28, borderRadius: 7, marginRight: 11,
                  background: `${colors.blue}15`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, fontWeight: 700, color: colors.blue,
                }}>{u.avatar}</span>
                <span style={{ flex: 1, fontWeight: 500, fontSize: 13.5 }}>{u.name}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13.5, fontWeight: 600, color: colors.blue }}>
                  {u.points.toLocaleString()} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
