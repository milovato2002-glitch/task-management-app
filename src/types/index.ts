export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface ValidationErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}
