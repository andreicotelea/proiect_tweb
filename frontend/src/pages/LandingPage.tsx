import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Zap, ArrowRight, Star, Users } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import AuthModal from '@/components/AuthModal';

export default function LandingPage() {
  const { colors, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = () => {
    setShowAuth(false);
    navigate('/dashboard');
  };

  const handleGuest = () => {
    navigate('/dashboard');
  };

  const features = [
    { icon: BookOpen, title: 'Lectii Interactive', desc: 'Continut video + exercitii practice pentru fiecare lectie' },
    { icon: Trophy, title: 'Clasament & Puncte', desc: 'Competi cu alti studenti si urmareste-ti progresul' },
    { icon: Zap, title: 'Serie Zilnica', desc: 'Mentine-ti seria si dezvolta obiceiul de a invata zilnic' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bgPrimary,
      color: colors.textPrimary,
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px',
        borderBottom: `1px solid ${colors.border}`,
        background: `${colors.bgCard}cc`,
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#fff',
            boxShadow: `0 4px 16px ${colors.blueGlow}`,
          }}>L</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.4px' }}>
            Learn<span style={{ color: colors.blue }}>Flow</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggleTheme} title={isDark ? 'Mod luminos' : 'Mod intunecat'} style={{
            width: 38, height: 38, borderRadius: 9,
            border: `1px solid ${colors.border}`,
            background: 'transparent', color: colors.textMuted,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17,
          }}>
            {isDark ? 'L' : 'D'}
          </button>

          <button onClick={() => setShowAuth(true)} style={{
            padding: '9px 20px', borderRadius: 9,
            border: `1px solid ${colors.border}`,
            background: 'transparent', color: colors.textPrimary,
            cursor: 'pointer', fontSize: 13.5, fontWeight: 500,
          }}>
            Conectare
          </button>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '9px 22px', borderRadius: 9, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', cursor: 'pointer', fontSize: 13.5, fontWeight: 600,
            boxShadow: `0 4px 18px ${colors.blueGlow}`,
          }}>
            Creaza Cont
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '15%',
          width: 340, height: 340, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.blue}12, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '10%',
          width: 280, height: 280, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.blush}10, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div className="animate-in delay-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 16px', borderRadius: 30,
          background: `${colors.blue}15`,
          border: `1px solid ${colors.blue}28`,
          color: colors.blue, fontSize: 12.5, fontWeight: 600,
          marginBottom: 28,
        }}>
          <Star size={13} fill={colors.blue} /> Platforma #1 de invatare in Romania
        </div>

        <h1 className="animate-in delay-2" style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 900, letterSpacing: '-2px',
          lineHeight: 1.1, marginBottom: 22, maxWidth: 780,
        }}>
          Invata programare<br />
          <span style={{
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>la un alt nivel</span>
        </h1>

        <p className="animate-in delay-3" style={{
          fontSize: 18, color: colors.textMuted, maxWidth: 520,
          lineHeight: 1.7, marginBottom: 42,
        }}>
          Lectii video interactive, exercitii practice si un sistem de progres
          care te motiveaza sa inveti in fiecare zi.
        </p>

        <div className="animate-in delay-4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '15px 36px', borderRadius: 11, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', fontSize: 15.5, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 9,
            boxShadow: `0 6px 28px ${colors.blueGlow}`,
          }}>
            Incepe Gratuit <ArrowRight size={18} />
          </button>
          <button onClick={handleGuest} style={{
            padding: '15px 32px', borderRadius: 11,
            border: `1px solid ${colors.border}`,
            background: 'transparent',
            color: colors.textPrimary, fontSize: 15.5, fontWeight: 600, cursor: 'pointer',
          }}>
            Exploreaza ca Guest
          </button>
        </div>

        {/* Stats row */}
        <div className="animate-in delay-5" style={{
          display: 'flex', gap: 48, marginTop: 64,
          borderTop: `1px solid ${colors.border}`, paddingTop: 40,
        }}>
          {[
            { value: '3,421', label: 'Studenti activi' },
            { value: '48', label: 'Lectii disponibile' },
            { value: '4.8', label: 'Rating mediu' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-1px', color: colors.blue }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: colors.textMuted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{
        padding: '60px 48px',
        background: colors.bgCard,
        borderTop: `1px solid ${colors.border}`,
      }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, marginBottom: 44, letterSpacing: '-0.5px' }}>
            De ce <span style={{ color: colors.blue }}>LearnFlow</span>?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`animate-in delay-${i + 2}`} style={{
                  background: colors.bgElevated, borderRadius: 16, padding: 28,
                  border: `1px solid ${colors.border}`,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${colors.blue}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon size={22} color={colors.blue} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13.5, color: colors.textMuted, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div style={{
        padding: '48px 48px',
        textAlign: 'center',
        background: colors.bgPrimary,
        borderTop: `1px solid ${colors.border}`,
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
          Gata sa incepi?
        </h2>
        <p style={{ color: colors.textMuted, marginBottom: 28, fontSize: 14 }}>
          Alatura-te celor 3,421 de studenti care invata deja pe LearnFlow.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '12px 30px', borderRadius: 10, border: 'none',
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
            boxShadow: `0 4px 18px ${colors.blueGlow}`,
          }}>
            <Users size={16} /> Creaza Cont Gratuit
          </button>
          <button onClick={handleGuest} style={{
            padding: '12px 26px', borderRadius: 10,
            border: `1px solid ${colors.border}`,
            background: 'transparent',
            color: colors.textMuted, fontSize: 14, cursor: 'pointer',
          }}>
            Continua ca Guest
          </button>
        </div>
      </div>

      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} onLogin={handleLogin} />
    </div>
  );
}
