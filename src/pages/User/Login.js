import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import { useState } from 'react';
import { authService } from '../../services/authService';
import useUserStore from '../../store/useUserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validations/authSchema';
import AnimatedPage from '../../components/AnimatedPage';

const Login = () => {
  const nav = useNavigate();
  const [error, setError] = useState('');
  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm({resolver: zodResolver(loginSchema)});
  const login = useUserStore((s) => s.login);

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await authService.login(data);

      const userData = {
          username: res.data.username,
          role: res.data.role
        };
      const token = res.data.token;

      login(userData, token);

      nav('/');
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      const errorMsg = error.response?.data?.message || 'Sai tên đăng nhập hoặc mật khẩu!';
      setError(errorMsg);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo size="md" className="justify-center mb-4" />
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
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                  {error}
                </div>
              )}

              <Input 
                label="Tên đăng nhập"
                type="text"
                placeholder="trongtin140605"
                error={errors.username?.message}
                {...register("username")}
              />

              <Input 
                label="Mật khẩu"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
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
    </AnimatedPage>
  );
}

export default Login;