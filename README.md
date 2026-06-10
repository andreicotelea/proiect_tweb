<div align="center">

# 🎓 LearnFlow

### A modern e-learning platform for interactive courses, progress tracking, achievements & certificates

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://learn.microsoft.com/dotnet/csharp/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)

</div>

---

## 📖 About

**LearnFlow** is a full-stack e-learning platform that lets students browse a catalogue of lessons organized by category, study them section by section, track their progress, submit their work for scoring, and earn achievements and certificates along the way. A public leaderboard keeps learners motivated, while a dedicated admin panel gives staff full control over lessons, categories and users.

The project is built as a clean, layered **ASP.NET Core** REST API backed by **SQL Server** through **Entity Framework Core**, with a fast, modern **React + TypeScript + Vite** single-page front end. Authentication is handled with **JWT** tokens and a role-based authorization model (Guest → Student → Profesor → Admin).

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 🔐 **Authentication & Roles** | JWT-based login/registration with a role hierarchy (Guest, Student, Profesor, Admin) and rate-limited auth endpoints. |
| 📚 **Lesson Catalogue** | Browse lessons by category, difficulty, duration and rating; view rich lesson detail pages with ordered sections and video content. |
| 🗂️ **Categories** | Content grouped into Frontend, Backend, Database, DevOps, Mobile and AI/ML. |
| 📈 **Progress Tracking** | Per-user, per-lesson completion percentage with last-accessed and completion timestamps. |
| 📝 **Submissions & Scoring** | Submit completed lessons and receive a score against a maximum, stored per user. |
| 🏆 **Achievements** | Unlock badges based on conditions such as lessons completed, streaks, leaderboard rank, category mastery and perfect scores. |
| 🎖️ **Certificates** | Earn category certificates after meeting the required number of lessons. |
| 🥇 **Leaderboard** | Public ranking of students based on their performance. |
| 🔔 **Notifications** | Per-user and broadcast notifications with typed styling (info, success, warning, error, achievement). |
| 👤 **Profile & Settings** | Manage personal profile, avatar and account settings. |
| 🛠️ **Admin Panel** | Full CRUD over lessons, categories and users, plus platform statistics. |
| ❤️ **Health Check** | Live API health page with response time, environment and endpoint overview, plus Swagger/OpenAPI docs. |

---

## 🧰 Tech Stack

### Backend

| Technology | Purpose |
| :--- | :--- |
| **.NET 8 / ASP.NET Core** | REST API host & controllers |
| **C#** | Primary backend language |
| **Entity Framework Core** | ORM & migrations |
| **SQL Server** | Relational database (`LearnFlowDB`) |
| **JWT** | Authentication & authorization |
| **Swagger / OpenAPI** | Interactive API documentation |

### Frontend

| Technology | Purpose |
| :--- | :--- |
| **React 18.3** | UI library |
| **TypeScript 5.5** | Type-safe development |
| **Vite 5.3** | Build tool & dev server |
| **React Router 6.26** | Client-side routing |
| **Axios** | HTTP client |
| **lucide-react** | Icon set |

### Architecture (Solution Layers)

| Layer | Responsibility |
| :--- | :--- |
| **LearnFlow.API** | Controllers, routing, JWT auth, rate limiting, Swagger |
| **LearnFlow.BusinessLayer** | Business rules, DTO mapping, aggregation logic |
| **LearnFlow.DataAccessLayer** | `AppDbContext` (EF Core), relationships & seed data |
| **LearnFlow.Domain** | Entities & enums shared across all layers |

---

## 🏛️ Architecture & Data Model

LearnFlow follows a classic layered architecture. The React SPA talks to the ASP.NET Core API over REST/JSON; the API delegates to the business layer, which uses EF Core (`AppDbContext`) to read and write the SQL Server database. The domain entities are shared across every layer.

<div align="center">

![Component Diagram](./images/component.svg)

</div>

---

## 🎭 Use Case Diagram

The platform supports four roles in an inheriting hierarchy — each higher role can do everything the lower roles can, plus more.

<div align="center">

![Use Case Diagram](./images/usecase.svg)

</div>

---

## 📐 UML Diagrams

### Class Diagram — Domain Entities

Core entities and their relationships (categories own lessons, lessons own sections, users accumulate progress, submissions and achievements).

<div align="center">

![Entities Class Diagram](./images/class-entities.svg)

</div>

### Class Diagram — Application Layers

How controllers, services, the EF Core `DbContext` and the domain model depend on one another.

