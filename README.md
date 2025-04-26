# Nest-Frontend-Vite-React

A React + TypeScript frontend built with Vite.

## Features

- React 19 with functional components and hooks
- TypeScript strict mode
- React Router v7 for routing
- Authentication context with login, register, and protected routes
- Example pages for API endpoints: root, ask question, query, sum, answer, say name
- ESLint with recommended and React-specific rules

### Key Folders and Files

- **public/**: Static files served directly.
- **src/assets/**: Images and static assets.
- **src/components/**: Reusable UI components (e.g., Header, ProtectedRoute).
- **src/context/**: React context for authentication.
- **src/hooks/**: Custom React hooks (e.g., useAuth).
- **src/pages/**: Page components for each route.
- **src/App.tsx**: Main app component, sets up routing.
- **src/main.tsx**: Entry point, renders the app.
- **index.html**: HTML template.
- **package.json**: Project metadata and scripts.
- **vite.config.ts**: Vite configuration.
- **tsconfig**.**json**: TypeScript configuration files.

## Getting Started

### Install dependencies

```sh
npm install
```
Run in development
```sh
npm run dev
```
