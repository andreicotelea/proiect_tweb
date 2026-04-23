import { Clock, Star, Users, Check, Lock, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
  delay?: number;
  onClick?: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson: l, delay = 1, onClick }: LessonCardProps) {
  const { colors } = useTheme();
  const difficultyColors: Record<string, string> = {
    Beginner: colors.success,
    Intermediate: colors.blush,
    Advanced: colors.danger,
  };
  return (
    <div
      className={`animate-in delay-${delay}`}
      onClick={() => !l.locked && onClick?.(l)}
      style={{
        background: colors.bgCard, borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        cursor: l.locked ? 'default' : 'pointer',
        transition: 'all 0.3s', position: 'relative',
        opacity: l.locked ? 0.55 : 1,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 130,
        background: `linear-gradient(135deg, ${colors.bgElevated}, ${colors.bgHover})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44, position: 'relative',
      }}>
        {l.locked ? <Lock size={30} color={colors.textDim} /> : l.thumbnail}

        {l.progress > 0 && !l.locked && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: colors.bgElevated }}>
            <div style={{
              height: '100%', width: `${l.progress}%`,
              background: l.progress === 100
                ? `linear-gradient(90deg, ${colors.success}, #8ED4B8)`
                : `linear-gradient(90deg, ${colors.blue}, ${colors.blueSoft})`,
              borderRadius: 2,
            }} />
          </div>
        )}

        {l.progress === 100 && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: colors.success, borderRadius: 7,
            padding: '3px 9px', fontSize: 10.5, fontWeight: 600,
            color: colors.bgPrimary, display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <Check size={11} /> Completat
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
          <span style={{
            padding: '2px 9px', borderRadius: 5, fontSize: 10.5, fontWeight: 600,
            background: `${difficultyColors[l.difficulty]}18`,
            color: difficultyColors[l.difficulty],
          }}>{l.difficulty}</span>
          <span style={{
            padding: '2px 9px', borderRadius: 5, fontSize: 10.5,
            background: `${colors.steel}15`, color: colors.steel,
          }}>{l.category}</span>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 7, lineHeight: 1.3 }}>
          {l.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 11.5, color: colors.textMuted }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Clock size={12} /> {l.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Star size={12} color={colors.blush} fill={colors.blush} /> {l.rating}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Users size={12} /> {l.students}
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}`,
        }}>
          <span style={{ fontSize: 11.5, color: colors.textMuted }}>{l.profesor}</span>
          {!l.locked && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11.5, fontWeight: 600, color: colors.blue }}>
              {l.progress > 0 && l.progress < 100 ? 'Continuă' : l.progress === 100 ? 'Revezi' : 'Începe'}
              <ArrowRight size={13} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
