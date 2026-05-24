import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BookOpen } from 'lucide-react';
import Apis, { endpoints } from '../../../configs/Apis';
import StepIndicator from './StepIndicator';
import StepRole from './StepRole';
import StepInfo from './StepInfo';
import StepAvatar from './StepAvatar';
import Logo from '../../../components/common/Logo';
import { ROLES } from '../../../constants/roles';
import { authService } from '../../../services/authService';

const STEP_TITLES = ['Chọn vai trò', 'Thông tin tài khoản', 'Ảnh đại diện'];

const Register = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');

  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    try {
      let form = new FormData();
      form.append('username', data.username);
      form.append('email', data.email);
      form.append('password', data.password);
      form.append('firstName', data.firstName);
      form.append('lastName', data.lastName);
      form.append('role', role);
      form.append('active', true);
      form.append('avatar', data.avatar[0]);

      await authService.register(form);

      nav('/login', {
        state: {
          message: role === ROLES.INSTRUCTOR
            ? 'Tài khoản giảng viên đang chờ admin phê duyệt.'
            : 'Đăng ký thành công! Vui lòng đăng nhập.'
        }
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.');
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo size="md" className="justify-center mb-4" />

        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-brand hover:text-brand-dark transition-colors">
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6">
        <div className="bg-white py-6 px-4 shadow sm:rounded-2xl sm:px-8 border border-gray-100">
          <StepIndicator currentStep={step} totalSteps={3} />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-500 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <StepRole selected={role} onSelect={setRole} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <StepInfo
                register={register} errors={errors} trigger={trigger}
                onNext={() => setStep(3)} onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepAvatar
                register={register} errors={errors}
                onBack={() => setStep(2)} isSubmitting={isSubmitting} role={role}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;