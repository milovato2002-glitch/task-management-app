import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';

export default function AppNavbar() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          Task Manager
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/tasks/new">
                New Task
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            {isAuthenticated && user && (
              <Nav.Item className="text-light me-3">
                {user.name ?? user.email}
              </Nav.Item>
            )}
            <LoginButton />
            <LogoutButton />
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
