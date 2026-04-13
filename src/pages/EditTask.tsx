import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import TaskForm from '../components/tasks/TaskForm';
import { useTaskContext } from '../context/TaskContext';
import type { TaskFormData } from '../types';

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, updateTask } = useTaskContext();

  const task = id ? getTask(id) : undefined;

  if (!task) {
    return (
      <Container>
        <Alert variant="warning">Task not found.</Alert>
        <Link to="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Container>
    );
  }

  const initialData: TaskFormData = {
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
  };

  const handleSubmit = (data: TaskFormData): void => {
    updateTask(task.id, data);
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Edit Task</h2>
      <TaskForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </Container>
  );
}
