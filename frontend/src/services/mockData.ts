import type { Lesson, LeaderboardEntry, AdminStats, Achievement } from '@/types';

export const mockLessons: Lesson[] = [
  { id: 1, title: 'Introducere in React', category: 'Frontend', difficulty: 'Beginner', duration: '45 min', rating: 4.8, students: 1247, profesor: 'Ana Popescu', progress: 75, thumbnail: 'RE', locked: false },
  { id: 2, title: 'Node.js Fundamentals', category: 'Backend', difficulty: 'Beginner', duration: '60 min', rating: 4.6, students: 983, profesor: 'Mihai Ion', progress: 30, thumbnail: 'NJ', locked: false },
  { id: 3, title: 'PostgreSQL Advanced', category: 'Database', difficulty: 'Advanced', duration: '90 min', rating: 4.9, students: 562, profesor: 'Elena Radu', progress: 0, thumbnail: 'PG', locked: false },
  { id: 4, title: 'Docker & Kubernetes', category: 'DevOps', difficulty: 'Intermediate', duration: '120 min', rating: 4.7, students: 834, profesor: 'Dan Vlad', progress: 100, thumbnail: 'DK', locked: false },
  { id: 5, title: 'TypeScript Mastery', category: 'Frontend', difficulty: 'Intermediate', duration: '75 min', rating: 4.5, students: 1089, profesor: 'Ana Popescu', progress: 0, thumbnail: 'TS', locked: true },
  { id: 6, title: 'Clean Architecture .NET', category: 'Backend', difficulty: 'Advanced', duration: '100 min', rating: 4.9, students: 421, profesor: 'Mihai Ion', progress: 0, thumbnail: 'CA', locked: true },
  { id: 7, title: 'CSS Animations Deep Dive', category: 'Frontend', difficulty: 'Intermediate', duration: '55 min', rating: 4.3, students: 756, profesor: 'Elena Radu', progress: 50, thumbnail: 'CS', locked: false },
  { id: 8, title: 'REST API Design', category: 'Backend', difficulty: 'Beginner', duration: '40 min', rating: 4.4, students: 1320, profesor: 'Dan Vlad', progress: 0, thumbnail: 'AP', locked: false },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alexandru M.', points: 12450, lessons: 48, streak: 23, avatar: 'AM' },
  { rank: 2, name: 'Maria P.', points: 11230, lessons: 42, streak: 18, avatar: 'MP' },
  { rank: 3, name: 'Andrei C.', points: 10890, lessons: 39, streak: 31, avatar: 'AC' },
  { rank: 4, name: 'Ioana D.', points: 9750, lessons: 35, streak: 12, avatar: 'ID' },
  { rank: 5, name: 'Cristian R.', points: 8920, lessons: 33, streak: 9, avatar: 'CR' },
  { rank: 6, name: 'Elena V.', points: 8100, lessons: 30, streak: 15, avatar: 'EV' },
  { rank: 7, name: 'Dan T.', points: 7650, lessons: 28, streak: 7, avatar: 'DT' },
  { rank: 8, name: 'Laura S.', points: 7200, lessons: 25, streak: 5, avatar: 'LS' },
];

export const mockAdminStats: AdminStats = {
  totalUsers: 3421,
  activeUsers: 1287,
  totalLessons: 48,
  totalCategories: 6,
  avgRating: 4.6,
  completionRate: 67,
};

export const mockAchievements: Achievement[] = [
  { id: 1, title: 'Prima Lectie', description: 'Completeaza prima ta lectie', icon: 'PL', earned: true },
  { id: 2, title: 'Serie de 7 Zile', description: 'Invata 7 zile consecutive', icon: 'S7', earned: true },
  { id: 3, title: 'Top 10 Clasament', description: 'Intra in top 10 clasament', icon: 'T10', earned: true },
  { id: 4, title: '50 Lectii', description: 'Completeaza 50 de lectii', icon: '50L', earned: false },
  { id: 5, title: 'Expert Frontend', description: 'Completeaza toate lectiile Frontend', icon: 'EF', earned: false },
  { id: 6, title: 'Mentor', description: 'Ajuta 10 studenti prin discutii', icon: 'MT', earned: false },
];

export const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];
export const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
