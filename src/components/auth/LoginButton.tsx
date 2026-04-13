import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) return null;

  return (
    <Button variant="outline-light" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}