<div align="center">

![Layers Class Diagram](./images/class-layers.svg)

</div>

### Activity Diagram — Learning & Submission Flow

From browsing a lesson to submitting it, updating progress and unlocking achievements.

<div align="center">

![Learning Activity Diagram](./images/activity-learn.svg)

</div>

### Activity Diagram — Admin Content Management

The admin workflow for managing lessons, categories and users, gated by role.

<div align="center">

![Admin Activity Diagram](./images/activity-admin.svg)

</div>

### Sequence Diagram — Authentication (Login)

<div align="center">

![Login Sequence Diagram](./images/sequence-login.svg)

</div>

### Sequence Diagram — Lesson Submission

<div align="center">

![Submission Sequence Diagram](./images/sequence-submit.svg)

</div>

---

## 🖼️ Platform Screenshots

### Landing & Authentication

| Landing Page | Login | Register |
| :---: | :---: | :---: |
| ![Home](./images/lf-home.png) | ![Login](./images/lf-login.png) | ![Register](./images/lf-register.png) |

### Learning Experience

| Dashboard | Lessons Catalogue | Lesson Detail |
| :---: | :---: | :---: |
| ![Dashboard](./images/lf-dashboard.png) | ![Lessons](./images/lf-lessons.png) | ![Lesson Detail](./images/lf-lesson-detail.png) |

### Engagement & Rewards

| Leaderboard | Certificates | Notifications |
| :---: | :---: | :---: |
| ![Leaderboard](./images/lf-leaderboard.png) | ![Certificates](./images/lf-certificates.png) | ![Notifications](./images/lf-notifications.png) |

### Account

| Profile | Settings |
| :---: | :---: |
| ![Profile](./images/lf-profile.png) | ![Settings](./images/lf-settings.png) |

### Admin Panel

| Overview | Manage Users | Manage Lessons | Manage Categories |
| :---: | :---: | :---: | :---: |
| ![Admin](./images/lf-admin.png) | ![Admin Users](./images/lf-admin-users.png) | ![Admin Lessons](./images/lf-admin-lessons.png) | ![Admin Categories](./images/lf-admin-categories.png) |

### System

| Health Check |
| :---: |
| ![Health](./images/lf-health.png) |

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+) and npm
- [SQL Server](https://www.microsoft.com/sql-server) (e.g. SQL Server Express — `localhost\SQLEXPRESS`)

### 1. Clone the repository

```bash
git clone https://github.com/andreicotelea/proiect_tweb.git
cd proiect_tweb
```

### 2. Configure the database

Update the connection string in `LearnFlow.API/appsettings.json` to point at your SQL Server instance (default database: `LearnFlowDB`), then apply migrations:

```bash
cd LearnFlow.API
dotnet ef database update
```

### 3. Run the backend

```bash
dotnet run
```

The API starts on **http://localhost:5000** and Swagger UI is available at **http://localhost:5000/swagger**.

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app is served at **http://localhost:5173**.

### Default Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin1@learnflow.md` | `admin` |
| **Student** | `ion@gmail.com` | `user123` |

> ⚠️ These are seed/development credentials — change them before deploying.

---

## 📂 Project Structure

```
proiect_tweb/
├── LearnFlow.API/             # ASP.NET Core controllers, JWT, Swagger
│   └── Controller/            # Auth, Lessons, Progress, Submission, Admin, ...
├── LearnFlow.BusinessLayer/   # Services, business rules, DTO mapping
├── LearnFlow.DataAccessLayer/ # AppDbContext (EF Core), relationships, seed data
├── LearnFlow.Domain/          # Entities & enums
│   ├── Entities/              # UserData, LessonData, CategoryData, ...
│   └── Enums/                 # UserRole, Difficulty, NotificationType, ...
└── frontend/                  # React + TypeScript + Vite SPA
    └── src/
        ├── pages/             # Landing, Dashboard, Lessons, Admin, ...
        └── router/            # Routes & protected-route logic
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT (rate-limited) |
| `POST` | `/api/auth/register` | Create a new account |
| `GET`  | `/api/auth/me/{id}` | Current user info |
| `GET`  | `/api/lessons` | List lessons |
| `GET`  | `/api/lessons/{id}` | Lesson detail with sections |
| `GET`  | `/api/categories` | List categories |
| `GET`  | `/api/leaderboard` | Student ranking |
| `GET`  | `/api/admin/stats` | Platform statistics (Admin) |
| `GET`  | `/api/health` | API health status |

---
