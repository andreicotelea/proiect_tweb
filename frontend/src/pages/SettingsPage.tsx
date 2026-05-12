import { useState } from 'react';
import { User, Lock, Bell, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/api';
import { USE_MOCK } from '@/config';

export default function SettingsPage() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifNewLesson, setNotifNewLesson] = useState(true);
  const [notifAchievement, setNotifAchievement] = useState(true);
  const [notifLeaderboard, setNotifLeaderboard] = useState(false);
  const [error, setError] = useState('');

  const handleSaveProfile = async () => {
    if (!user) return;
    setError('');
    if (USE_MOCK) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }
    try {
      const res = await userService.updateProfile(user.id, { name, email, avatar: user.avatar });
      const data = res.data as any;
      if (data.isSuccess) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Eroare la salvare.');
    }
  };

  const handleSavePassword = async () => {
    if (!user) return;
    setError('');
    if (newPass !== confirmPass) {
      setError('Parolele noi nu coincid.');
      return;
    }
    if (!currentPass || !newPass) {
      setError('Completează toate câmpurile.');
      return;
    }
    if (USE_MOCK) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }
    try {
      const res = await userService.changePassword(user.id, {
        currentPassword: currentPass,
        newPassword: newPass,
      });
      const data = res.data as any;
      if (data.isSuccess) {
        setSaved(true);
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Eroare la schimbarea parolei.');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Securitate', icon: Lock },
    { id: 'notifications', label: 'Notificari', icon: Bell },
  ];

  const inputStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 9,
    border: `1px solid ${colors.border}`,
    background: colors.bgElevated, color: colors.textPrimary,
    fontSize: 13.5, fontFamily: "'DM Sans', sans-serif",
    outline: 'none', width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12.5, fontWeight: 600, color: colors.textMuted, marginBottom: 6, display: 'block',
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: 42, height: 24, borderRadius: 12, cursor: 'pointer',
    background: active ? colors.blue : colors.bgElevated,
    border: `1px solid ${active ? colors.blue : colors.border}`,
    position: 'relative', transition: 'all 0.2s', flexShrink: 0,
  });

  const toggleDot = (active: boolean): React.CSSProperties => ({
    width: 18, height: 18, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 2,
    left: active ? 20 : 2,
    transition: 'left 0.2s',
  });

  return (
    <div style={{ padding: 28, maxWidth: 720, margin: '0 auto' }}>
      {/* Tabs */}
      <div className="animate-in delay-1" style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px',
              borderRadius: 9,
              border: `1px solid ${tab === t.id ? colors.blue + '38' : colors.border}`,
              background: tab === t.id ? colors.blueGlow : 'transparent',
              color: tab === t.id ? colors.blue : colors.textMuted,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="animate-in delay-2">
          <div style={{
            background: colors.bgCard, borderRadius: 14, padding: 28,
            border: `1px solid ${colors.border}`,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 22 }}>Informatii Profil</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 16,
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.blush})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 800, color: '#fff',
              }}>
                {user?.name?.split(' ').map(w => w[0]).join('') || 'U'}
              </div>
              <div>
                <button style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 12.5,
                  border: `1px solid ${colors.border}`, background: 'transparent',
                  color: colors.textMuted, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}>Schimba Avatar</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Nume complet</label>
                <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={inputStyle} />
              </div>
            </div>

            <button onClick={handleSaveProfile} style={{
              marginTop: 22, padding: '11px 24px', borderRadius: 9, border: 'none',
              background: saved ? colors.success : `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
              color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: saved ? 'none' : `0 4px 18px ${colors.blueGlow}`,
              transition: 'all 0.2s',
            }}>
              <Save size={15} /> {saved ? 'Salvat!' : 'Salveaza Modificarile'}
            </button>
            {error && (
              <div style={{ marginTop: 12, color: colors.danger, fontSize: 12.5 }}>{error}</div>
            )}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === 'security' && (
        <div className="animate-in delay-2">
          <div style={{
            background: colors.bgCard, borderRadius: 14, padding: 28,
            border: `1px solid ${colors.border}`, marginBottom: 18,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 22 }}>Schimba Parola</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Parola curenta</label>
                <div style={{ position: 'relative' }}>
                  <input value={currentPass} onChange={e => setCurrentPass(e.target.value)}
                    type={showPass ? 'text' : 'password'} style={inputStyle} />
                  <button onClick={() => setShowPass(!showPass)} style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: colors.textDim, cursor: 'pointer',
                  }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Parola noua</label>
                <input value={newPass} onChange={e => setNewPass(e.target.value)}
                  type="password" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Confirma parola noua</label>
                <input value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                  type="password" style={inputStyle} />
              </div>
            </div>

            <button onClick={handleSavePassword} style={{
              marginTop: 22, padding: '11px 24px', borderRadius: 9, border: 'none',
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
              color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: `0 4px 18px ${colors.blueGlow}`,
            }}>
              <Lock size={15} /> Actualizeaza Parola
            </button>
            {error && (
              <div style={{ marginTop: 12, color: colors.danger, fontSize: 12.5 }}>{error}</div>
            )}
          </div>

          {/* Danger Zone */}
          <div style={{
            background: colors.bgCard, borderRadius: 14, padding: 28,
            border: `1px solid ${colors.danger}25`,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: colors.danger }}>Zona Periculoasa</h3>
            <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 18 }}>
              Odata sters, contul nu poate fi recuperat. Toate datele vor fi pierdute permanent.
            </p>
            <button style={{
              padding: '11px 24px', borderRadius: 9,
              border: `1px solid ${colors.danger}40`,
              background: `${colors.danger}10`, color: colors.danger,
              fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <Trash2 size={15} /> Sterge Contul
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <div className="animate-in delay-2">
          <div style={{
            background: colors.bgCard, borderRadius: 14, padding: 28,
            border: `1px solid ${colors.border}`,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 22 }}>Preferinte Notificari</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Notificari pe email', desc: 'Primeste un sumar saptamanal pe email', value: notifEmail, set: setNotifEmail },
                { label: 'Lectii noi', desc: 'Fii notificat cand apare o lectie noua', value: notifNewLesson, set: setNotifNewLesson },
                { label: 'Realizari', desc: 'Notificari cand obtii o realizare noua', value: notifAchievement, set: setNotifAchievement },
                { label: 'Clasament', desc: 'Notificari cand urci sau cobori in clasament', value: notifLeaderboard, set: setNotifLeaderboard },
              ].map((n, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingBottom: i < 3 ? 18 : 0,
                  borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{n.label}</div>
                    <div style={{ fontSize: 12.5, color: colors.textMuted }}>{n.desc}</div>
                  </div>
                  <div onClick={() => n.set(!n.value)} style={toggleStyle(n.value)}>
                    <div style={toggleDot(n.value)} />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSaveProfile} style={{
              marginTop: 22, padding: '11px 24px', borderRadius: 9, border: 'none',
              background: saved ? colors.success : `linear-gradient(135deg, ${colors.blue}, ${colors.blueSoft})`,
              color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: saved ? 'none' : `0 4px 18px ${colors.blueGlow}`,
              transition: 'all 0.2s',
            }}>
              <Save size={15} /> {saved ? 'Salvat!' : 'Salveaza Preferintele'}
            </button>
            {error && (
              <div style={{ marginTop: 12, color: colors.danger, fontSize: 12.5 }}>{error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
