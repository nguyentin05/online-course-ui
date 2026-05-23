import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Giả lập dữ liệu doanh thu 6 tháng gần nhất
const data = [
  { name: 'Tháng 1', revenue: 4000 },
  { name: 'Tháng 2', revenue: 3000 },
  { name: 'Tháng 3', revenue: 5000 },
  { name: 'Tháng 4', revenue: 8780 },
  { name: 'Tháng 5', revenue: 5890 },
  { name: 'Tháng 6', revenue: 9390 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ doanh thu ($)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0056D2" // Màu brand của chúng ta
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}