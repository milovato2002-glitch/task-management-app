import { Link } from 'react-router-dom';
import { Container, Button, Stack } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import TaskList from '../components/tasks/TaskList';

export default function Dashboard() {
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <Stack direction="horizontal" className="mb-4">
        <h1 className="mb-0">Task Dashboard</h1>
        {isAuthenticated && (
          <Link to="/tasks/new" className="ms-auto">
            <Button variant="primary">+ New Task</Button>
          </Link>
        )}
      </Stack>

      {isAuthenticated ? (
        <TaskList />
      ) : (
        <p className="text-muted">Please log in to view and manage your tasks.</p>
      )}
    </Container>
  );
}
