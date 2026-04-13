import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Badge, Button, Stack, Alert } from 'react-bootstrap';
import { useTaskContext } from '../context/TaskContext';
import type { TaskPriority, TaskStatus } from '../types';

const PRIORITY_VARIANT: Record<TaskPriority, string> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

const STATUS_VARIANT: Record<TaskStatus, string> = {
  todo: 'secondary',
  'in-progress': 'primary',
  done: 'success',
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, deleteTask } = useTaskContext();

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

  const handleDelete = (): void => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <Container>
      <Card className="shadow-sm">
        <Card.Body>
          <Stack direction="horizontal" gap={2} className="mb-3">
            <h2 className="mb-0 me-auto">{task.title}</h2>
            <Badge bg={PRIORITY_VARIANT[task.priority]}>{task.priority}</Badge>
            <Badge bg={STATUS_VARIANT[task.status]}>{STATUS_LABEL[task.status]}</Badge>
          </Stack>

          <Card.Text>{task.description}</Card.Text>

          <hr />

          <p className="mb-1">
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="mb-4">
            <strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
          </p>

          <Stack direction="horizontal" gap={2}>
            <Link to="/">
              <Button variant="secondary">Back</Button>
            </Link>
            <Link to={`/tasks/${task.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
