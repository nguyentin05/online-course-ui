import { ChevronLeft } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const StepInfo = ({ register, errors, trigger, onNext, onBack }) => {
  const handleNext = async () => {
    const valid = await trigger([
      'lastName', 
      'firstName', 
      'username', 
      'email', 
      'password', 
      'confirmPassword'
    ]);
    if (valid) onNext();
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Họ" type="text" placeholder="Nguyễn"
          error={errors.lastName?.message}
          {...register("lastName")}
          
        />
        <Input
          label="Tên" type="text" placeholder="Văn A"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
      </div>

      <Input
        label="Tên đăng nhập" type="text" placeholder="username123"
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        label="Địa chỉ Email" type="email" placeholder="email@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Mật khẩu" type="password" placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Xác nhận mật khẩu" type="password" placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="flex gap-3 pt-1">
        <Button variant="outline" className="w-1/3" onClick={onBack} type="button">
          <ChevronLeft size={16} className="mr-1" /> Quay lại
        </Button>
        <Button variant="primary" className="w-2/3" onClick={handleNext} type="button">
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default StepInfo;