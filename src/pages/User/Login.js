import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useUser from '../../hooks/useUser';

const Login = () => {
  const navigate = useNavigate();
  
  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm();

  const { login } = useUser();

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const fakeUserFromDB = {
        id: 1,
        fullName: "Nguyễn Trọng Tín",
        email: data.email,
        role: "STUDENT",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tin"
      };

      login(fakeUserFromDB);
      
      navigate('/');
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
          Chào mừng trở lại
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hoặc{' '}
          <Link to="/register" className="font-medium text-brand hover:text-brand-dark transition-colors">
            tạo tài khoản mới
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <Input 
              label="Địa chỉ Email"
              type="email"
              placeholder="tin@nitt.com"
              error={errors.email?.message}
              {...register("email", { 
                required: "Email không được để trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không đúng định dạng"
                }
              })}
            />

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

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Ghi nhớ tôi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand hover:text-brand-dark">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-6" isLoading={isSubmitting}>
              Đăng nhập
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;