import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { leaderboardService } from '@/api';
import { USE_MOCK } from '@/config';
import { mockLeaderboard } from '@/services/mockData';
import type { LeaderboardEntry } from '@/types';

export default function LeaderboardPage() {
  const { colors } = useTheme();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await leaderboardService.getAll();
        setLeaderboard(res.data as any);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setLeaderboard(mockLeaderboard);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: 28, color: colors.textMuted }}>Se incarca clasamentul...</div>;
  if (leaderboard.length < 3) return <div style={{ padding: 28, color: colors.textMuted }}>Nu sunt suficienti studenti pentru clasament.</div>;

  const podiumColors = [colors.steel, colors.blush, '#A0866A'];
  const podiumH = [170, 210, 150];
  const podiumOrder = [leaderboard[1], leaderboard[0], leaderboard[2]];

  return (
    <div style={{ padding: 28 }}>
      {/* Podium Top 3 */}
      <div className="animate-in delay-1" style={{
        display: 'flex', justifyContent: 'center', gap: 22, marginBottom: 36, alignItems: 'flex-end',
      }}>
        {podiumOrder.map((u, i) => {
          const isFirst = i === 1;
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              animation: `float 3s ease-in-out infinite`, animationDelay: `${i * 0.3}s`,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, marginBottom: 10,
                background: `${colors.blue}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, fontWeight: 800, color: colors.blue,
              }}>{u.avatar}</div>
              <div style={{ fontWeight: 700, fontSize: isFirst ? 17 : 14.5, marginBottom: 3 }}>{u.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5, color: colors.blue, fontWeight: 600, marginBottom: 14 }}>
                {u.points.toLocaleString()} pts
              </div>
              <div style={{
                width: isFirst ? 130 : 115, height: podiumH[i],
                borderRadius: '14px 14px 0 0',
                background: `linear-gradient(180deg, ${podiumColors[i]}28, ${podiumColors[i]}06)`,
                border: `1px solid ${podiumColors[i]}35`, borderBottom: 'none',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 18,
              }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: podiumColors[i] }}>#{u.rank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="animate-in delay-3" style={{
        background: colors.bgCard, borderRadius: 14,
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '55px 1fr 110px 90px 95px',
          padding: '12px 22px', borderBottom: `1px solid ${colors.border}`,
          fontSize: 11.5, fontWeight: 600, color: colors.textDim,
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>
          <span>Rank</span><span>Student</span><span>Puncte</span><span>Lectii</span><span>Serie</span>
        </div>

        {leaderboard.map((u, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '55px 1fr 110px 90px 95px',
            padding: '14px 22px', alignItems: 'center',
            borderBottom: i < leaderboard.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 7, display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 700,
              background: i < 3 ? `${podiumColors[i]}25` : colors.bgElevated,
              color: i < 3 ? podiumColors[i] : colors.textMuted,
            }}>{u.rank}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 7,
                background: `${colors.blue}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 10, fontWeight: 700, color: colors.blue,
              }}>{u.avatar}</span>
              <span style={{ fontWeight: 500 }}>{u.name}</span>
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13.5, fontWeight: 600, color: colors.blue }}>
              {u.points.toLocaleString()}
            </span>
            <span style={{ color: colors.textMuted, fontSize: 13.5 }}>{u.lessons}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: colors.blush, fontSize: 13.5 }}>
              <Zap size={13} /> {u.streak} zile
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
