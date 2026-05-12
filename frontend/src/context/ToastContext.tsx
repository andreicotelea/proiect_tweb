import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let nextId = 0;

const COLORS: Record<ToastType, string> = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#6366f1',
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 20px', borderRadius: 10,
      background: COLORS[toast.type], color: 'white',
      fontSize: 14, fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer', fontSize: 16, padding: 0,
      }}>✕</button>
    </div>
  );
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useMemo(() => ({
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    warning: (message: string) => addToast(message, 'warning'),
    info: (message: string) => addToast(message, 'info'),
  }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10,
        width: '100%', maxWidth: 400, padding: '0 16px',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
};
