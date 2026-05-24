import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ options = [], value, onChange, placeholder = 'Chọn...' }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selected = options.find(o => String(o.value) === String(value));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
        {selected?.label ?? placeholder}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {options.map(opt => (
            <button
              key={opt.value ?? 'default'}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                String(value) === String(opt.value)
                  ? 'text-brand font-semibold bg-brand/5'
                  : 'text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;