import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  variant = 'default',
  icon,
  className = '',
  inputClassName = '',
  ...props 
}, ref) => {
  const baseStyles = "w-full py-2 outline-none transition-all text-sm disabled:bg-bg-subtle disabled:text-gray-500 disabled:cursor-not-allowed";
  
  const variants = {
    default: `bg-white border rounded-lg focus:ring-2 focus:ring-opacity-50 px-4 ${
      error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900' 
        : 'border-gray-300 focus:border-brand focus:ring-brand text-gray-900'
    }`,
    
    search: `bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-brand/50 text-gray-900 ${
      icon ? 'pl-10 pr-4' : 'px-4'
    }`
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
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
      
      {variant !== 'search' && error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;