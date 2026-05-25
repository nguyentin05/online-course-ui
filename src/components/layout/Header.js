import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, LogOut, Sun, Moon } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import useDebounce from '../../hooks/useDebounce';
import useTheme from '../../hooks/useTheme';
import useUserStore from '../../store/useUserStore';
import useCourses from '../../hooks/useCourses';

const Header = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const [kw, setKw] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  
  const debounce = useDebounce(kw, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const wrapperRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { courses: suggestions, isLoading } = useCourses({ 
    keyword: debounce, 
    size: 5 
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && kw.trim()) {
      setShowDrop(false);
      navigate(`/search?q=${kw.trim()}`);
    }
  };

  const handleSearchClick = () => {
    if (kw.trim()) {
      setShowDrop(false);
      navigate(`/search?q=${kw.trim()}`);
    }
  };

  const handleSelect = (courseId) => {
    setShowDrop(false);
    navigate(`/course/${courseId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8">
          
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-brand w-8 h-8 rounded-lg flex items-center justify-center text-white"><BookOpen size={18} /></div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">EduFlow</span>
          </Link>

          {!isSearchPage && (
            <div ref={wrapperRef} className="hidden md:block flex-1 max-w-2xl relative">
              <Input
                variant="search"
                icon={<Search size={18} />}
                placeholder="Tìm kiếm khóa học..."
                value={kw}
                onChange={(e) => {
                  setKw(e.target.value);
                  setShowDrop(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => kw && setShowDrop(true)}
              />

              {showDrop && kw.trim() && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  <button onMouseDown={handleSearchClick}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700">
                    <Search size={14} className="text-brand flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Tìm kiếm tất cả kết quả cho “{kw.trim()}”
                    </span>
                  </button>
                  
                  {isLoading && debounce === kw && (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      Đang tìm kiếm...
                    </div>
                  )}

                  {/* Render kết quả thật */}
                  {!isLoading && suggestions?.length > 0 && suggestions.map(course => (
                    <button key={course.id} onMouseDown={() => handleSelect(course.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                      <Search size={14} className="text-brand flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                        {course.subject}
                      </span>
                    </button>
                  ))}

                  {/* Trạng thái Empty */}
                  {!isLoading && suggestions?.length === 0 && debounce && (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      Không tìm thấy khóa học nào phù hợp.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 flex-shrink-0">
            {user === null ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Tham gia miễn phí</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-4 mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
                  {user.role === 'INSTRUCTOR' ? (
                    <>
                      <Link to="/instructor/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand transition-colors">Bảng điều khiển</Link>
                      <Link to="/instructor/courses" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand transition-colors">Khóa học của tôi</Link>
                    </>
                  ) : (
                    <Link to="/my-learning" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand transition-colors">Học tập</Link>
                  )}
                </div>

                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block">{user.username}</span>
                <img src={user.avatar || '/images/default-avatar.jpg'} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-brand/20 object-cover" />
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="Đăng xuất">
                  <LogOut size={18} />
                </button>
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-gray-600" />
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;