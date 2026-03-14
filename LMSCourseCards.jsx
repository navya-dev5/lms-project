import React from 'react';

const courses = [
  {
    id: 1,
    title: 'Java Programming: Core + OOP',
    description: 'Build a strong Java foundation and learn OOP with practice problems.',
    category: 'Java',
    image: '/course-images/java.svg'
  },
  {
    id: 2,
    title: 'Python for Beginners',
    description: 'Learn Python fundamentals and write clean, readable programs.',
    category: 'Python',
    image: '/course-images/python.svg'
  },
  {
    id: 3,
    title: 'C Programming Basics',
    description: 'Pointers, arrays, strings, and memory with hands-on exercises.',
    category: 'C',
    image: '/course-images/c.svg'
  },
  {
    id: 4,
    title: 'C++ OOP + STL',
    description: 'Modern C++ with classes, templates, STL containers, and algorithms.',
    category: 'C++',
    image: '/course-images/cpp.svg'
  },
  {
    id: 5,
    title: 'JavaScript ES6+ Mastery',
    description: 'Modern JS, async/await, DOM, modules, and real-world patterns.',
    category: 'JavaScript',
    image: '/course-images/javascript.svg'
  },
  {
    id: 6,
    title: 'React Essentials',
    description: 'Build dynamic UIs with components, state, hooks, and routing.',
    category: 'React',
    image: '/course-images/react.svg'
  }
];

const LMSCourseCards = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Featured Courses
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our curated selection of programming-language courses taught by industry experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/50">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/course-images/default.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {course.category}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-lg">
                    {course.description}
                  </p>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:outline-none">
                    Enroll Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LMSCourseCards;

