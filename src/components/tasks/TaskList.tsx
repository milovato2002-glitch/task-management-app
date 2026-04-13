import { useState } from 'react';
import { Alert, Spinner, Container, Form, Row, Col } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { useTaskContext } from '../../context/TaskContext';
import type { TaskStatus, TaskPriority } from '../../types';

type FilterStatus = TaskStatus | 'all';
type FilterPriority = TaskPriority | 'all';

export default function TaskList() {
  const { tasks, loading, error, deleteTask } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>('all');

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Row className="mb-4">
        <Col xs={12} sm={6}>
          <Form.Group controlId="statusFilter">
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="priorityFilter">
            <Form.Label>Filter by Priority</Form.Label>
            <Form.Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as FilterPriority)}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredTasks.length === 0 ? (
        <Alert variant="info">No tasks found. Create one to get started!</Alert>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask} />
        ))
      )}
    </>
  );
}
