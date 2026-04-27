import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../router/paths';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerMock, isLoggedIn } = useAuth();
  const { colors } = useTheme();

  if (isLoggedIn) {
    navigate(ROUTES.DASHBOARD, { replace: true });
    return null;
  }

  const handleSubmit = () => {
    setError('');
    if (!name.trim()) { setError('Introdu numele tău.'); return; }
    if (!email.trim() || !password.trim()) { setError('Completează toate câmpurile.'); return; }
    setLoading(true);
    registerMock(name, email);
    setLoading(false);
    navigate(ROUTES.DASHBOARD);
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
    <div style={{
      background: colors.bgCard, borderRadius: 18,
      border: `1px solid ${colors.border}`, padding: 36,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 13, margin: '0 auto 14px',
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, color: '#fff',
        }}>L</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary }}>
          Creează cont
        </h2>
        <p style={{ color: colors.textMuted, fontSize: 13.5, marginTop: 5 }}>
          Începe să înveți astăzi
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Numele tău" style={inputStyle} onKeyDown={handleKey} />
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
          {loading ? 'Se procesează...' : 'Înregistrare'}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12.5, color: colors.textMuted }}>
        Ai deja cont?{' '}
        <Link to={ROUTES.LOGIN} style={{ color: colors.blue, textDecoration: 'none', fontWeight: 500 }}>
          Conectează-te
        </Link>
      </div>
    </div>
  );
}
