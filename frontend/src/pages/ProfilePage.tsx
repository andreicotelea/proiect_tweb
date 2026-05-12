import { useState, useEffect } from 'react';
import { BookOpen, Clock, Trophy, Award, Edit, Check, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { StatCard } from '@/components';
import { progressService, achievementService } from '@/api';
import { USE_MOCK } from '@/config';
import { mockAchievements } from '@/services/mockData';

export default function ProfilePage() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [recentProgress, setRecentProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK || !user) {
      setAchievements(mockAchievements);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const [progRes, achRes] = await Promise.all([
          progressService.getByUser(user.id),
          achievementService.getAll(),
        ]);
        const progData = Array.isArray(progRes.data) ? progRes.data as any[] : [];
        const completed = progData.filter((p: any) => p.percentComplete >= 100).length;
        const points = progData.reduce((sum: number, p: any) => sum + (p.percentComplete * 10), 0);
        setCompletedLessons(completed);
        setTotalPoints(points);
        setRecentProgress(progData.slice(0, 3));

        const achData = Array.isArray(achRes.data) ? achRes.data as any[] : [];
        setAchievements(achData.map(a => ({
          id: a.id,
          title: a.title,
          icon: a.icon || 'AC',
          earned: completed >= 1,
        })));
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        setAchievements(mockAchievements);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div style={{ padding: 28, color: colors.textMuted }}>Se incarca...</div>;

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
            <span style={{ padding: '3px 10px', borderRadius: 5, fontSize: 11.5, fontWeight: 600, background: 'rgba(109,191,160,0.15)', color: colors.success }}>{user?.role || 'student'}</span>
            <span style={{ fontSize: 11.5, color: colors.textDim }}>Membru din {user?.createdAt || 'recent'}</span>
          </div>
        </div>
        <button onClick={() => window.location.href = '/settings'} style={{
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
        <StatCard icon={BookOpen} label="Lectii Completate" value={String(completedLessons)} color={colors.blue} delay={2} />
        <StatCard icon={Clock} label="In Progres" value={String(recentProgress.filter((p: any) => p.percentComplete < 100).length)} color={colors.steel} delay={3} />
        <StatCard icon={Trophy} label="Puncte" value={totalPoints.toLocaleString()} color={colors.blush} delay={4} />
        <StatCard icon={Award} label="Realizari" value={String(achievements.filter(a => a.earned).length)} color={colors.success} delay={5} />
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="animate-in delay-6">
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Realizari</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 11 }}>
            {achievements.map((a: any) => (
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
      )}

      {/* Recent Activity */}
      <div className="animate-in delay-7" style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Activitate Recenta</h3>
        <div style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {recentProgress.length === 0 ? (
            <div style={{ padding: 28, textAlign: 'center', color: colors.textDim, fontSize: 13 }}>
              Nu ai activitate recenta. Inroleaza-te intr-o lectie!
            </div>
          ) : (
            recentProgress.map((p: any, i: number) => {
              const isDone = p.percentComplete >= 100;
              const Icon = isDone ? Check : Play;
              const color = isDone ? colors.success : colors.blue;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px',
                  borderBottom: i < recentProgress.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13.5 }}>Lectia #{p.lessonId} — <strong>{p.percentComplete}%</strong></span>
                  </div>
                  <span style={{ fontSize: 11.5, color: colors.textDim }}>{p.lastAccessedAt || ''}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
