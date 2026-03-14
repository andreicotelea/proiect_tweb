import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate, useLocation } from 'react-router-dom';

interface ErrorState {
  code?: number;
  message?: string;
}

export default function ErrorPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as ErrorState) || {};
  const code = state.code || 500;
  const message = state.message || 'A aparut o eroare neasteptata.';

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: colors.bgPrimary, color: colors.textPrimary,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 28 }}>
        <div className="animate-in delay-1" style={{
          width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px',
          background: `${colors.danger}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={36} color={colors.danger} />
        </div>

        <h1 className="animate-in delay-2" style={{
          fontSize: 64, fontWeight: 900, letterSpacing: '-3px',
          color: colors.danger, marginBottom: 8,
        }}>
          {code}
        </h1>

        <h2 className="animate-in delay-3" style={{
          fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.4px',
        }}>
          {code === 500 ? 'Eroare de Server' : 'Eroare'}
        </h2>

        <p className="animate-in delay-4" style={{
          fontSize: 14, color: colors.textMuted, lineHeight: 1.7, marginBottom: 32,
        }}>
          {message}
        </p>

        <div className="animate-in delay-5" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()} style={{
            padding: '12px 24px', borderRadius: 9, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 7,
            boxShadow: `0 4px 18px ${colors.blueGlow}`,
          }}>
            <RefreshCw size={15} /> Reincearca
          </button>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '12px 24px', borderRadius: 9,
            border: `1px solid ${colors.border}`,
            background: 'transparent', color: colors.textMuted,
            fontSize: 13.5, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <Home size={15} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
