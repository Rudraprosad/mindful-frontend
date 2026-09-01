import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PhaseSelection from './pages/PhaseSelection';
import Assessment from './pages/Assessment';
import LearningPlan from './pages/LearningPlan';
import AnxietyDashboard from './pages/AnxietyDashboard';
import OcdDashboard from './pages/OcdDashboard';
import DepressionDashboard from './pages/DepressionDashboard';
import BipolarDashboard from './pages/BipolarDashboard';
import PsychosisDashboard from './pages/PsychosisDashboard';
import EatingDisordersDashboard from './pages/EatingDisordersDashboard';
import CheckInModule from './pages/modules/anxiety/CheckInModule';
import BreathingModule from './pages/modules/anxiety/BreathingModule';
import GroundingModule from './pages/modules/anxiety/GroundingModule';
import ReframingModule from './pages/modules/anxiety/ReframingModule';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user has a valid cookie token for auto-login
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/verify', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Smart routing for persistent state
          const authPaths = ['/login', '/signup'];
          const isAuthPage = authPaths.includes(location.pathname);
          const isHomePage = location.pathname === '/';
          
          if (data.user.condition) {
            // If they have a condition and try to visit home or login/signup, redirect to dashboard
            if (isAuthPage || isHomePage) {
              navigate(`/modules/${data.user.condition.toLowerCase()}`, { replace: true });
            }
          } else {
            // If they don't have a condition but try to visit login/signup, redirect to phase selection
            if (isAuthPage) {
              navigate('/phase', { replace: true });
            }
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auto-login failed:", err);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    
    checkAuth();
  }, [navigate, location.pathname]);

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f7faf7] text-primary">Loading...</div>;
  }

  return (
    <div className={`relative min-h-screen flex flex-col ${location.pathname === '/' ? '' : 'bg-[#f7faf7] overflow-hidden'}`}>
      <div className="w-full relative z-50 px-5 md:px-8 max-w-7xl mx-auto">
        {/* Navbar */}
        <Navbar user={user} />
      </div>

      {/* Page Content */}
      <div className={`flex-1 flex flex-col ${location.pathname === '/' ? 'w-full' : 'px-8 max-w-7xl mx-auto w-full'}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/phase" element={<PhaseSelection />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/plan" element={<LearningPlan />} />
              
              {/* Condition Dashboards */}
              <Route path="/modules/anxiety" element={<AnxietyDashboard />} />
              <Route path="/modules/ocd" element={<OcdDashboard />} />
              <Route path="/modules/depression" element={<DepressionDashboard />} />
              <Route path="/modules/bipolar" element={<BipolarDashboard />} />
              <Route path="/modules/psychosis" element={<PsychosisDashboard />} />
              <Route path="/modules/eatingdisorders" element={<EatingDisordersDashboard />} />
              
              {/* Anxiety Modules */}
              <Route path="/modules/anxiety/checkin" element={<CheckInModule />} />
              <Route path="/modules/anxiety/breathing" element={<BreathingModule />} />
              <Route path="/modules/anxiety/grounding" element={<GroundingModule />} />
              <Route path="/modules/anxiety/reframing" element={<ReframingModule />} />
            </Route>
          </Routes>
        </div>
      
      {/* Universal Footer */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
