import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ScamDetector from './pages/ScamDetector';
import Assistant from './pages/Assistant';
import OCRScanner from './pages/OCRScanner';
import LandingPage from './pages/LandingPage';

export default function App() {
  // Simple check to show landing page or dashboard
  // In a real app, this would be based on auth state
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<LandingPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/scanner" element={<OCRScanner />} />
                <Route path="/detector" element={<ScamDetector />} />
                <Route path="/chat" element={<Assistant />} />
                {/* Fallback for other routes */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
