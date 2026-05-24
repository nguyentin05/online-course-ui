import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SortSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const options = [
    { value: 'subject-asc', label: 'Tên: A → Z' },
    { value: 'subject-desc', label: 'Tên: Z → A' },
    { value: 'price-asc', label: 'Giá: Thấp → Cao' },
    { value: 'price-desc', label: 'Giá: Cao → Thấp' },
  ];

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {selected?.label}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                value === opt.value ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'
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

export default SortSelect;