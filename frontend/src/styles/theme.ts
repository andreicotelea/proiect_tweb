const base = {
  blush:      '#D4B5A0',
  navy:       '#1E2D3A',
  blue:       '#2E7AB8',
  steel:      '#7FA3B8',
  blueGlow:   'rgba(46, 122, 184, 0.15)',
  blueSoft:   '#4A90C8',
  blueDark:   '#1D5F94',
  blushSoft:  '#E8D5C6',
  blushDim:   '#A0866A',
  steelDim:   '#5C7E90',
  success:    '#6DBFA0',
  danger:     '#C87070',
  warning:    '#D4B5A0',
} as const;

export const darkColors = {
  ...base,
  bgPrimary:   '#141F28',
  bgCard:      '#1E2D3A',
  bgElevated:  '#263846',
  bgHover:     '#2F4454',
  textPrimary: '#E8E2DC',
  textMuted:   '#7FA3B8',
  textDim:     '#5C7E90',
  border:      '#2F4454',
  borderLight: '#3A5264',
} as const;

export const lightColors = {
  ...base,
  bgPrimary:   '#F0F5FA',
  bgCard:      '#FFFFFF',
  bgElevated:  '#E4EDF5',
  bgHover:     '#D5E5F0',
  textPrimary: '#1A2D3E',
  textMuted:   '#4A6A80',
  textDim:     '#6A8FA5',
  border:      '#C0D5E5',
  borderLight: '#D5E5F0',
} as const;

export const colors = darkColors;

export type ColorPalette = typeof darkColors;

export const fonts = {
  sans: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
} as const;

export const radii = {
  sm: '5px',
  md: '9px',
  lg: '14px',
  xl: '18px',
} as const;
