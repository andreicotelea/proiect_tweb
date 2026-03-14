import type { User } from '@/types';

interface TestAccount {
  email: string;
  password: string;
  user: User;
}

export const TEST_ACCOUNTS: TestAccount[] = [
  {
    email: 'user@learnflow.ro',
    password: 'user',
    user: {
      id: 1,
      name: 'Student Demo',
      email: 'user@learnflow.ro',
      role: 'student',
      avatar: '🧑‍💻',
      createdAt: '2025-01-15',
      streak: 7,
      totalPoints: 2840,
    },
  },
  {
    email: 'admin@learnflow.ro',
    password: 'admin',
    user: {
      id: 2,
      name: 'Admin Demo',
      email: 'admin@learnflow.ro',
      role: 'admin',
      avatar: '🛡️',
      createdAt: '2024-06-01',
      streak: 42,
      totalPoints: 15000,
    },
  },
];

export function findTestAccount(email: string, password: string): User | null {
  const match = TEST_ACCOUNTS.find(
    a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
  return match?.user ?? null;
}
