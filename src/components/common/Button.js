import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', // primary | outline | ghost
  size = 'md',         // sm | md | lg
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) {
  // Đã cập nhật đúng hiệu ứng shadow và màu sắc cũ của bạn
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20',
    outline: 'border-2 border-brand text-brand hover:bg-brand/5',
    ghost: 'text-gray-600 hover:text-brand hover:bg-brand/10',
  };

  // Cân chỉnh lại padding chuẩn cho nút bo tròn
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2 text-sm', 
    lg: 'px-8 py-3 text-base font-semibold',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-medium transition-colors duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        rounded-full outline-none /* Ép tròn vo và tắt viền mặc định của trình duyệt */
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Đang xử lý...
        </>
      ) : (
        children
      )}
    </button>
  );
}