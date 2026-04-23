// =============================================
// USER
// =============================================
export type UserRole = 'guest' | 'student' | 'profesor' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  streak: number;
  totalPoints: number;
}

// =============================================
// LESSON
// =============================================
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  category: string;
  difficulty: Difficulty;
  duration: string;
  rating: number;
  students: number;
  profesor: string;
  progress: number;
  thumbnail: string;
  locked: boolean;
  videoUrl?: string;
  sections?: LessonSection[];
}

export interface LessonSection {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  order: number;
}

// =============================================
// CATEGORY
// =============================================
export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  lessonCount: number;
}

// =============================================
// PROGRESS
// =============================================
export interface UserProgress {
  userId: number;
  lessonId: number;
  percentComplete: number;
  completedAt?: string;
  lastAccessedAt: string;
}

// =============================================
// SUBMISSION (Quiz)
// =============================================
export interface Submission {
  id: number;
  userId: number;
  lessonId: number;
  score: number;
  maxScore: number;
  submittedAt: string;
}

// =============================================
// ACHIEVEMENT
// =============================================
export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

// =============================================
// LEADERBOARD
// =============================================
export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  lessons: number;
  streak: number;
  avatar: string;
}

// =============================================
// ADMIN STATS
// =============================================
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalLessons: number;
  totalCategories: number;
  avgRating: number;
  completionRate: number;
}

// =============================================
// AUTH
// =============================================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

// =============================================
// API RESPONSES
// =============================================
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
