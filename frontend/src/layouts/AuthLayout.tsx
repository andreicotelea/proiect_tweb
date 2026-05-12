import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: 16,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Outlet />
      </div>
    </div>
  );
}
