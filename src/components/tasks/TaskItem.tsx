import { Link } from 'react-router-dom';
import { Card, Badge, Button, Stack } from 'react-bootstrap';
import type { Task, TaskPriority, TaskStatus } from '../../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

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

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Stack direction="horizontal" gap={2} className="mb-2">
          <Card.Title className="mb-0 me-auto">{task.title}</Card.Title>
          <Badge bg={PRIORITY_VARIANT[task.priority]}>{task.priority}</Badge>
          <Badge bg={STATUS_VARIANT[task.status]}>{STATUS_LABEL[task.status]}</Badge>
        </Stack>

        <Card.Text className="text-muted mb-2">
          {task.description.length > 100
            ? `${task.description.slice(0, 100)}...`
            : task.description}
        </Card.Text>

        <small className="text-muted d-block mb-3">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </small>

        <Stack direction="horizontal" gap={2}>
          <Link to={`/tasks/${task.id}`}>
            <Button variant="outline-primary" size="sm">View</Button>
          </Link>
          <Link to={`/tasks/${task.id}/edit`}>
            <Button variant="outline-secondary" size="sm">Edit</Button>
          </Link>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
