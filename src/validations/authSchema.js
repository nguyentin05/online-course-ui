import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu")
});

export const registerSchema = z.object({
  lastName: z.string().trim().min(1, "Họ không được để trống"),
    
  firstName: z.string().trim().min(1, "Tên không được để trống"),
    
  username: z.string().trim()
    .min(1, "Vui lòng nhập tên đăng nhập")
    .min(3, "Tối thiểu 3 ký tự")
    .max(50, "Tối đa 50 ký tự")
    .regex(/^[a-zA-Z0-9_]+$/, "Chỉ dùng chữ, số và dấu gạch dưới"),
    
  email: z.string().trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),

  avatar: z.any()
    .refine((files) => files && files.length > 0, "Vui lòng chọn ảnh đại diện")
    .refine((files) => files[0]?.size <= 5000000, "Kích thước ảnh tối đa 5MB"),
    
  password: z.string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Tối thiểu 6 ký tự"),
    
  confirmPassword: z.string()
    .min(1, "Vui lòng xác nhận mật khẩu")
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});