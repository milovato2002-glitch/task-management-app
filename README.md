# Task Management App

A React TypeScript task management application built with Vite, featuring Auth0 authentication, React Router navigation, and React Bootstrap styling.

## Features

- Full CRUD operations for tasks (create, read, update, delete)
- Auth0 authentication with login/logout and protected routes
- Task Dashboard with filtering by status and priority
- Task detail view, creation form, and edit form
- Form validation with TypeScript types
- Context API for global state management
- Responsive design with React Bootstrap

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for client-side routing
- **Auth0** for authentication
- **React Bootstrap** for UI components
- **Axios** for HTTP requests (ready for backend integration)

## Prerequisites

- Node.js 18+
- npm 9+
- An Auth0 account

## Auth0 Configuration

1. Go to [Auth0 Dashboard](https://manage.auth0.com/) and create a new **Single Page Application**.
2. In your application settings, configure:
   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`
3. Copy your **Domain** and **Client ID** from the application settings.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/milovato2002-glitch/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Auth0 credentials:

   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  types/           - TypeScript interfaces and types
  context/         - React Context for global state
  components/
    auth/          - Auth0 login, logout, protected route
    tasks/         - TaskForm, TaskList, TaskItem components
  pages/           - Dashboard, TaskDetails, CreateTask, EditTask
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
