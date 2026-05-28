import React from 'react';

const ComparisonBar = ({ rawValue, displayValue, max, label, icon: Icon, colorClass }) => {
  const percentage = max > 0 ? (rawValue / max) * 100 : 0;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
          {/* Render Icon nếu được truyền vào */}
          {Icon && <Icon size={12} />} {label}
        </span>
        <span className="text-sm font-bold text-gray-900">
          {displayValue || rawValue}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ComparisonBar;