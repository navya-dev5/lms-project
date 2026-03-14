import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import CourseCard from '../components/CourseCard';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users').then(res => res.json()).then(setUsers);
    fetch('http://localhost:3001/courses').then(res => res.json()).then(setCourses);
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {method: 'DELETE'});
    setUsers(users.filter(u => u.id !== id));
  };

  const deleteCourse = (id) => {
    fetch(`http://localhost:3001/courses/${id}`, {method: 'DELETE'});
    setCourses(courses.filter(c => c.id !== id));
  };

  if (users.length === 0) return <LoadingSpinner />;

  return (
    <div className="container py-12 lg:py-20">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12">Admin Panel</h1>
      
      <div className="mb-12 lg:mb-20">
        <h2 className="text-3xl font-bold mb-8">Users ({users.length})</h2>
        <div className="grid gap-4">
          {users.map(user => (
            <div key={user.id} className="card flex justify-between items-center p-6">
              <div className="font-semibold text-lg">
                {user.name} - {user.email} 
                <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {user.role}
                </span>
              </div>
              <button className="btn btn-danger px-6 py-2 h-fit" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8">Courses ({courses.length})</h2>
        <div className="grid">
          {courses.map(course => (
            <div key={course.id} className="card relative group">
              <CourseCard course={course} />
              <button 
                className="btn btn-danger absolute -top-12 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                onClick={() => deleteCourse(course.id)}
              >
                Delete Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
