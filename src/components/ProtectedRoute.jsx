import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false, requireInstructor = false }) {
  const { isAuthenticated, loading, isAdmin, isInstructor } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/my-courses" replace />;
  }

  if (requireInstructor && !isInstructor) {
    return <Navigate to="/my-courses" replace />;
  }

  return children;
}
