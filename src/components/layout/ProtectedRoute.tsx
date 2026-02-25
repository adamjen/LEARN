import { Navigate, useLocation } from 'react-router-dom';
import { useGameStore, GameState } from '../../store/gameStore';

/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require the game to be in a specific state.
 * Currently redirects to home if game is not started.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if protected
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { gameState } = useGameStore();

  // Redirect to home if game is not started
  if (gameState === GameState.NOT_STARTED) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;