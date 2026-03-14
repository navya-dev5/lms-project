import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEnrollment } from '../context/EnrollmentContext';

export default function MyCourses() {
  const { user } = useAuth();
  const { enrollments } = useEnrollment();

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  const myCourses = enrollments.filter(e => e.userId === user?.id);

  if (myCourses.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="card max-w-md mx-auto p-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl font-bold mb-4">No enrolled courses</h2>
          <p className="text-xl text-gray-600 mb-8">Get started by browsing courses and enrolling in your first one.</p>
          <Link to="/" className="btn btn-primary text-lg px-8 py-4">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 lg:py-20">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-12">My Courses</h1>
      <div className="grid">
        {myCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
