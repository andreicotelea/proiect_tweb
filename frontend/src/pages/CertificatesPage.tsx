import { Award, Download, Lock, Calendar, Clock } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface Certificate {
  id: number;
  title: string;
  category: string;
  lessonsRequired: number;
  lessonsCompleted: number;
  earnedAt?: string;
  duration: string;
}

const mockCertificates: Certificate[] = [
  { id: 1, title: 'Fundamentele React', category: 'Frontend', lessonsRequired: 5, lessonsCompleted: 5, earnedAt: '2025-02-10', duration: '12h' },
  { id: 2, title: 'Node.js Developer', category: 'Backend', lessonsRequired: 6, lessonsCompleted: 6, earnedAt: '2025-01-28', duration: '18h' },
  { id: 3, title: 'DevOps Essentials', category: 'DevOps', lessonsRequired: 4, lessonsCompleted: 4, earnedAt: '2025-03-05', duration: '15h' },
  { id: 4, title: 'Database Expert', category: 'Database', lessonsRequired: 5, lessonsCompleted: 2, duration: '20h' },
  { id: 5, title: 'TypeScript Advanced', category: 'Frontend', lessonsRequired: 4, lessonsCompleted: 1, duration: '10h' },
  { id: 6, title: 'Full Stack Master', category: 'All', lessonsRequired: 20, lessonsCompleted: 11, duration: '50h' },
];

export default function CertificatesPage() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const earned = mockCertificates.filter(c => c.earnedAt);
  const inProgress = mockCertificates.filter(c => !c.earnedAt);

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
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
          Certificatele Tale
        </h2>
        <p style={{ color: colors.textMuted, fontSize: 14, maxWidth: 480 }}>
          Ai obtinut {earned.length} certificate. Completeaza lectiile pentru a debloca mai multe.
        </p>
      </div>

      {/* Earned Certificates */}
      <div className="animate-in delay-2">
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Obtinute ({earned.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14, marginBottom: 32 }}>
          {earned.map((c, i) => (
            <div key={c.id} className={`animate-in delay-${Math.min(i + 3, 8)}`} style={{
              background: colors.bgCard, borderRadius: 14, padding: 22,
              border: `1px solid ${colors.blue}25`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${colors.blue}, ${colors.blush})`,
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 13, flexShrink: 0,
                  background: `linear-gradient(135deg, ${colors.blue}20, ${colors.blush}15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Award size={24} color={colors.blue} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{c.title}</h4>
                  <span style={{
                    padding: '2px 9px', borderRadius: 5, fontSize: 10.5,
                    background: `${colors.steel}15`, color: colors.steel,
                  }}>{c.category}</span>

                  <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 12, color: colors.textMuted }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} /> {new Date(c.earnedAt!).toLocaleDateString('ro-RO')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {c.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 16, paddingTop: 14, borderTop: `1px solid ${colors.border}`,
              }}>
                <span style={{ fontSize: 11.5, color: colors.success, fontWeight: 600 }}>
                  {c.lessonsRequired}/{c.lessonsRequired} lectii completate
                </span>
                <button style={{
                  padding: '7px 14px', borderRadius: 7, fontSize: 12,
                  border: `1px solid ${colors.border}`, background: 'transparent',
                  color: colors.textMuted, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <Download size={13} /> Descarca PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In Progress */}
      <div className="animate-in delay-5">
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>In Progres ({inProgress.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {inProgress.map((c, i) => {
            const percent = Math.round((c.lessonsCompleted / c.lessonsRequired) * 100);
            return (
              <div key={c.id} className={`animate-in delay-${Math.min(i + 6, 8)}`} style={{
                background: colors.bgCard, borderRadius: 14, padding: 22,
                border: `1px solid ${colors.border}`, opacity: 0.85,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 13, flexShrink: 0,
                    background: colors.bgElevated,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Lock size={22} color={colors.textDim} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{c.title}</h4>
                    <span style={{
                      padding: '2px 9px', borderRadius: 5, fontSize: 10.5,
                      background: `${colors.steel}15`, color: colors.steel,
                    }}>{c.category}</span>

                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                        <span style={{ color: colors.textMuted }}>{c.lessonsCompleted}/{c.lessonsRequired} lectii</span>
                        <span style={{ fontWeight: 600, color: colors.blue }}>{percent}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: colors.bgElevated }}>
                        <div style={{
                          height: '100%', width: `${percent}%`, borderRadius: 3,
                          background: `linear-gradient(90deg, ${colors.blue}, ${colors.blueSoft})`,
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
