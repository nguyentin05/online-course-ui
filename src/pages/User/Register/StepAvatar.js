import { useState } from 'react';
import { ChevronLeft, Upload } from 'lucide-react';
import Button from '../../../components/common/Button';

const StepAvatar = ({ register, errors, onBack, isSubmitting, role }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <label className="cursor-pointer group">
          <div className="w-72 h-72 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center relative">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload size={20} className="text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-brand transition-colors">
                <Upload size={48} />
                <span className="text-sm">Tải ảnh đại diện</span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar", { required: "Vui lòng chọn ảnh đại diện" })}
            onChange={(e) => {
              register("avatar").onChange(e);
              handleFileChange(e);
            }}
          />
        </label>
        {errors.avatar && (
          <span className="text-sm text-red-500">{errors.avatar.message}</span>
        )}
      </div>

      {role === 'INSTRUCTOR' && (
        <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-xl">
          <p className="text-md text-yellow-600 text-center">
            Tài khoản giảng viên cần được phê duyệt
            <br /> trước khi sử dụng
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" className="w-1/3" onClick={onBack} type="button">
          <ChevronLeft size={16} className="mr-1" /> Quay lại
        </Button>
        <Button type="submit" variant="primary" className="w-2/3" isLoading={isSubmitting}>
          Đăng ký tài khoản
        </Button>
      </div>
    </div>
  );
};

export default StepAvatar;