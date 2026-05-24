import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { box: 'w-8 h-8 rounded-xl',  icon: 18, text: 'text-lg' },
    md: { box: 'w-10 h-10 rounded-xl', icon: 22, text: 'text-2xl' },
    lg: { box: 'w-14 h-14 rounded-2xl', icon: 28, text: 'text-4xl' },
  };

  const s = sizes[size];

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`bg-brand ${s.box} flex items-center justify-center text-white shadow-lg shadow-brand/20`}>
        <BookOpen size={s.icon} />
      </div>
      <span className={`${s.text} font-bold tracking-tight text-gray-900`}>EduFlow</span>
    </Link>
  );
};

export default Logo;