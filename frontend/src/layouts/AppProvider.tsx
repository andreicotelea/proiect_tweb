import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider } from '../hooks/useTheme';
import AppAxiosProvider from '../providers/AxiosProvider';

export default function AppProvider() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppAxiosProvider>
          <ToastProvider>
            <Outlet />
          </ToastProvider>
        </AppAxiosProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
