import { useState, useEffect } from 'react';
import { ChevronRight, Play, User, Clock, Star, Users, FileText, MessageCircle, Edit, Check, Award, Download } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { lessonService, progressService } from '@/api';
import { USE_MOCK } from '@/config';
import { mockLessons } from '@/services/mockData';
import { apiClient } from '@/api/client';
import type { Lesson } from '@/types';

export default function LessonDetailPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [l, setL] = useState<Lesson | null>(null);
  const [tab, setTab] = useState('content');
  const { user, isLoggedIn } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');
  const [sections, setSections] = useState<{ title: string; duration: string; order: number }[]>([]);
  const [myPercent, setMyPercent] = useState(0);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const numId = Number(id);
    if (USE_MOCK) {
      setL(mockLessons.find(lesson => lesson.id === numId) ?? null);
      return;
    }
    lessonService.getById(numId)
      .then(res => setL(res.data as any))
      .catch(() => setL(mockLessons.find(lesson => lesson.id === numId) ?? null));
  }, [id]);

  useEffect(() => {
    if (!l || USE_MOCK) return;
    apiClient.get(`/lesson-sections/lesson/${l.id}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSections(data);
      })
      .catch(() => setSections([]));
  }, [l]);

  useEffect(() => {
    if (!user || !l || USE_MOCK) return;
    progressService.getByUser(user.id)
      .then(res => {
        const data = res.data as any;
        const arr = Array.isArray(data) ? data : [];
        const found = arr.find((p: any) => p.lessonId === l.id);
        if (found) {
          setEnrolled(true);
          setMyPercent(found.percentComplete ?? 0);
        }
      })
      .catch(() => {});
  }, [user, l]);

  const handleMarkComplete = async () => {
    if (!user || !l) return;
    setMarking(true);
    try {
      await progressService.update({ userId: user.id, lessonId: l.id, percentComplete: 100 });
      setMyPercent(100);
    } catch {
      // ignore
    }
    setMarking(false);
  };

  const handleEnroll = async () => {
    if (!user || !l) return;
    setEnrolling(true);
    try {
      const res = await progressService.enroll({ userId: user.id, lessonId: l.id });
      const data = res.data as any;
      if (data.isSuccess) {
        setEnrolled(true);
        setEnrollMsg('Te-ai inrolat cu succes!');
        setL(prev => prev ? { ...prev, students: (prev.students || 0) + 1 } : prev);
      } else {
        setEnrollMsg(data.message);
      }
    } catch (err: any) {
      setEnrollMsg(err.response?.data?.message || 'Eroare la inrolare.');
    }
    setEnrolling(false);
    setTimeout(() => setEnrollMsg(''), 3000);
  };

  if (!l) return null;

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
            borderRadius: 14, height: 360, marginBottom: 22,
            border: `1px solid ${colors.border}`, overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(135deg, ${colors.bgElevated}, ${colors.bgHover})`,
          }}>
            {l.videoUrl && (l.videoUrl.includes('youtube.com') || l.videoUrl.includes('youtu.be')) ? (
              <iframe
                width="100%" height="100%"
                src={l.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]}
                title={l.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${colors.blue}20`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, fontWeight: 800, color: colors.blue,
                }}>{l.thumbnail}</div>
                <p style={{ color: colors.textMuted, fontSize: 13 }}>Niciun video disponibil</p>
              </div>
            )}
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

          {/* Enroll Button */}
          {isLoggedIn && !USE_MOCK && user?.role !== 'admin' && (
            <div className="animate-in delay-3" style={{ marginBottom: 18 }}>
              {enrolled ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 9, background: `${colors.success}15`, color: colors.success, fontSize: 13.5, fontWeight: 600 }}>
                  <Check size={16} /> Esti inrolat in aceasta lectie
                </div>
              ) : (
                <button onClick={handleEnroll} disabled={enrolling} style={{
                  padding: '12px 24px', borderRadius: 9, border: 'none',
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: enrolling ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 7,
                  boxShadow: `0 4px 18px ${colors.blueGlow}`,
                }}>
                  <Play size={15} /> {enrolling ? 'Se proceseaza...' : 'Inroleaza-te in curs'}
                </button>
              )}
              {enrollMsg && <p style={{ marginTop: 8, fontSize: 12.5, color: colors.blue }}>{enrollMsg}</p>}
            </div>
          )}

          {/* Mark as complete button — only for enrolled non-admin users */}
          {isLoggedIn && !USE_MOCK && user?.role !== 'admin' && enrolled && myPercent < 100 && (
            <div className="animate-in delay-3" style={{ marginBottom: 18 }}>
              <button onClick={handleMarkComplete} disabled={marking} style={{
                padding: '10px 20px', borderRadius: 9, border: `1px solid ${colors.success}40`,
                background: `${colors.success}10`, color: colors.success,
                fontSize: 13, fontWeight: 600, cursor: marking ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 7,
              }}>
                <Check size={15} /> {marking ? 'Se proceseaza...' : 'Marcheaza ca Terminat'}
              </button>
            </div>
          )}

          {/* Certificate — only visible when 100% complete */}
          {isLoggedIn && !USE_MOCK && enrolled && myPercent >= 100 && l.certificateUrl && (
            <div className="animate-in delay-3" style={{
              marginBottom: 22, padding: 22, borderRadius: 14,
              background: `linear-gradient(135deg, ${colors.blue}10, ${colors.blush}10)`,
              border: `1px solid ${colors.blue}30`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${colors.blue}, ${colors.blush})`,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: `linear-gradient(135deg, ${colors.blue}25, ${colors.blush}20)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Award size={22} color={colors.blue} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>Felicitari! Ai obtinut certificatul</h3>
                  <p style={{ fontSize: 12.5, color: colors.textMuted }}>Ai finalizat 100% din aceasta lectie.</p>
                </div>
              </div>
              <img src={l.certificateUrl} alt="Certificat" style={{
                width: '100%', borderRadius: 10, border: `1px solid ${colors.border}`,
                maxHeight: 320, objectFit: 'contain', background: '#fff', marginBottom: 14,
              }} />
              <a href={l.certificateUrl} download target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 9, border: 'none',
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                boxShadow: `0 4px 18px ${colors.blueGlow}`,
              }}>
                <Download size={15} /> Descarca Certificatul
              </a>
            </div>
          )}

          {/* Locked certificate hint — encourages user to complete */}
          {isLoggedIn && !USE_MOCK && enrolled && myPercent < 100 && l.certificateUrl && (
            <div className="animate-in delay-3" style={{
              marginBottom: 22, padding: 16, borderRadius: 12,
              background: colors.bgCard, border: `1px dashed ${colors.border}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Award size={20} color={colors.textDim} />
              <span style={{ fontSize: 12.5, color: colors.textMuted }}>
                Termina lectia 100% pentru a debloca certificatul. (Progres: {myPercent}%)
              </span>
            </div>
          )}

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
                {l.description || 'Nu exista descriere pentru aceasta lectie.'}
              </p>
            )}
            {tab === 'discussion' && (
              <div style={{ textAlign: 'center', padding: 36, color: colors.textDim }}>
                <MessageCircle size={38} style={{ marginBottom: 10, opacity: 0.3 }} />
                <p>Sectiunea de discutii va fi disponibila in curand.</p>
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
              {sections.length === 0 ? (
                <div style={{ padding: '18px 12px', color: colors.textDim, fontSize: 12.5, textAlign: 'center' }}>
                  Nu exista sectiuni disponibile.
                </div>
              ) : (
                sections.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px',
                    borderRadius: 9, background: 'transparent', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      background: colors.bgElevated, color: colors.textDim,
                    }}>
                      <span style={{ fontSize: 11.5 }}>{i + 1}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: colors.textPrimary }}>{s.title}</div>
                      <div style={{ fontSize: 10.5, color: colors.textDim }}>{s.duration}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12.5 }}>
                <span style={{ color: colors.textMuted }}>Progres</span>
                <span style={{ fontWeight: 600, color: colors.blue }}>{myPercent}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: colors.bgElevated }}>
                <div style={{
                  height: '100%', width: `${myPercent}%`, borderRadius: 3,
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
