import { useState, useEffect, type FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import type { TaskFormData, TaskPriority, TaskStatus, ValidationErrors } from '../../types';

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  submitLabel: string;
}

const EMPTY_FORM: TaskFormData = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
};

function validate(data: TaskFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required.';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  if (!data.dueDate) {
    errors.dueDate = 'Due date is required.';
  } else if (new Date(data.dueDate) < new Date(new Date().toDateString())) {
    errors.dueDate = 'Due date cannot be in the past.';
  }

  return errors;
}

export default function TaskForm({ initialData, onSubmit, submitLabel }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialData ?? EMPTY_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Describe the task"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value={'low' satisfies TaskPriority}>Low</option>
          <option value={'medium' satisfies TaskPriority}>Medium</option>
          <option value={'high' satisfies TaskPriority}>High</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={'todo' satisfies TaskStatus}>To Do</option>
          <option value={'in-progress' satisfies TaskStatus}>In Progress</option>
          <option value={'done' satisfies TaskStatus}>Done</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          isInvalid={!!errors.dueDate}
        />
        <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
      </Form.Group>

      {Object.keys(errors).length > 0 && submitted && (
        <Alert variant="danger" className="mb-3">
          Please fix the errors above before submitting.
        </Alert>
      )}

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
