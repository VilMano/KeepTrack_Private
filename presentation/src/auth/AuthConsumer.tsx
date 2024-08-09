import { Router } from 'react-router';
import { UserContext } from './UserContext';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthConsumer({ children }: Props) {
  return (
    <UserContext.Consumer>
      {(auth) => (auth.user ? <p>Not authenticated</p> : children)}
    </UserContext.Consumer>
  );
}
