import { AxiosProvider as BaseAxiosProvider } from 'react-axios-provider-kit';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5000';

export default function AppAxiosProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <BaseAxiosProvider
      baseURL={`${API_BASE_URL}/api`}
      onNotify={({ level, message }) => {
        if (level === 'error') {
          console.error('[API Error]:', message);
        }
        if (level === 'warning') {
          console.warn('[API Warning]:', message);
        }
      }}
      onAuthFailure={() => {
        localStorage.removeItem('lf_token');
        window.dispatchEvent(new Event('auth:logout'));
        navigate('/');
      }}
      onError={(error) => {
        const status = error.response?.status;

        if (!error.response) {
          navigate('/error', { state: { code: 500, message: 'Serverul nu raspunde. Verificati conexiunea.' } });
          return;
        }

        if (status === 500) {
          navigate('/error', { state: { code: 500, message: 'Eroare interna de server.' } });
        }

        if (status === 403) {
          navigate('/dashboard');
        }
      }}
    >
      {children}
    </BaseAxiosProvider>
  );
}
