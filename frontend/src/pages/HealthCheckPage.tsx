import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAxios } from 'react-axios-provider-kit';

type ApiStatus = 'checking' | 'online' | 'offline';

interface CheckResult {
  status: ApiStatus;
  responseTime: number | null;
  checkedAt: string;
  serverTime?: string;
}

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5000';

export default function HealthCheckPage() {
  const { colors } = useTheme();
  const { client } = useAxios();
  const [result, setResult] = useState<CheckResult>({
    status: 'checking',
    responseTime: null,
    checkedAt: '',
  });

  const runCheck = useCallback(async () => {
    setResult(r => ({ ...r, status: 'checking', responseTime: null }));
    const start = performance.now();
    try {
      const res = await client.get('/health');
      const ms = Math.round(performance.now() - start);
      setResult({
        status: 'online',
        responseTime: ms,
        checkedAt: new Date().toLocaleTimeString('ro-RO'),
        serverTime: res.data?.checkedAt,
      });
    } catch {
      setResult({
        status: 'offline',
        responseTime: null,
        checkedAt: new Date().toLocaleTimeString('ro-RO'),
      });
    }
  }, [client]);

  useEffect(() => { runCheck(); }, [runCheck]);

  const statusConfig = {
    checking: { color: colors.textMuted, bg: `${colors.textMuted}15`, icon: Clock,       label: 'Se verifica...' },
    online:   { color: colors.success,   bg: `${colors.success}15`,   icon: CheckCircle, label: 'Online'         },
    offline:  { color: colors.danger,    bg: `${colors.danger}15`,    icon: XCircle,     label: 'Offline'        },
  };

  const sc = statusConfig[result.status];
  const StatusIcon = sc.icon;
  const swaggerUrl = `${API_BASE_URL}/swagger`;
  const isDev = import.meta.env.DEV;

  const row = (label: string, value: React.ReactNode) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 0', borderBottom: `1px solid ${colors.border}`,
    }}>
      <span style={{ fontSize: 13.5, color: colors.textMuted }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: colors.textPrimary }}>{value}</span>
    </div>
  );

  return (
    <div style={{ padding: 28, maxWidth: 640, margin: '0 auto' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.4px' }}>
        Health Check
      </h2>
      <p style={{ color: colors.textMuted, fontSize: 13.5, marginBottom: 28 }}>
        Status conexiune backend si informatii despre mediul curent.
      </p>

      {/* Status card */}
      <div className="animate-in delay-1" style={{
        background: colors.bgCard, borderRadius: 16, padding: 28,
        border: `1px solid ${colors.border}`, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="blush-stripe" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: sc.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <StatusIcon size={26} color={sc.color}
                style={{ animation: result.status === 'checking' ? 'spin 1s linear infinite' : 'none' }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: sc.color }}>{sc.label}</div>
              {result.checkedAt && (
                <div style={{ fontSize: 12, color: colors.textDim, marginTop: 2 }}>
                  Verificat la {result.checkedAt}
                </div>
              )}
            </div>
          </div>

          <button onClick={runCheck} disabled={result.status === 'checking'} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 9,
            border: `1px solid ${colors.border}`,
            background: 'transparent', color: colors.textMuted,
            cursor: result.status === 'checking' ? 'not-allowed' : 'pointer',
            fontSize: 12.5, fontFamily: "'DM Sans', sans-serif",
          }}>
            <RefreshCw size={14} style={{ animation: result.status === 'checking' ? 'spin 1s linear infinite' : 'none' }} />
            Reincearca
          </button>
        </div>

        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 4 }}>
          {row('API URL', <code style={{ fontSize: 12, color: colors.blue }}>{API_BASE_URL}/api</code>)}
          {row('Timp raspuns', result.responseTime != null
            ? <span style={{ color: result.responseTime < 200 ? colors.success : colors.warning }}>
                {result.responseTime} ms
              </span>
            : '—'
          )}
          {row('Timp server', result.serverTime ? new Date(result.serverTime).toLocaleString('ro-RO') : '—')}
          {row('Mediu', <span style={{
            padding: '2px 9px', borderRadius: 5, fontSize: 11, fontWeight: 600,
            background: isDev ? `${colors.blush}18` : `${colors.success}15`,
            color: isDev ? colors.blush : colors.success,
          }}>{isDev ? 'Development' : 'Production'}</span>)}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 13 }}>
            <span style={{ fontSize: 13.5, color: colors.textMuted }}>Swagger UI</span>
            <a href={swaggerUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 5,
              color: colors.blue, fontSize: 13, fontWeight: 500,
            }}>
              {swaggerUrl} <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Endpoint checklist */}
      <div className="animate-in delay-2" style={{
        background: colors.bgCard, borderRadius: 16, padding: 22,
        border: `1px solid ${colors.border}`,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Endpoint-uri asteptate</h3>
        {[
          { method: 'GET',    path: '/api/health',         desc: 'Health check' },
          { method: 'POST',   path: '/api/auth/login',     desc: 'Autentificare' },
          { method: 'POST',   path: '/api/auth/register',  desc: 'Inregistrare' },
          { method: 'GET',    path: '/api/auth/me',        desc: 'Profil curent' },
          { method: 'GET',    path: '/api/lessons',        desc: 'Lista lectii' },
          { method: 'GET',    path: '/api/lessons/:id',    desc: 'Detalii lectie' },
          { method: 'GET',    path: '/api/leaderboard',    desc: 'Clasament' },
          { method: 'GET',    path: '/api/admin/stats',    desc: 'Statistici admin' },
        ].map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0',
            borderBottom: i < 7 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{
              padding: '2px 7px', borderRadius: 5, fontSize: 10.5, fontWeight: 700, minWidth: 44, textAlign: 'center',
              background: e.method === 'GET' ? `${colors.blue}15` : `${colors.success}15`,
              color: e.method === 'GET' ? colors.blue : colors.success,
            }}>{e.method}</span>
            <code style={{ flex: 1, fontSize: 12, color: colors.textMuted }}>{e.path}</code>
            <span style={{ fontSize: 12, color: colors.textDim }}>{e.desc}</span>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
