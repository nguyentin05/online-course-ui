import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Register() {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch, // Hàm này dùng để theo dõi giá trị của một input theo thời gian thực
    formState: { errors, isSubmitting } 
  } = useForm();

  // Theo dõi giá trị của ô password để so sánh với ô confirmPassword
  const currentPassword = watch("password", "");

  const onSubmit = async (data) => {
    try {
      // Giả lập API delay 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Dữ liệu đăng ký gửi lên Backend:', data);
      
      // Chuyển hướng về trang đăng nhập sau khi tạo tài khoản thành công
      // (Thực tế có thể hiện thêm Toast thông báo thành công ở đây)
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="bg-brand w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
            <BookOpen size={24} />
          </div>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-brand hover:text-brand-dark transition-colors">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Input Họ và Tên */}
            <Input 
              label="Họ và tên"
              type="text"
              placeholder="Ví dụ: Nguyễn Văn A"
              error={errors.fullName?.message}
              {...register("fullName", { 
                required: "Vui lòng nhập họ và tên" 
              })}
            />

            {/* Input Email */}
            <Input 
              label="Địa chỉ Email"
              type="email"
              placeholder="email@example.com"
              error={errors.email?.message}
              {...register("email", { 
                required: "Email không được để trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không đúng định dạng"
                }
              })}
            />

            {/* Input Avatar URL (Dùng text để đơn giản hóa việc upload ở FE lúc này) */}
            <Input 
              label="Đường dẫn Avatar (Tùy chọn)"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              error={errors.avatar?.message}
              {...register("avatar")}
            />

            {/* Input Mật khẩu */}
            <Input 
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", { 
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự"
                }
              })}
            />

            {/* Input Xác nhận mật khẩu */}
            <Input 
              label="Xác nhận mật khẩu"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", { 
                required: "Vui lòng xác nhận mật khẩu",
                validate: (value) => 
                  value === currentPassword || "Mật khẩu xác nhận không khớp"
              })}
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-6"
              isLoading={isSubmitting}
            >
              Đăng ký tài khoản
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}