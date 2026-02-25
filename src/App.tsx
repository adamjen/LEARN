import { Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore, GameState } from './store/gameStore';
import Home from './pages/Home';
import Game from './pages/Game';
import Learn from './pages/Learn';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

/**
 * Main Application Component for Tone Navigator
 *
 * This component sets up the routing structure for the ARC, Tone Scale &
 * Emotional Intelligence learning platform. It serves as the root component
 * that main.tsx renders.
 *
 * Note: BrowserRouter is provided by main.tsx to avoid nested router errors.
 */
function App() {
  const { gameState } = useGameStore();

  return (
    <MainLayout>
      <Routes>
        {/* Home route - main landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Learn route - reference library */}
        <Route path="/learn" element={<Learn />} />
        
        {/* Progress route - player statistics */}
        <Route path="/progress" element={<Progress />} />
        
        {/* Settings route - game preferences */}
        <Route path="/settings" element={<Settings />} />
        
        {/* Protected game route */}
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect game to home if not started */}
        {gameState === GameState.NOT_STARTED && (
          <Route path="/game" element={<Navigate to="/" replace />} />
        )}
        
        {/* 404 route for unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

/**
 * NotFound Component - 404 error page
 * Displays when a route is not found
 */
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default App;