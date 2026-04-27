import { useState, useEffect } from 'react';
import { Users, Eye, BookOpen, Star, BarChart3, Grid, Plus, Bell, FileText, Edit, Trash2, Settings, X, Save } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { StatCard } from '@/components';
import { lessonService, categoryService, adminService, userService } from '@/api';
import { USE_MOCK } from '@/config';
import { mockLessons, mockLeaderboard, mockAdminStats } from '@/services/mockData';
import type { Lesson, AdminStats, Category } from '@/types';

interface UserItem { id: number; name: string; email: string; role: string; avatar: string; createdAt: string; }

export default function AdminPage() {
  const [tab, setTab] = useState('overview');
  const { colors } = useTheme();
  const [stats, setStats] = useState<AdminStats>(mockAdminStats);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  // Lesson form
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editLessonId, setEditLessonId] = useState<number | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonCatId, setLessonCatId] = useState(1);
  const [lessonDiff, setLessonDiff] = useState('Beginner');
  const [lessonDuration, setLessonDuration] = useState('30 min');
  const [lessonProfesor, setLessonProfesor] = useState('');

  // Category form
  const [showCatForm, setShowCatForm] = useState(false);
  const [editCatId, setEditCatId] = useState<number | null>(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catIcon, setCatIcon] = useState('CT');

  useEffect(() => {
    if (USE_MOCK) {
      setLessons(mockLessons);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const [statsRes, lessonsRes, catRes, usersRes] = await Promise.all([
          adminService.getStats(),
          lessonService.getAll(),
          categoryService.getAll(),
          userService.getAll(),
        ]);
        setStats(statsRes.data as any);
        setLessons(lessonsRes.data as any);
        setCategories(catRes.data as any);
        setUsers(usersRes.data as any);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setLessons(mockLessons);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const flashMsg = (text: string) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  // Lesson CRUD
  const openAddLesson = () => {
    setEditLessonId(null); setLessonTitle(''); setLessonDesc(''); setLessonCatId(categories[0]?.id || 1);
    setLessonDiff('Beginner'); setLessonDuration('30 min'); setLessonProfesor(''); setShowLessonForm(true);
  };
  const openEditLesson = (l: Lesson) => {
    setEditLessonId(l.id); setLessonTitle(l.title); setLessonDesc(l.description || '');
    setLessonCatId((l as any).categoryId || 1); setLessonDiff(l.difficulty); setLessonDuration(l.duration);
    setLessonProfesor(l.profesor); setShowLessonForm(true);
  };
  const saveLesson = async () => {
    if (USE_MOCK) { flashMsg('Mock mode — nu se salveaza.'); setShowLessonForm(false); return; }
    try {
      const payload = { title: lessonTitle, description: lessonDesc, categoryId: lessonCatId, difficulty: lessonDiff, duration: lessonDuration, profesorName: lessonProfesor, thumbnail: 'DF', isLocked: false };
      if (editLessonId) {
        await lessonService.update(editLessonId, payload as any);
        flashMsg('Lectie actualizata.');
      } else {
        await lessonService.create(payload as any);
        flashMsg('Lectie creata.');
      }
      const res = await lessonService.getAll();
      setLessons(res.data as any);
    } catch (err: any) {
      flashMsg(err.response?.data?.message || 'Eroare.');
    }
    setShowLessonForm(false);
  };
  const deleteLesson = async (id: number) => {
    if (USE_MOCK) return;
    try {
      await lessonService.delete(id);
      setLessons(prev => prev.filter(l => l.id !== id));
      flashMsg('Lectie stearsa.');
    } catch (err: any) {
      flashMsg(err.response?.data?.message || 'Eroare la stergere.');
    }
  };

  // Category CRUD
  const openAddCat = () => { setEditCatId(null); setCatName(''); setCatDesc(''); setCatIcon('CT'); setShowCatForm(true); };
  const openEditCat = (c: Category) => { setEditCatId(c.id); setCatName(c.name); setCatDesc(c.description || ''); setCatIcon(c.icon || 'CT'); setShowCatForm(true); };
  const saveCat = async () => {
    if (USE_MOCK) { flashMsg('Mock mode.'); setShowCatForm(false); return; }
    try {
      const payload = { name: catName, description: catDesc, icon: catIcon };
      if (editCatId) {
        await categoryService.update(editCatId, payload as any);
        flashMsg('Categorie actualizata.');
      } else {
        await categoryService.create(payload as any);
        flashMsg('Categorie creata.');
      }
      const res = await categoryService.getAll();
      setCategories(res.data as any);
    } catch (err: any) {
      flashMsg(err.response?.data?.message || 'Eroare.');
    }
    setShowCatForm(false);
  };
  const deleteCat = async (id: number) => {
    if (USE_MOCK) return;
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      flashMsg('Categorie stearsa.');
    } catch (err: any) {
      flashMsg(err.response?.data?.message || 'Eroare la stergere.');
    }
  };

  const adminTabs = [
    { id: 'overview', label: 'Prezentare', icon: BarChart3 },
    { id: 'lessons-mgmt', label: 'Lectii', icon: BookOpen },
    { id: 'users-mgmt', label: 'Utilizatori', icon: Users },
    { id: 'categories', label: 'Categorii', icon: Grid },
  ];

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px', borderRadius: 8, border: `1px solid ${colors.border}`,
    background: colors.bgElevated, color: colors.textPrimary, fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: 'none', width: '100%',
  };

  if (loading) return <div style={{ padding: 28, color: colors.textMuted }}>Se incarca...</div>;

  return (
    <div style={{ padding: 28 }}>
      {msg && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 999, padding: '12px 20px', borderRadius: 10, background: colors.blue, color: '#fff', fontSize: 13, fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          {msg}
        </div>
      )}

      {/* Tabs */}
      <div className="animate-in delay-1" style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
        {adminTabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px', borderRadius: 9,
              border: `1px solid ${tab === t.id ? colors.blue + '38' : colors.border}`,
              background: tab === t.id ? colors.blueGlow : 'transparent',
              color: tab === t.id ? colors.blue : colors.textMuted,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}><Icon size={15} /> {t.label}</button>
          );
        })}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            <StatCard icon={Users} label="Total Utilizatori" value={stats.totalUsers.toLocaleString()} trend={12} color={colors.blue} delay={2} />
            <StatCard icon={Eye} label="Utilizatori Activi" value={stats.activeUsers.toLocaleString()} trend={5} color={colors.steel} delay={3} />
            <StatCard icon={BookOpen} label="Total Lectii" value={String(stats.totalLessons)} color={colors.blush} delay={4} />
            <StatCard icon={Star} label="Rating Mediu" value={String(stats.avgRating)} color={colors.success} delay={5} />
          </div>
          <div className="animate-in delay-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Completare Lectii</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 95, height: 95, borderRadius: '50%', background: `conic-gradient(${colors.blue} ${stats.completionRate}%, ${colors.bgElevated} 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19 }}>{stats.completionRate}%</div>
                </div>
                <p style={{ color: colors.textMuted, fontSize: 12.5, lineHeight: 1.8 }}>Rata de completare<br />a lectiilor este de <strong style={{ color: colors.textPrimary }}>{stats.completionRate}%</strong></p>
              </div>
            </div>
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Actiuni Rapide</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <button onClick={() => { setTab('lessons-mgmt'); openAddLesson(); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px', borderRadius: 9, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textPrimary, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, textAlign: 'left' }}><Plus size={17} color={colors.blue} /> Adauga Lectie Noua</button>
                <button onClick={() => setTab('categories')} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px', borderRadius: 9, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textPrimary, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, textAlign: 'left' }}><Grid size={17} color={colors.steel} /> Gestioneaza Categorii</button>
                <button onClick={() => setTab('users-mgmt')} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 16px', borderRadius: 9, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textPrimary, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, textAlign: 'left' }}><Users size={17} color={colors.success} /> Gestioneaza Utilizatori</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lessons Management */}
      {tab === 'lessons-mgmt' && (
        <div className="animate-in delay-2">
          {showLessonForm && (
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}`, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{editLessonId ? 'Editeaza Lectia' : 'Adauga Lectie Noua'}</h3>
                <button onClick={() => setShowLessonForm(false)} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Titlu</label><input value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Profesor</label><input value={lessonProfesor} onChange={e => setLessonProfesor(e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Categorie</label>
                  <select value={lessonCatId} onChange={e => setLessonCatId(Number(e.target.value))} style={inputStyle}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Dificultate</label>
                  <select value={lessonDiff} onChange={e => setLessonDiff(e.target.value)} style={inputStyle}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Descriere</label><input value={lessonDesc} onChange={e => setLessonDesc(e.target.value)} style={inputStyle} /></div>
              </div>
              <button onClick={saveLesson} style={{ marginTop: 14, padding: '10px 20px', borderRadius: 9, border: 'none', background: colors.blue, color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Save size={14} /> Salveaza</button>
            </div>
          )}
          <div style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Toate Lectiile ({lessons.length})</h3>
              <button onClick={openAddLesson} style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: colors.blue, color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Plus size={15} /> Adauga</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px 90px 75px', padding: '11px 22px', fontSize: 11.5, fontWeight: 600, color: colors.textDim, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `1px solid ${colors.border}` }}>
              <span>Titlu</span><span>Categorie</span><span>Dificultate</span><span>Rating</span><span>Actiuni</span>
            </div>
            {lessons.map((l, i) => (
              <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px 90px 75px', padding: '14px 22px', alignItems: 'center', borderBottom: i < lessons.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                <span style={{ fontWeight: 500, fontSize: 13.5 }}>{l.title}</span>
                <span style={{ fontSize: 12.5, color: colors.textMuted }}>{l.category}</span>
                <span style={{ fontSize: 12.5, color: colors.textMuted }}>{l.difficulty}</span>
                <span style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} color={colors.blush} fill={colors.blush} /> {l.rating}</span>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button onClick={() => openEditLesson(l)} style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={13} /></button>
                  <button onClick={() => deleteLesson(l.id)} style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.danger, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Management */}
      {tab === 'users-mgmt' && (
        <div className="animate-in delay-2" style={{ background: colors.bgCard, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${colors.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Utilizatori ({USE_MOCK ? stats.totalUsers : users.length})</h3>
          </div>
          {(USE_MOCK ? mockLeaderboard.map(u => ({ id: 0, name: u.name, email: '', role: 'student', avatar: u.avatar, createdAt: '' })) : users).map((u, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: `${colors.blue}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: colors.blue }}>{u.avatar || 'U'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{u.name}</div>
                <div style={{ fontSize: 11.5, color: colors.textDim }}>{u.email || 'student'} · {u.role}</div>
              </div>
              <span style={{ padding: '3px 9px', borderRadius: 5, fontSize: 10.5, background: u.role === 'admin' ? `${colors.blue}15` : 'rgba(109,191,160,0.12)', color: u.role === 'admin' ? colors.blue : colors.success }}>{u.role}</span>
            </div>
          ))}
        </div>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <div className="animate-in delay-2">
          {showCatForm && (
            <div style={{ background: colors.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${colors.border}`, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{editCatId ? 'Editeaza Categoria' : 'Adauga Categorie Noua'}</h3>
                <button onClick={() => setShowCatForm(false)} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Nume</label><input value={catName} onChange={e => setCatName(e.target.value)} style={inputStyle} /></div>
                <div style={{ width: 80 }}><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Icon</label><input value={catIcon} onChange={e => setCatIcon(e.target.value)} style={inputStyle} /></div>
              </div>
              <div style={{ marginTop: 12 }}><label style={{ fontSize: 12, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Descriere</label><input value={catDesc} onChange={e => setCatDesc(e.target.value)} style={inputStyle} /></div>
              <button onClick={saveCat} style={{ marginTop: 14, padding: '10px 20px', borderRadius: 9, border: 'none', background: colors.blue, color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Save size={14} /> Salveaza</button>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {(USE_MOCK ? [{ id: 0, name: 'Frontend', description: '', icon: 'FE', lessonCount: 5 }] : categories).map((c, i) => (
              <div key={i} style={{ background: colors.bgCard, borderRadius: 12, padding: 22, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: colors.textMuted }}>{c.lessonCount} lectii</div>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button onClick={() => openEditCat(c)} style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={13} /></button>
                  <button onClick={() => deleteCat(c.id)} style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.danger, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
            <button onClick={openAddCat} style={{ borderRadius: 12, padding: 22, border: `2px dashed ${colors.border}`, background: 'transparent', color: colors.textDim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5 }}>
              <Plus size={17} /> Adauga Categorie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
