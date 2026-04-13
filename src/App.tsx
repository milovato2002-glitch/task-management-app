import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AppNavbar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

export default function App() {
  return (
    <TaskProvider>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/tasks/new"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </TaskProvider>
  );
}
