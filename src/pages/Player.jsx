import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressBar from '../components/ProgressBar';

export default function Player() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, _setProgress] = useState(0);

  useEffect(() => {
    // Mock course data
    setTimeout(() => {
      setCourse({title: 'Course Title', lessons: 20, duration: '10h 30m'});
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <Link to={`/course/${id}`} className="btn btn-secondary" style={{marginBottom: '2rem'}}>
        ← Back to Course
      </Link>
      <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 300px'}}>
        <div>
          <div style={{position: 'relative', width: '100%', height: '400px', background: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Play size={80} style={{color: '#007bff'}} />
            <p style={{position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)'}}>Play Lesson</p>
          </div>
          <ProgressBar value={progress} />
        </div>
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Course Info</h3>
          <p>{course.duration}</p>
          <p>{course.lessons} lessons</p>
        </div>
      </div>
    </div>
  );
}
