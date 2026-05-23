import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon, trend, trendValue, colorClass }) {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${
            isPositive ? 'bg-success/10 text-success' : 'bg-red-50 text-red-600'
          }`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}