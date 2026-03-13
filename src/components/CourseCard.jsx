import { Play, Clock, Users, Star } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="card group">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={course?.image || course?.thumbnail || '/course-images/default.svg'}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/course-images/default.svg';
          }}
          alt={course?.title || 'Course'}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-lg">
          {course?.level?.toUpperCase() || 'BEGINNER'}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course?.title}
        </h3>

        <p className="text-gray-600 mb-3 line-clamp-1">{course?.instructor}</p>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Play className="w-4 h-4" />
          <span>{course?.category}</span>
          <span>•</span>
          <Clock className="w-4 h-4" />
          <span>{course?.duration || '10h 30m'}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-500">(4.8)</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            <Users className="w-4 h-4 inline mr-1" />
            {course?.enrolled || 0}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="btn btn-primary w-full">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}
