import { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { LessonCard } from '@/components';
import { lessonService } from '@/api';
import { categoryService } from '@/api';
import { USE_MOCK } from '@/config';
import { mockLessons, categories as mockCategories, difficulties } from '@/services/mockData';
import type { Lesson } from '@/types';

export default function LessonsPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [categories, setCategories] = useState<string[]>(mockCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      setLessons(mockLessons);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const [lessonsRes, catRes] = await Promise.all([
          lessonService.getAll(),
          categoryService.getAll(),
        ]);
        setLessons(lessonsRes.data as any);
        const catNames = (catRes.data as any).map((c: any) => c.name);
        setCategories(['All', ...catNames]);
      } catch (err) {
        console.error('Failed to fetch lessons:', err);
        setLessons(mockLessons);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = lessons.filter(l => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && l.category !== category) return false;
    if (difficulty !== 'All' && l.difficulty !== difficulty) return false;
    return true;
  });

  if (loading) return <div style={{ padding: 28, color: colors.textMuted }}>Se incarca lectiile...</div>;

  return (
    <div style={{ padding: 28 }}>
      {/* Filters */}
      <div className="animate-in delay-1" style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <Search size={17} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: colors.textDim }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cauta lectii..." style={{
            width: '100%', padding: '11px 13px 11px 42px', borderRadius: 9,
            border: `1px solid ${colors.border}`, background: colors.bgCard,
            color: colors.textPrimary, fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", outline: 'none',
          }} />
        </div>

        <div style={{ display: 'flex', gap: 5 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '9px 14px', borderRadius: 7, border: `1px solid ${colors.border}`,
              background: category === c ? colors.blue : 'transparent',
              color: category === c ? '#fff' : colors.textMuted,
              fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', fontWeight: 500,
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 5 }}>
          {difficulties.map(d => (
            <button key={d} onClick={() => setDifficulty(d)} style={{
              padding: '9px 12px', borderRadius: 7, border: `1px solid ${colors.border}`,
              background: difficulty === d ? colors.steel : 'transparent',
              color: difficulty === d ? colors.bgPrimary : colors.textMuted,
              fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', fontWeight: 500,
            }}>{d}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
          <button onClick={() => setViewMode('grid')} style={{
            width: 36, height: 36, borderRadius: 7, border: `1px solid ${colors.border}`,
            background: viewMode === 'grid' ? colors.bgElevated : 'transparent',
            color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Grid size={15} /></button>
          <button onClick={() => setViewMode('list')} style={{
            width: 36, height: 36, borderRadius: 7, border: `1px solid ${colors.border}`,
            background: viewMode === 'list' ? colors.bgElevated : 'transparent',
            color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><List size={15} /></button>
        </div>
      </div>

      <div className="animate-in delay-2" style={{ fontSize: 12.5, color: colors.textMuted, marginBottom: 18 }}>
        {filtered.length} lectii gasite
      </div>

      {/* Grid */}
      <div style={{
        display: viewMode === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        flexDirection: viewMode === 'list' ? 'column' : undefined,
        gap: 14,
      }}>
        {filtered.map((l, i) => (
          <LessonCard key={l.id} lesson={l} delay={Math.min(i + 2, 8)}
            onClick={ls => navigate(`/lessons/${ls.id}`)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 55, color: colors.textMuted }}>
          <Search size={44} style={{ marginBottom: 14, opacity: 0.3 }} />
          <p style={{ fontSize: 15 }}>Nu am gasit lectii cu aceste filtre.</p>
        </div>
      )}
    </div>
  );
}
