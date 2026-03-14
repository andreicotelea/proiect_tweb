import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { darkColors, lightColors, type ColorPalette } from '@/styles/theme';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  colors: ColorPalette;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('lf_theme') as Theme) || 'dark';
  });

  const colors = theme === 'dark' ? darkColors : lightColors;
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next: Theme = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('lf_theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
