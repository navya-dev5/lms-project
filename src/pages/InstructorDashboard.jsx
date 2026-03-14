import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({title: '', category: '', price: ''});

  const addCourse = () => {
    const course = { 
      id: Date.now(), 
      ...newCourse, 
      instructorId: 2, // logged instructor
      lessons: 0,
      duration: '0h',
      enrolled: 0,
      image: 'https://images.unsplash.com/photo-1551288049-4b9937a6a4ca?w=400'
    };
    setCourses([course, ...courses]);
    fetch('http://localhost:3001/courses', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(course)
    });
    setNewCourse({title: '', category: '', price: ''});
  };

  return (
    <div className="container py-12 lg:py-20">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-12">Instructor Dashboard</h1>
      
      <div className="card p-8 mb-12 lg:mb-20">
        <h2 className="text-3xl font-bold mb-8">Create New Course</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            className="form-input text-lg py-4"
          />
          <input
            type="text"
            placeholder="Category"
            value={newCourse.category}
            onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
            className="form-input text-lg py-4"
          />
          <input
            type="text"
            placeholder="$Price"
            value={newCourse.price}
            onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
            className="form-input text-lg py-4"
          />
          <button className="btn btn-primary h-fit py-12 text-lg" onClick={addCourse}>
            Create Course
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Your Courses ({courses.length})</h2>
      <div className="grid">
        {courses.map(course => (
          <div key={course.id} className="card p-8 group hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
            <div className="flex items-center justify-between text-lg mb-4">
              <span className="text-emerald-600 font-bold">${course.price}</span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-medium">
                {course.category}
              </span>
            </div>
            <p className="text-xl font-semibold text-gray-600">{course.enrolled} students</p>
          </div>
        ))}
      </div>
    </div>
  );
}
