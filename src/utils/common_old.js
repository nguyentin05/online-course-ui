import { motion } from 'motion/react';
import { PlayCircle, Star, Users, Clock, BookOpen } from 'lucide-react';




export function CourseCard({ course }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-brand/5 transition-all group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900">
          {course.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-orange-400 fill-orange-400" />
          <span className="text-sm font-bold text-gray-900">{course.rating}</span>
          <span className="text-xs text-gray-400">({(course.students/1000).toFixed(1)}k+)</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand transition-colors line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 border border-white" />
          <span className="text-xs text-gray-500 font-medium">{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-[10px] font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span className="text-[10px] font-medium">{course.lessons} lessons</span>
            </div>
          </div>
          <div className="text-lg font-bold text-brand">
            ${course.price}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
