import { useState, useMemo, useEffect } from 'react';
import { Search as SearchIcon, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

import Input from '../../components/common/Input';
import CourseGrid from '../../components/course/CourseGrid';
import useCourses from '../../hooks/useCourses';
import useDebounce from '../../hooks/useDebounce';
import useCategories from '../../hooks/useCategories'
import Select from '../../components/common/select';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 20;

const Search = () => {
  const [kw, setKw] = useState('');
  const [instructor, setInstructor] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('subject');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const debouncedKeyword = useDebounce(kw, 500);
  const debouncedInstructor = useDebounce(instructor, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const { categories } = useCategories();

  const categoryOptions = [
    { value: null, label: 'Tất cả danh mục' },
    ...categories.map(c => ({ value: c.id, label: c.name }))
  ];

  const sortOptions = [
    { value: 'subject-asc',  label: 'Tên: A → Z' },
    { value: 'subject-desc', label: 'Tên: Z → A' },
    { value: 'price-asc',    label: 'Giá: Thấp → Cao' },
    { value: 'price-desc',   label: 'Giá: Cao → Thấp' },
  ];

  const { courses, totalPages, totalElements, isLoading, error } = useCourses({
    keyword: debouncedKeyword,
    instructor: debouncedInstructor,
    categoryId,
    minPrice: debouncedMinPrice || null,
    maxPrice: debouncedMaxPrice || null,
    sortBy,
    sortDir,
    page,
    size: 20,
  });

  const pageDisplay = useMemo(() => ({
    current: page + 1,
    total: totalPages,
    isFirst: page === 0,
    isLast: page === totalPages - 1,
  }), [page, totalPages]);


  const resultLabel = useMemo(() => {
    const parts = [];
    if (debouncedKeyword) parts.push(`từ khóa "${debouncedKeyword}"`);
    if (categoryId) parts.push(`danh mục đã chọn`);
    if (minPrice || maxPrice) parts.push(`giá ${minPrice || 0}$ - ${maxPrice ? maxPrice + '$' : 'không giới hạn'}`);
    return parts.length > 0 ? `theo ${parts.join(', ')}` : '';
  }, [debouncedKeyword, categoryId, minPrice, maxPrice]);


  const handleKeywordChange = (e) => {
    setKw(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error) return (
    <div className="text-center py-32 text-red-500">{error}</div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 flex gap-3">
        <div className="flex-1">
          <Input
            variant="search"
            icon={<SearchIcon size={20} />}
            placeholder="Tìm kiếm theo tên khóa học..."
            value={kw}
            onChange={handleKeywordChange}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            showFilters
              ? 'bg-brand text-white border-brand'
              : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'
          }`}
        >
          <SlidersHorizontal size={16} />
          Bộ lọc
          {(instructor || categoryId || minPrice || maxPrice) && (
            <span className="bg-white text-brand rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">
              {[instructor, categoryId, minPrice, maxPrice].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>
      {showFilters && (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-end gap-3 w-full">
            <div className="flex flex-col gap-1" style={{ width: '33%' }}>
              <span className="text-xs text-gray-500 font-medium">Giảng viên</span>
              <input
                placeholder="Tên giảng viên..."
                value={instructor}
                onChange={(e) => { setInstructor(e.target.value); setPage(0); }}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
              />
            </div>

            <div className="flex flex-col gap-1" style={{ width: '20%' }}>
              <span className="text-xs text-gray-500 font-medium">Danh mục</span>
              <Select
                options={categoryOptions}
                value={categoryId}
                onChange={(val) => { setCategoryId(val); setPage(0); }}
              />
            </div>

            <div className="flex flex-col gap-1" style={{ width: '22%' }}>
              <span className="text-xs text-gray-500 font-medium">Khoảng giá ($)</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    setMinPrice(val || '');
                    if (maxPrice && val > Number(maxPrice)) setMaxPrice('');
                    setPage(0);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                />
                <span className="text-gray-400 flex-shrink-0">—</span>
                <input
                  type="number"
                  min={minPrice || 0}
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Math.max(Number(minPrice) || 0, Number(e.target.value));
                    setMaxPrice(val || '');
                    setPage(0);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1" style={{ width: '15%' }}>
              <span className="text-xs text-gray-500 font-medium">Sắp xếp</span>
              <Select
                options={sortOptions}
                value={`${sortBy}-${sortDir}`}
                onChange={(val) => {
                  const [by, dir] = val.split('-');
                  setSortBy(by); setSortDir(dir); setPage(0);
                }}
              />
            </div>

            <div className="flex flex-col gap-1" style={{ width: '10%' }}>
              <button
                onClick={() => {
                  setInstructor(''); 
                  setCategoryId(null);
                  setMinPrice(''); 
                  setMaxPrice('');
                  setSortBy('subject');
                  setSortDir('asc');
                  setPage(0);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all whitespace-nowrap"
              >
                <X size={13} />
                Xoá bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}

      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="mb-4 text-gray-600 font-medium"
      >
        Tìm thấy <span className="text-brand font-bold">{totalElements}</span> khóa học
        {resultLabel && <span> {resultLabel}</span>}
      </motion.div>
      <motion.div layout transition={{ duration: 0.2 }}>
        <CourseGrid courses={courses} isLoading={isLoading} skeletonCount={8} />
      </motion.div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={pageDisplay.isFirst}
            onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-full border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Trang {pageDisplay.current} / {pageDisplay.total}
          </span>
          <button
              disabled={pageDisplay.isLast}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-full border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;