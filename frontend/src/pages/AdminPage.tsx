import { useState } from 'react';
import { Users, Eye, BookOpen, Star, BarChart3, Grid, Plus, Bell, FileText, Edit, Trash2, Settings } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { StatCard } from '@/components';
import { mockLessons, mockLeaderboard, mockAdminStats } from '@/services/mockData';

export default function AdminPage() {
  const [tab, setTab] = useState('overview');
  const { colors } = useTheme();

  const adminTabs = [
    { id: 'overview', label: 'Prezentare', icon: BarChart3 },
    { id: 'lessons-mgmt', label: 'Lectii', icon: BookOpen },
    { id: 'users-mgmt', label: 'Utilizatori', icon: Users },
    { id: 'categories', label: 'Categorii', icon: Grid },
  ];

  return (
    <div style={{ padding: 28 }}>
      {/* Tabs */}
      <div className="animate-in delay-1" style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
        {adminTabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px',
              borderRadius: 9,
              border: `1px solid ${tab === t.id ? colors.blue + '38' : colors.border}`,
              background: tab === t.id ? colors.blueGlow : 'transparent',
              color: tab === t.id ? colors.blue : colors.textMuted,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            <StatCard icon={Users} label="Total Utilizatori" value={mockAdminStats.totalUsers.toLocaleString()} trend={12} color={colors.blue} delay={2} />
            <StatCard icon={Eye} label="Utilizatori Activi" value={mockAdminStats.activeUsers.toLocaleString()} trend={5} color={colors.steel} delay={3} />
            <StatCard icon={BookOpen} label="Total Lectii" value={mockAdminStats.totalLessons} color={colors.blush} delay={4} />
            <StatCard icon={Star} label="Rating Mediu" value={mockAdminStats.avgRating} color={colors.success} delay={5} />
          </div>

          <div className="animate-in delay-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* Completion donut */}
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Completare Lectii</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 95, height: 95, borderRadius: '50%',
                  background: `conic-gradient(${colors.blue} ${mockAdminStats.completionRate}%, ${colors.bgElevated} 0)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%', background: colors.bgCard,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 19,
                  }}>{mockAdminStats.completionRate}%</div>
                </div>
                <p style={{ color: colors.textMuted, fontSize: 12.5, lineHeight: 1.8 }}>
                  Rata de completare<br />a lectiilor este de <strong style={{ color: colors.textPrimary }}>{mockAdminStats.completionRate}%</strong>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Actiuni Rapide</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { label: 'Adauga Lectie Noua', icon: Plus, color: colors.blue },
                  { label: 'Trimite Notificare', icon: Bell, color: colors.steel },
                  { label: 'Exporta Raport', icon: FileText, color: colors.success },
                ].map((a, i) => (
                  <button key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px',
                    borderRadius: 9, border: `1px solid ${colors.border}`,
                    background: 'transparent', color: colors.textPrimary, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, textAlign: 'left',
                  }}>
                    <a.icon size={17} color={a.color} /> {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lessons Management */}
      {tab === 'lessons-mgmt' && (
        <div className="animate-in delay-2" style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: `1px solid ${colors.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Toate Lectiile</h3>
            <button style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: colors.blue, color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Plus size={15} /> Adauga
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px 90px 75px', padding: '11px 22px', fontSize: 11.5, fontWeight: 600, color: colors.textDim, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `1px solid ${colors.border}` }}>
            <span>Titlu</span><span>Categorie</span><span>Dificultate</span><span>Rating</span><span>Actiuni</span>
          </div>
          {mockLessons.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px 90px 75px', padding: '14px 22px', alignItems: 'center', borderBottom: i < mockLessons.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <span style={{ fontWeight: 500, fontSize: 13.5 }}>{l.title}</span>
              <span style={{ fontSize: 12.5, color: colors.textMuted }}>{l.category}</span>
              <span style={{ fontSize: 12.5, color: colors.textMuted }}>{l.difficulty}</span>
              <span style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} color={colors.blush} fill={colors.blush} /> {l.rating}</span>
              <div style={{ display: 'flex', gap: 5 }}>
                <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={13} /></button>
                <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.danger, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users Management */}
      {tab === 'users-mgmt' && (
        <div className="animate-in delay-2" style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${colors.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Utilizatori ({mockAdminStats.totalUsers})</h3>
          </div>
          {mockLeaderboard.map((u, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', borderBottom: i < mockLeaderboard.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${colors.blue}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 11, fontWeight: 700, color: colors.blue,
              }}>{u.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{u.name}</div>
                <div style={{ fontSize: 11.5, color: colors.textDim }}>{u.lessons} lectii · {u.points} puncte</div>
              </div>
              <span style={{ padding: '3px 9px', borderRadius: 5, fontSize: 10.5, background: 'rgba(109,191,160,0.12)', color: colors.success }}>Activ</span>
              <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <div className="animate-in delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'AI/ML'].map((c, i) => (
            <div key={i} style={{ background: colors.bgCard, borderRadius: 12, padding: 22, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{c}</div>
                <div style={{ fontSize: 11.5, color: colors.textMuted }}>{Math.floor(Math.random() * 15 + 3)} lectii</div>
              </div>
              <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={13} /></button>
            </div>
          ))}
          <button style={{ borderRadius: 12, padding: 22, border: `2px dashed ${colors.border}`, background: 'transparent', color: colors.textDim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5 }}>
            <Plus size={17} /> Adauga Categorie
          </button>
        </div>
      )}
    </div>
  );
}
