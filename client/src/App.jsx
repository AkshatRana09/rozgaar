import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SeekerDashboard from './pages/SeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to='/login' />;
  if (role && user.role !== role) return <Navigate to='/' />;
  return children;
};

function App() {
  const { getMe } = useAuthStore();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/jobs/:id' element={<JobDetail />} />
        <Route path='/dashboard/seeker' element={
          <ProtectedRoute role='seeker'>
            <SeekerDashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/recruiter' element={
          <ProtectedRoute role='recruiter'>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;