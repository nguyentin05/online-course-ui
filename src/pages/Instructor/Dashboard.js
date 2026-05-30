import React from 'react';
import { Users, DollarSign, BookOpen, Star, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/stats/StatCard';
import RevenueChart from '../../components/stats/RevenueChart';
import useUserStore from '../../store/useUserStore'; 

const Dashboard = () => {
  const user = useUserStore((s) => s.user);
  
  // Tạm thời dùng dữ liệu giả lập cho đến khi nối API
  const stats = {
    revenue: 36060,
    students: 1250,
    activeCourses: 4,
    rating: 4.8
  };
  const isLoading = false;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Đang tải thống kê...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tổng quan, {user?.fullName || user?.username} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi hiệu suất khóa học và doanh thu của bạn.
          </p>
        </div>
        <Link to="/instructor/course/create" className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20 shrink-0">
          <PlusCircle size={18} /> Tạo khóa học
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Tổng doanh thu" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={<DollarSign size={24} className="text-brand" />} 
          colorClass="bg-brand/10"
          trend="up" 
          trendValue="+15%" 
        />
        <StatCard 
          title="Tổng học viên" 
          value={stats.students.toLocaleString()} 
          icon={<Users size={24} className="text-success" />} 
          colorClass="bg-success/10"
          trend="up" 
          trendValue="+5%" 
        />
        <StatCard 
          title="Khóa học đang mở" 
          value={stats.activeCourses.toString()} 
          icon={<BookOpen size={24} className="text-purple-600" />} 
          colorClass="bg-purple-100"
        />
        <StatCard 
          title="Đánh giá trung bình" 
          value={stats.rating.toString()} 
          icon={<Star size={24} className="text-orange-500" />} 
          colorClass="bg-orange-100"
          trend="down" 
          trendValue="-0.1" 
        />
      </div>

      {/* Hàng 2: Khu vực Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Biểu đồ doanh thu</h3>
          <RevenueChart />
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
          <Users size={48} className="mb-4 opacity-20" />
          <p>Khu vực mở rộng</p>
          <p className="text-sm">Biểu đồ phân bổ học viên</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;