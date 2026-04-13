import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TaskForm from '../components/tasks/TaskForm';
import { useTaskContext } from '../context/TaskContext';
import type { TaskFormData } from '../types';

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTaskContext();

  const handleSubmit = (data: TaskFormData): void => {
    addTask(data);
    navigate('/');
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Create New Task</h2>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </Container>
  );
}
