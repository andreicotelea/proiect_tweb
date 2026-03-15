import { Home, ArrowLeft, } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();

 
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: colors.bgPrimary, color: colors.textPrimary,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: 'center', maxWidth: 520, padding: 28 }}>

        {/* 4 0 4 */}
        <div className="animate-in delay-1" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, marginBottom: 28, position: 'relative',
        }}>
          {/* 4 */}
          <span style={{
            fontSize: 120, fontWeight: 900, letterSpacing: '-6px',
            color: colors.blue, lineHeight: 1,
          }}>4</span>

          {/* 0 = circle with video */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            border: `4px solid ${colors.blue}`,
            boxShadow: `0 0 30px ${colors.blueGlow}, 0 0 60px ${colors.blueGlow}`,
            animation: 'pulseGlow 2s ease infinite',
          }}>
             <iframe
              src="https://www.youtube.com/embed/RVBjSKGcFpg?autoplay=1&loop=1&playlist=RVBjSKGcFpg&controls=0&showinfo=0&mute=0&modestbranding=1&rel=0"
              title="404"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                width: 220,
                height: 220,
                border: 'none',
                marginTop: -50,
                marginLeft: -50,
              }}
            />
          </div>

          {/* 4 */}
          <span style={{
            fontSize: 120, fontWeight: 900, letterSpacing: '-6px',
            color: colors.blue, lineHeight: 1,
          }}>4</span>
        </div>

        <h2 className="animate-in delay-2" style={{
          fontSize: 24, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.4px',
        }}>
          Pagina nu a fost gasita
        </h2>

        <p className="animate-in delay-3" style={{
          fontSize: 14, color: colors.textMuted, lineHeight: 1.7, marginBottom: 32,
        }}>
          Se pare ca te-ai ratacit. Pagina pe care o cauti nu exista sau a fost mutata.
        </p>

        <div className="animate-in delay-4" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigate(-1)} style={{
            padding: '12px 24px', borderRadius: 9,
            border: `1px solid ${colors.border}`,
            background: 'transparent', color: colors.textMuted,
            fontSize: 13.5, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <ArrowLeft size={15} /> Inapoi
          </button>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '12px 24px', borderRadius: 9, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 7,
            boxShadow: `0 4px 18px ${colors.blueGlow}`,
          }}>
            <Home size={15} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
