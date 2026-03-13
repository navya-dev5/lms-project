import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, GraduationCap, Users, Play } from 'lucide-react';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchCourses().then((data) => {
      if (!cancelled) {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const categories = [...new Set(courses.map((c) => c.category).filter(Boolean))];
  const levels = [...new Set(courses.map((c) => c.level).filter(Boolean))];

  const filtered = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || c.category === categoryFilter;
    const matchLevel = !levelFilter || c.level === levelFilter;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title leading-tight">
              Learn New Skills with 
              <span className="block">World-Class Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 100K+ learners and accelerate your career with courses designed by 
              industry experts. Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <a href="#courses" className="btn btn-primary text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Browse Courses
              </a>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span>100K+ Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                  <span>500+ Courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container -mt-12 lg:mt-0 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between mb-12">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search 500+ courses by title, instructor, or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input pl-12 pr-4 py-4 text-lg"
                />
              </div>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <div className="flex gap-2 bg-gray-100/60 p-2 rounded-2xl">
                <Filter className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-input py-3 bg-transparent border-0 shadow-none hover:shadow-md text-sm font-medium"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="form-input py-3 text-sm font-medium bg-transparent border-0 shadow-none hover:shadow-md"
              >
                <option value="">All Levels</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <div className="card max-w-lg mx-auto p-12">
                <Filter className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No courses found</h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">Try adjusting your search or filter criteria to discover amazing courses.</p>
                <button 
                  onClick={() => {setSearch(''); setCategoryFilter(''); setLevelFilter('');}}
                  className="btn btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div id="courses">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xl font-semibold text-gray-900">
                  Showing {filtered.length} of {courses.length} courses
                </span>
              </div>
              
              <div className="grid">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

