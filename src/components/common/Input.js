import React, { forwardRef } from 'react';

// Dùng forwardRef để tương thích tốt với react-hook-form sau này
const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  variant = 'default', // 'default' (cho Form) | 'search' (cho Thanh tìm kiếm)
  icon,                // Nhận vào một icon component (VD: <Search size={18} />)
  className = '',      // Class cho thẻ bọc bên ngoài
  inputClassName = '', // Class custom thêm cho thẻ input bên trong
  ...props 
}, ref) => {
  
  // Các class dùng chung cho mọi loại ô nhập
  const baseStyles = "w-full py-2 outline-none transition-all text-sm disabled:bg-bg-subtle disabled:text-gray-500 disabled:cursor-not-allowed";
  
  // Tách biệt giao diện cho Form và Search
  const variants = {
    // Bản chuẩn cho Form (Đăng nhập, Tạo khóa học...)
    default: `bg-white border rounded-lg focus:ring-2 focus:ring-opacity-50 px-4 ${
      error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900' 
        : 'border-gray-300 focus:border-brand focus:ring-brand text-gray-900'
    }`,
    
    // Bản chuẩn cho Thanh tìm kiếm (Y chang thiết kế bạn muốn)
    search: `bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-brand/50 text-gray-900 ${
      icon ? 'pl-10 pr-4' : 'px-4'
    }`
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Hiển thị Label nếu có */}
      {label && (
        <label className="mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {/* Wrapper để chứa Input và Icon */}
      <div className="relative">
        {/* Render Icon nếu được truyền vào */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${variants[variant]} ${inputClassName}`}
          {...props}
        />
      </div>
      
      {/* Vùng hiển thị lỗi (Thường Search Bar sẽ không cần hiện lỗi đỏ lòm ở dưới) */}
      {variant !== 'search' && (
        <div className="min-h-[20px] mt-1">
          {error && (
            <span className="text-sm text-red-500">{error}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;