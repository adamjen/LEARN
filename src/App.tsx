import { Routes, Route } from 'react-router-dom';

/**
 * Main Application Component for Tone Navigator
 * 
 * This component sets up the routing structure for the ARC, Tone Scale &
 * Emotional Intelligence learning platform. It serves as the root component
 * that main.tsx renders.
 */

function App() {
  return (
    <Routes>
      {/* Home route - main landing page */}
      <Route path="/" element={<Home />} />
      
      {/* Placeholder routes for future pages */}
      <Route path="/arc" element={<Section title="ARC Triangle" />} />
      <Route path="/tone-scale" element={<Section title="Tone Scale" />} />
      <Route path="/emotional-intelligence" element={<Section title="Emotional Intelligence" />} />
      
      {/* 404 route for unknown paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Home Component - Main landing page
 * Displays the welcome message and navigation to different sections
 */
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Tone Navigator
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          ARC, Tone Scale & Emotional Intelligence Learning Platform
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <a
            href="/arc"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">ARC Triangle</h2>
            <p className="text-gray-600">
              Learn about Appreciation, Reality, and Communication
            </p>
          </a>
          
          <a
            href="/tone-scale"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-center"
          >
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Tone Scale</h2>
            <p className="text-gray-600">
              Explore the emotional gradient scale from -40 to +40
            </p>
          </a>
          
          <a
            href="/emotional-intelligence"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-center"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Emotional Intelligence</h2>
            <p className="text-gray-600">
              Discover multiple EQ frameworks and models
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Section Component - Generic page wrapper
 * Used for placeholder sections that will be filled in later
 */
function Section({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h1>
        <p className="text-center text-gray-600">
          This section is under development. Content will be added soon.
        </p>
      </div>
    </div>
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