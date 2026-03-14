import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Play, Clock, Users } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchCourseById } from '../services/api';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCourseById(id).then((data) => {
      if (cancelled) return;
      setCourse(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const lessonsCount = useMemo(() => {
    if (!course) return 0;
    if (Array.isArray(course.lessons)) return course.lessons.length;
    if (typeof course.lessons === 'number') return course.lessons;
    return 0;
  }, [course]);

  if (loading) return <LoadingSpinner />;
  if (!course) return <div className="container py-16">Course not found</div>;

  return (
    <div className="container py-12 lg:py-20">
      <Link to="/" className="btn btn-secondary mb-8 inline-flex items-center gap-2">
        <span>←</span>
        Back to Courses
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">{course.description}</p>

          <div className="flex flex-wrap items-center gap-8 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Play className="w-7 h-7 text-blue-600" />
              <span className="font-semibold">{lessonsCount} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-7 h-7 text-green-600" />
              <span className="font-semibold">{course.duration || '10 hours'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-7 h-7 text-purple-600" />
              <span className="font-semibold">{course.enrolled || 0} students</span>
            </div>
          </div>

          <ProgressBar value={course.progress || 0} label="Your Progress" />
        </div>

        <div className="card sticky top-8 self-start lg:max-h-[400px] p-6">
          <h3 className="text-2xl font-bold mb-6">Get Started</h3>
          <button className="btn btn-primary w-full mb-4 text-lg py-4">Start Course</button>
          <button className="btn btn-secondary w-full">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}
