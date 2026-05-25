import React, { useContext } from 'react';
import { Users, DollarSign, BookOpen, Star, PlusCircle } from 'lucide-react';

// Import các component thống kê
import StatCard from '../../components/stats/StatCard';
import RevenueChart from '../../components/stats/RevenueChart';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

export default function Dashboard() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tổng quan, {user?.fullName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi hiệu suất khóa học và doanh thu của bạn.
          </p>
        </div>
        <Link to="/instructor/course/create" className="bg-brand text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-dark transition-colors">
          <PlusCircle size={18} /> Tạo khóa học
        </Link>
      </div>

      {/* Hàng 1: Các thẻ thống kê mini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Tổng doanh thu" 
          value="$36,060" 
          icon={<DollarSign size={24} className="text-brand" />} 
          colorClass="bg-brand/10"
          trend="up" 
          trendValue="+15%" 
        />
        <StatCard 
          title="Tổng học viên" 
          value="1,250" 
          icon={<Users size={24} className="text-success" />} 
          colorClass="bg-success/10"
          trend="up" 
          trendValue="+5%" 
        />
        <StatCard 
          title="Khóa học đang mở" 
          value="4" 
          icon={<BookOpen size={24} className="text-purple-600" />} 
          colorClass="bg-purple-100"
        />
        <StatCard 
          title="Đánh giá trung bình" 
          value="4.8" 
          icon={<Star size={24} className="text-orange-500" />} 
          colorClass="bg-orange-100"
          trend="down" 
          trendValue="-0.1" 
        />
      </div>

      {/* Hàng 2: Khu vực Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ chiếm 2/3 không gian */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        
        {/* Cột 1/3 không gian để chứa các component khác (sau này sẽ thêm EnrollmentChart hoặc RecentActivities) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-400">
          <p>Khu vực mở rộng cho Biểu đồ phân bổ học viên</p>
        </div>
      </div>

    </div>
  );
}