import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const fetchCourses = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/courses`);
    return data;
  } catch (error) {
    console.error('API Error - using fallback. Run: npx json-server --watch db.json --port 3001', error.message);
    return getFallbackCourses();
  }
};

export const fetchCourseById = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE}/courses/${id}`);
    return data;
  } catch {
    const courses = getFallbackCourses();
    return courses.find((c) => c.id === parseInt(id)) || null;
  }
};

const getFallbackCourses = () => {
  return [
    {
      id: 1,
      title: 'Java Programming: Core + OOP',
      description: 'Build a strong Java foundation: syntax, OOP, collections, and problem-solving with real exercises.',
      instructor: 'Navya',
      duration: '16h 20m',
      image: '/course-images/java.svg',
      category: 'Java',
      level: 'Beginner',
      enrolled: 1840,
      price: 79,
      lessons: 38
    },
    {
      id: 2,
      title: 'Python for Beginners: From Zero to Confident',
      description: 'Learn Python basics, functions, lists, dictionaries, and file handling with mini-projects.',
      instructor: 'Navya',
      duration: '14h 10m',
      image: '/course-images/python.svg',
      category: 'Python',
      level: 'Beginner',
      enrolled: 3125,
      price: 69,
      lessons: 34
    },
    {
      id: 3,
      title: 'JavaScript ES6+: The Modern Guide',
      description: 'ES6+, async/await, DOM, modules, and patterns used in real-world JavaScript development.',
      instructor: 'Navya',
      duration: '15h 55m',
      image: '/course-images/javascript.svg',
      category: 'JavaScript',
      level: 'Beginner',
      enrolled: 4020,
      price: 59,
      lessons: 36
    },
    {
      id: 4,
      title: 'TypeScript Essentials for Frontend Developers',
      description: 'Types, interfaces, generics, and practical patterns to ship safer JavaScript codebases.',
      instructor: 'Navya',
      duration: '11h 30m',
      image: '/course-images/typescript.svg',
      category: 'TypeScript',
      level: 'Intermediate',
      enrolled: 1560,
      price: 69,
      lessons: 24
    },
    {
      id: 5,
      title: 'SQL for Developers: Queries and Joins',
      description: 'Write SQL confidently: SELECT, WHERE, GROUP BY, JOINs, and common query patterns.',
      instructor: 'Navya',
      duration: '9h 15m',
      image: '/course-images/sql.svg',
      category: 'SQL',
      level: 'Beginner',
      enrolled: 2210,
      price: 49,
      lessons: 22
    },
    {
      id: 6,
      title: 'HTML + CSS: Responsive Websites',
      description: 'Create clean pages with HTML and modern CSS. Flexbox, Grid, and responsive patterns included.',
      instructor: 'Navya',
      duration: '10h 40m',
      image: '/course-images/htmlcss.svg',
      category: 'HTML/CSS',
      level: 'Beginner',
      enrolled: 3890,
      price: 39,
      lessons: 26
    }
  ];
};
