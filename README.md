# 🚀 Taskify - Task Management System

A complete task management application built with **NestJS** (backend), **React** (frontend), **PostgreSQL** and **Docker**, using **Turborepo** for monorepo management and **Vite** for frontend build tooling.

## ⚠️ Disclaimer

**This project is NOT production-ready and is intended for development/testing purposes only.** It was developed as part of a technical challenge and should not be used in production environments without proper security reviews, environment configurations, and additional hardening.

## 🎯 Features

### ✅ Authentication
- **User registration** with validation
- **Login** with JWT
- **Protected routes** with authentication
- **Secure logout**

### ✅ Task Management (Complete CRUD)
- **Create** new tasks (title and description required)
- **List** all user tasks
- **Edit** task title and description
- **Mark as completed/pending**
- **Delete** tasks with confirmation
- **Filter** by status (All, Pending, Completed)

### ✅ Responsive Interface
- Modern design with **Tailwind CSS**
- Smooth animations with **Framer Motion**
- Interactive modals
- Visual feedback with toasts

## 🛠️ Technologies Used

### Backend
- **[NestJS](https://nestjs.com/)** - Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[Prisma](https://www.prisma.io/)** - PostgreSQL ORM
- **[JWT](https://jwt.io/)** - Authentication
- **[class-validator](https://github.com/typestack/class-validator)** - Data validation
- **[Swagger](https://swagger.io/)** - API documentation

### Frontend
- **[React 19](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[TanStack Query](https://tanstack.com/query/latest)** - State management
- **[React Router DOM](https://reactrouter.com/)** - Navigation
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Axios](https://axios-http.com/)** - HTTP client

### Testing
- **[Cypress](https://www.cypress.io/)** - Complete E2E tests

### Infrastructure
- **[Docker](https://www.docker.com/)** - Containerization
- **[PostgreSQL](https://www.postgresql.org/)** - Database
- **[Docker Compose](https://docs.docker.com/compose/)** - Orchestration

### Monorepo Management
- **[Turborepo](https://turbo.build/repo)** - Monorepo build system

## 🚀 How to Run the Project

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### 1. Clone the repository
```bash
git clone <repository-url>
cd taskify
```

### 2. Configure environment variables

#### Root project (for Docker Compose)
Rename `env.example` to `.env` in the root directory:
```bash
cp env.example .env
```

#### Backend
Rename `apps/backend/.env.example` to `apps/backend/.env`:
```bash
cd apps/backend
cp .env.example .env
```

#### Frontend
Rename `apps/frontend/.env.example` to `apps/frontend/.env`:
```bash
cd apps/frontend
cp .env.example .env
```

### 3. Run with Docker Compose
```bash
# Make sure you're in the project root directory
cd taskify

# Development
npm run dev:docker

# Or directly with Docker Compose
docker-compose --env-file .env up --build
```

### 4. Access the application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

## 🧪 E2E Tests

### Run all tests
```bash
# From the frontend directory
cd apps/frontend
npx cypress run

# Or from the project root
npm run cypress:open
```

### Run specific tests
```bash
# From the frontend directory
cd apps/frontend

# Authentication tests
npx cypress run --spec "cypress/e2e/login.cy.ts"
npx cypress run --spec "cypress/e2e/register.cy.ts"

# Task management tests
npx cypress run --spec "cypress/e2e/tasks.cy.ts"
```

### Open Cypress in interactive mode
```bash
# From the frontend directory
cd apps/frontend
npx cypress open

# Or from the project root
npm run cypress:open
```

## 📋 Test Scenarios Covered

### ✅ Authentication
- [x] User registration success
- [x] Login with valid credentials
- [x] Logout with confirmation
- [x] Authentication state verification

### ✅ Task Management
- [x] Task creation (title and description required)
- [x] Form validation (required fields)
- [x] Mark task as completed
- [x] Mark task as pending
- [x] Edit existing tasks
- [x] Delete tasks with confirmation
- [x] Filter by status (All, Pending, Completed)
- [x] Empty state when no tasks exist

### ✅ Edge Cases
- [x] Special characters in titles and descriptions
- [x] Long texts
- [x] Cancel creation/editing
- [x] Form validations

## 🏗️ Project Structure

```
taskify/
├── apps/
│   ├── backend/                 # NestJS API
│   │   ├── src/
│   │   │   ├── auth/           # Authentication
│   │   │   ├── tasks/          # Task CRUD
│   │   │   ├── users/          # User management
│   │   │   └── common/         # Shared utilities
│   │   └── prisma/             # Schema and migrations
│   └── frontend/               # React application
│       ├── src/
│       │   ├── components/     # Reusable components
│       │   ├── pages/          # Application pages
│       │   ├── hooks/          # Custom hooks
│       │   ├── context/        # Authentication context
│       │   └── api/            # HTTP client
│       └── cypress/            # E2E tests
├── packages/                   # Shared packages
└── docker-compose.yml         # Docker orchestration
```

## 🔧 Local Development

### Backend
```bash
cd apps/backend
npm install
npm run start:dev
```

### Frontend
```bash
cd apps/frontend
npm install
npm run dev
```

### Database
```bash
cd apps/backend
npx prisma migrate dev
npx prisma generate
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login

### Tasks (Authenticated)
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Users (Authenticated)
- `GET /users/me` - Get user data
- `PATCH /users/me` - Update user data
- `DELETE /users/me` - Delete account

## 🎨 Interface

- **Responsive design** that works on desktop and mobile
- **Smooth animations** for better user experience
- **Visual feedback** with toasts for all actions
- **Interactive modals** for confirmations
- **Intuitive filters** for task organization

## 🔒 Security

- **JWT authentication** with expiration
- **Route protection** on frontend and backend
- **Data validation** on all inputs
- **Access policies** for resources
- **Password hashing** with bcrypt

## 📊 Test Status

- **✅ 18 E2E tests** running successfully
- **✅ Complete coverage** of main flows
- **✅ Validation tests** implemented
- **✅ Edge case tests** included

## 📝 License

This project was developed as part of a technical challenge.

---

**Built with ❤️ using NestJS, React, Vite, TypeScript, Docker and Turborepo**
