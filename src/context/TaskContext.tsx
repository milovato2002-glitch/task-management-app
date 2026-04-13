import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Task, TaskFormData, TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const generateId = (): string => crypto.randomUUID();

const INITIAL_TASKS: Task[] = [
  {
    id: generateId(),
    title: 'Set up project structure',
    description: 'Initialize the React TypeScript project with Vite and install all dependencies.',
    priority: 'high',
    status: 'done',
    dueDate: '2026-04-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Implement authentication',
    description: 'Add Auth0 login/logout and protect routes that require authentication.',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-04-18',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Write unit tests',
    description: 'Add tests for task CRUD operations and form validation logic.',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-04-22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [loading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = useCallback((data: TaskFormData): void => {
    try {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: generateId(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => [...prev, newTask]);
      setError(null);
    } catch {
      setError('Failed to add task.');
    }
  }, []);

  const updateTask = useCallback((id: string, data: TaskFormData): void => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, ...data, updatedAt: new Date().toISOString() }
            : task
        )
      );
      setError(null);
    } catch {
      setError('Failed to update task.');
    }
  }, []);

  const deleteTask = useCallback((id: string): void => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch {
      setError('Failed to delete task.');
    }
  }, []);

  const getTask = useCallback(
    (id: string): Task | undefined => tasks.find((task) => task.id === id),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, addTask, updateTask, deleteTask, getTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
