import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Grid } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { categoryService } from '@/api';
import type { Category } from '@/types';

export default function CategoriesPage() {
  const { colors } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', description: '', icon: 'CT' });
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data as any);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: '', description: '', icon: 'CT' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description || '', icon: cat.icon || 'CT' });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError('Numele categoriei este obligatoriu.');
      return;
    }
    try {
      if (editingId) {
        await categoryService.update(editingId, form);
      } else {
        await categoryService.create(form);
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      setError('Operatiunea a esuat. Incearca din nou.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Esti sigur ca vrei sa stergi aceasta categorie?')) return;
    try {
      await categoryService.delete(id);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (loading) return <div style={{ padding: 28, color: colors.textMuted }}>Se incarca...</div>;

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Categorii</h1>
          <p style={{ fontSize: 13, color: colors.textMuted }}>{categories.length} categorii in total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          style={{
            padding: '10px 20px', borderRadius: 9, border: 'none',
            background: colors.blue, color: '#fff', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <Plus size={16} /> Adauga Categorie
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: colors.bgCard, borderRadius: 12, padding: 22,
          border: `1px solid ${colors.border}`, marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>
              {editingId ? 'Editeaza Categoria' : 'Categorie Noua'}
            </h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted }}>
              <X size={18} />
            </button>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,80,80,0.1)', color: colors.danger, fontSize: 13, marginBottom: 14 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 4, display: 'block' }}>Nume *</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Frontend, Backend..."
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${colors.border}`, background: colors.bgElevated,
                  color: colors.textPrimary, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 4, display: 'block' }}>Descriere</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Descrierea categoriei..."
                rows={3}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${colors.border}`, background: colors.bgElevated,
                  color: colors.textPrimary, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 4, display: 'block' }}>Icon</label>
              <input
                value={form.icon}
                onChange={e => setForm({ ...form, icon: e.target.value })}
                placeholder="Ex: CT, FE, BE..."
                style={{
                  width: '200px', padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${colors.border}`, background: colors.bgElevated,
                  color: colors.textPrimary, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '10px 24px', borderRadius: 9, border: 'none',
                  background: colors.blue, color: '#fff', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                }}
              >
                {editingId ? 'Salveaza' : 'Creeaza'}
              </button>
              <button
                onClick={resetForm}
                style={{
                  padding: '10px 24px', borderRadius: 9,
                  border: `1px solid ${colors.border}`, background: 'transparent',
                  color: colors.textMuted, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                }}
              >
                Anuleaza
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div style={{
        background: colors.bgCard, borderRadius: 14,
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '50px 1fr 1.5fr 80px 80px 90px',
          padding: '12px 22px', fontSize: 11.5, fontWeight: 600,
          color: colors.textDim, textTransform: 'uppercase', letterSpacing: '0.5px',
          borderBottom: `1px solid ${colors.border}`,
        }}>
          <span>ID</span><span>Nume</span><span>Descriere</span><span>Icon</span><span>Lectii</span><span>Actiuni</span>
        </div>

        {categories.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>
            <Grid size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>Nu exista categorii. Adauga prima categorie!</p>
          </div>
        ) : (
          categories.map((cat, i) => (
            <div key={cat.id} style={{
              display: 'grid', gridTemplateColumns: '50px 1fr 1.5fr 80px 80px 90px',
              padding: '14px 22px', alignItems: 'center',
              borderBottom: i < categories.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <span style={{ fontSize: 12.5, color: colors.textDim }}>#{cat.id}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{cat.name}</span>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{cat.description || '—'}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 8,
                background: `${colors.blue}15`, fontSize: 11, fontWeight: 700, color: colors.blue,
              }}>{cat.icon}</span>
              <span style={{ fontSize: 13 }}>{cat.lessonCount}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => handleEdit(cat)}
                  style={{
                    width: 32, height: 32, borderRadius: 7,
                    border: `1px solid ${colors.border}`, background: 'transparent',
                    color: colors.textMuted, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  style={{
                    width: 32, height: 32, borderRadius: 7,
                    border: `1px solid ${colors.border}`, background: 'transparent',
                    color: colors.danger, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}