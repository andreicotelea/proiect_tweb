import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AuthModal({ show, onClose, onLogin }: AuthModalProps) {
  const { colors } = useTheme();
  const { loginWithCredentials, registerWithApi } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    if (mode === 'login') {
      const result = await loginWithCredentials(email, password);
      setLoading(false);
      if (!result.ok) { setError(result.error ?? 'Eroare.'); return; }
    } else {
      if (!name.trim()) { setLoading(false); setError('Introdu numele tău.'); return; }
      if (!email.trim() || !password.trim()) { setLoading(false); setError('Completează toate câmpurile.'); return; }
      const result = await registerWithApi(name, email, password);
      setLoading(false);
      if (!result.ok) { setError(result.error ?? 'Eroare.'); return; }
    }
    onLogin();
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSubmit(); };

  const inputStyle: React.CSSProperties = {
    padding: '13px 15px', borderRadius: 9,
    border: `1px solid ${error ? colors.danger : colors.border}`,
    background: colors.bgElevated, color: colors.textPrimary,
    fontSize: 13.5, fontFamily: "'DM Sans', sans-serif",
    outline: 'none', width: '100%',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(10,18,24,0.8)',
        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 200, animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width: 420, background: colors.bgCard, borderRadius: 18,
        border: `1px solid ${colors.border}`, padding: 36,
        animation: 'fadeUp 0.4s ease', position: 'relative', overflow: 'hidden',
      }}>
        <div className="blush-stripe" />

        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 13, margin: '0 auto 14px',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, color: '#fff',
          }}>L</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary }}>
            {mode === 'login' ? 'Bine ai revenit!' : 'Creează cont'}
          </h2>
          <p style={{ color: colors.textMuted, fontSize: 13.5, marginTop: 5 }}>
            {mode === 'login' ? 'Conectează-te la contul tău' : 'Începe să înveți astăzi'}
          </p>
        </div>

        {mode === 'login' && (
          <div style={{
            background: `${colors.blue}10`, border: `1px solid ${colors.blue}25`,
            borderRadius: 9, padding: '10px 14px', marginBottom: 15,
            fontSize: 11.5, color: colors.textMuted, lineHeight: 1.9,
          }}>
            <span style={{ color: colors.blue, fontWeight: 600 }}>Conturi test:</span><br />
            🧑‍💻 <strong>user@learnflow.md</strong> / <code>user</code> — Student<br />
            🛡️ <strong>admin@learnflow.md</strong> / <code>admin</code> — Admin
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {mode === 'register' && (
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Numele tău" style={inputStyle} onKeyDown={handleKey} />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" type="email" style={inputStyle} onKeyDown={handleKey} />
          <input value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Parolă" type="password" style={inputStyle} onKeyDown={handleKey} />

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              color: colors.danger, fontSize: 12.5,
              padding: '8px 12px', background: `${colors.danger}12`, borderRadius: 7,
            }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{
            padding: 13, borderRadius: 9, border: 'none',
            background: loading ? colors.bgElevated : `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: loading ? colors.textMuted : '#fff',
            fontSize: 14.5, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", marginTop: 4,
            boxShadow: loading ? 'none' : `0 4px 20px ${colors.blueGlow}`,
            transition: 'all 0.2s',
          }}>
            {loading ? 'Se procesează...' : mode === 'login' ? 'Conectare' : 'Înregistrare'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12.5, color: colors.textMuted }}>
          {mode === 'login' ? 'Nu ai cont? ' : 'Ai deja cont? '}
          <span onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ color: colors.blue, cursor: 'pointer', fontWeight: 500 }}>
            {mode === 'login' ? 'Înregistrează-te' : 'Conectează-te'}
          </span>
        </div>

        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer',
        }}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
