import { TrendingUp, type LucideIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number;
  color?: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, label, value, trend, color, delay = 1 }: StatCardProps) {
  const { colors } = useTheme();
  const c = color || colors.blue;

  return (
    <div className={`animate-in delay-${delay}`} style={{
      background: colors.bgCard, borderRadius: 14, padding: 22,
      border: `1px solid ${colors.border}`,
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.3s, transform 0.3s',
    }}>
      <div style={{
        position: 'absolute', top: -18, right: -18, width: 72, height: 72,
        borderRadius: '50%', background: `${c}08`,
      }} />
      <div style={{
        width: 42, height: 42, borderRadius: 11,
        background: `${c}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon size={20} color={c} />
      </div>
      <div style={{ fontSize: 12.5, color: colors.textMuted, marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-1px' }}>{value}</div>
      {trend !== undefined && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, marginTop: 7,
          fontSize: 11.5, color: trend > 0 ? colors.success : colors.danger,
        }}>
          <TrendingUp size={13} style={{ transform: trend < 0 ? 'rotate(180deg)' : 'none' }} />
          {Math.abs(trend)}% față de luna trecută
        </div>
      )}
    </div>
  );
}
