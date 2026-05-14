import { createBrowserRouter } from 'react-router-dom';
import AppProvider from '../layouts/AppProvider';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES, ROUTE_SEGMENTS } from './paths';

import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import LessonsPage from '../pages/LessonsPage';
import LessonDetailPage from '../pages/LessonDetailPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import NotificationsPage from '../pages/NotificationsPage';
import CertificatesPage from '../pages/CertificatesPage';
import AdminPage from '../pages/AdminPage';
import HealthCheckPage from '../pages/HealthCheckPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ErrorPage from '../pages/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <AppProvider />,
    children: [
      {
        path: ROUTES.HOME,
        element: <LandingPage />,
      },
      {
        element: <MainLayout />,
        children: [
          { path: ROUTE_SEGMENTS.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTE_SEGMENTS.LESSONS, element: <LessonsPage /> },
          { path: ROUTE_SEGMENTS.LESSON_DETAIL, element: <LessonDetailPage /> },
          { path: ROUTE_SEGMENTS.LEADERBOARD, element: <LeaderboardPage /> },
          {
            element: <ProtectedRoute requiredRole="Student" />,
            children: [
              { path: ROUTE_SEGMENTS.PROFILE, element: <ProfilePage /> },
              { path: ROUTE_SEGMENTS.SETTINGS, element: <SettingsPage /> },
              { path: ROUTE_SEGMENTS.NOTIFICATIONS, element: <NotificationsPage /> },
              { path: ROUTE_SEGMENTS.CERTIFICATES, element: <CertificatesPage /> },
            ],
          },
          {
            element: <ProtectedRoute requiredRole="Admin" />,
            children: [
              { path: ROUTE_SEGMENTS.ADMIN, element: <AdminPage /> },
              { path: ROUTE_SEGMENTS.HEALTH, element: <HealthCheckPage /> },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
        ],
      },
      { path: ROUTES.ERROR, element: <ErrorPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
