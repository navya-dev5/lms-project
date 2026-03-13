import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { EnrollmentProvider } from './context/EnrollmentContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import Player from './pages/Player';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import InstructorDashboard from './pages/InstructorDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <EnrollmentProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
            <Route path="/player/:id" element={<ProtectedRoute><Player /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
            <Route path="/instructor" element={<ProtectedRoute requireInstructor><InstructorDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </EnrollmentProvider>
    </AuthProvider>
  );
}

export default App;
