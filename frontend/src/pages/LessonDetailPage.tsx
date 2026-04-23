import { useState } from 'react';
import { ChevronRight, Play, User, Clock, Star, Users, FileText, MessageCircle, Edit, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate, useParams } from 'react-router-dom';
import { mockLessons } from '@/services/mockData';

export default function LessonDetailPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const l = mockLessons.find(lesson => lesson.id === Number(id)) ?? null;
  const [tab, setTab] = useState('content');

  if (!l) return null;

  const sections = [
    { title: 'Introducere', dur: '5 min', done: true },
    { title: 'Concepte de baza', dur: '15 min', done: true },
    { title: 'Exemplu practic', dur: '10 min', done: l.progress >= 50 },
    { title: 'Exercitiu interactiv', dur: '10 min', done: false },
    { title: 'Rezumat & Quiz', dur: '5 min', done: false },
  ];

  const tabs = [
    { id: 'content', label: 'Continut', icon: FileText },
    { id: 'discussion', label: 'Discutii', icon: MessageCircle },
    { id: 'notes', label: 'Notite', icon: Edit },
  ];

  return (
    <div style={{ padding: 28 }}>
      <button onClick={() => navigate('/lessons')} className="animate-in delay-1" style={{
        display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
        color: colors.textMuted, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        fontSize: 12.5, marginBottom: 22,
      }}>
        <ChevronRight size={15} style={{ transform: 'rotate(180deg)' }} /> Inapoi la lectii
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 22 }}>
        {/* Main content */}
        <div>
          {/* Video area */}
          <div className="animate-in delay-2" style={{
            background: `linear-gradient(135deg, ${colors.bgElevated}, ${colors.bgHover})`,
            borderRadius: 14, height: 360, display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: 22, position: 'relative',
            border: `1px solid ${colors.border}`, overflow: 'hidden',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: `${colors.blue}20`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18, fontWeight: 800, color: colors.blue,
            }}>{l.thumbnail}</div>
            <button style={{
              position: 'absolute', width: 68, height: 68, borderRadius: '50%',
              background: `${colors.blue}dd`, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 28px ${colors.blueGlow}`,
              animation: 'pulseGlow 2s ease infinite',
            }}>
              <Play size={30} color="#fff" fill="#fff" />
            </button>
          </div>

          {/* Title & Meta */}
          <div className="animate-in delay-3">
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.4px' }}>{l.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, fontSize: 12.5, color: colors.textMuted }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><User size={13} /> {l.profesor}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={13} /> {l.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={13} color={colors.blush} fill={colors.blush} /> {l.rating}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Users size={13} /> {l.students} studenti</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="animate-in delay-4" style={{ display: 'flex', gap: 3, marginBottom: 22, borderBottom: `1px solid ${colors.border}` }}>
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '11px 18px',
                  border: 'none', background: 'none',
                  color: tab === t.id ? colors.blue : colors.textMuted,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  borderBottom: tab === t.id ? `2px solid ${colors.blue}` : '2px solid transparent',
                }}>
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="animate-in delay-5" style={{
            background: colors.bgCard, borderRadius: 14, padding: 22,
            border: `1px solid ${colors.border}`, minHeight: 180,
          }}>
            {tab === 'content' && (
              <p style={{ color: colors.textMuted, lineHeight: 1.8, fontSize: 13.5 }}>
                Aceasta lectie acopera conceptele fundamentale ale <strong style={{ color: colors.textPrimary }}>{l.title}</strong>.
                Vei invata prin exemple practice si exercitii interactive. La finalul lectiei vei putea aplica cunostintele in proiecte reale.
                <br /><br />
                Lectia include materiale video, cod interactiv si un quiz final.
              </p>
            )}
            {tab === 'discussion' && (
              <div style={{ textAlign: 'center', padding: 36, color: colors.textDim }}>
                <MessageCircle size={38} style={{ marginBottom: 10, opacity: 0.3 }} />
                <p>Discutiile sunt disponibile dupa conectare.</p>
              </div>
            )}
            {tab === 'notes' && (
              <textarea placeholder="Scrie notitele tale aici..." style={{
                width: '100%', minHeight: 180, background: colors.bgElevated,
                border: `1px solid ${colors.border}`, borderRadius: 9, padding: 14,
                color: colors.textPrimary, fontSize: 13.5, fontFamily: "'DM Sans', sans-serif",
                resize: 'vertical', outline: 'none',
              }} />
            )}
          </div>
        </div>

        {/* Sidebar - Sections */}
        <div className="animate-in delay-4">
          <div style={{
            background: colors.bgCard, borderRadius: 14, padding: 18,
            border: `1px solid ${colors.border}`, position: 'sticky', top: 84,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Sectiuni</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {sections.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px',
                  borderRadius: 9, background: i === 2 && l.progress < 100 ? colors.blueGlow : 'transparent',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 7, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: s.done ? 'rgba(109,191,160,0.18)' : colors.bgElevated,
                    color: s.done ? colors.success : colors.textDim,
                  }}>
                    {s.done ? <Check size={13} /> : <span style={{ fontSize: 11.5 }}>{i + 1}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: s.done ? colors.textMuted : colors.textPrimary }}>{s.title}</div>
                    <div style={{ fontSize: 10.5, color: colors.textDim }}>{s.dur}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12.5 }}>
                <span style={{ color: colors.textMuted }}>Progres</span>
                <span style={{ fontWeight: 600, color: colors.blue }}>{l.progress}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: colors.bgElevated }}>
                <div style={{
                  height: '100%', width: `${l.progress}%`, borderRadius: 3,
                  background: `linear-gradient(90deg, ${colors.blue}, ${colors.blueSoft})`,
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
