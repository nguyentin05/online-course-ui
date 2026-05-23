import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, LogOut, Sun, Moon } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import useDebounce from '../../hooks/useDebounce';
import mockCourses from '../../mock/data.mock.courses.json';
import useUser from '../../hooks/useUser';
import useTheme from '../../hooks/useTheme';

const Header = () => {
  const { user, logout } = useUser();
  const [kw, setKw] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const debounce = useDebounce(kw);
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const wrapperRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!debounce.trim()) {
      setSuggestions([]);
      return;
  }

  const results = mockCourses
      .filter(c => c.subject.toLowerCase().includes(debounce.toLowerCase()))
      .slice(0, 5);
    setSuggestions(results);
  }, [debounce]);

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
    setShowDrop(false);
    navigate(`/search?q=${kw.trim()}`);
  };

  const handleSelect = (courseId) => {
    setShowDrop(false);
    navigate(`/courses/${courseId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8">
          
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-brand w-8 h-8 rounded-lg flex items-center justify-center text-white"><BookOpen size={18} /></div>
            <span className="text-xl font-bold tracking-tight text-gray-900">EduFlow</span>
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

              {showDrop && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <button onMouseDown={handleSearchClick}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100">
                    <Search size={14} className="text-brand flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      Tìm kiếm “{kw.trim()}”
                    </span>
                  </button>
                  {suggestions.map(course => (
                    <button key={course.id} onClick={() => handleSelect(course.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                      <Search size={14} className="text-brand flex-shrink-0" />
                      <span className="text-sm text-gray-700 line-clamp-1">{course.subject}</span>
                    </button>
                  ))}
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
                <div className="hidden lg:flex items-center gap-4 mr-4 border-r border-gray-200 pr-4">
                  {user.role === 'INSTRUCTOR' ? (
                    <>
                      <Link to="/instructor/dashboard" className="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Bảng điều khiển</Link>
                      <Link to="/instructor/courses" className="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Khóa học của tôi</Link>
                    </>
                  ) : (
                    <Link to="/my-learning" className="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Học tập</Link>
                  )}
                </div>

                <span className="text-sm font-bold text-gray-700 hidden sm:block">{user.fullName}</span>
                <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-brand/20 bg-gray-50" />
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Đăng xuất">
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