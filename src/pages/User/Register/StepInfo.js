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
          {...register("lastName", { 
            required: "Vui lòng nhập họ",
            validate: (v) => v.trim().length > 0 || "Họ không được để trống"
          })}
          
        />
        <Input
          label="Tên" type="text" placeholder="Văn A"
          error={errors.firstName?.message}
          {...register("firstName", { 
            required: "Vui lòng nhập tên",
            validate: (v) => v.trim().length > 0 || "Tên không được để trống"
          })}
        />
      </div>

      <Input
        label="Tên đăng nhập" type="text" placeholder="username123"
        error={errors.username?.message}
        {...register("username", {
          required: "Vui lòng nhập tên đăng nhập",
          minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
          maxLength: { value: 50, message: "Tối đa 50 ký tự" },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: "Chỉ dùng chữ, số và dấu gạch dưới"
          }
        })}
      />

      <Input
        label="Địa chỉ Email" type="email" placeholder="email@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Vui lòng nhập email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không đúng định dạng"
          }
        })}
      />

      <Input
        label="Mật khẩu" type="password" placeholder="••••••••"
        error={errors.password?.message}
        {...register("password", {
          required: "Vui lòng nhập mật khẩu",
          minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
        })}
      />

      <Input
        label="Xác nhận mật khẩu" type="password" placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Vui lòng xác nhận mật khẩu",
          validate: (value, formValues) =>
            value === formValues.password || "Mật khẩu xác nhận không khớp"
        })}
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