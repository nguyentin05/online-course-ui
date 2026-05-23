import React from 'react';
import { Check, X } from 'lucide-react';

export default function CourseCompare({ courses = [] }) {
  if (courses.length < 2) {
    return <div className="p-4 text-center text-gray-500">Vui lòng chọn ít nhất 2 khóa học để so sánh.</div>;
  }

  // Danh sách các tiêu chí để so sánh
  const features = [
    { label: 'Giá tiền', key: 'price', format: (val) => val === 0 ? 'Miễn phí' : `$${val}` },
    { label: 'Giảng viên', key: 'instructorId.fullName' },
    { label: 'Cấp độ', key: 'level', default: 'Cơ bản' },
    { label: 'Thời lượng', key: 'duration', default: 'Đang cập nhật' },
    { label: 'Cấp chứng chỉ', key: 'hasCertificate', type: 'boolean', default: true },
  ];

  // Hàm tiện ích lấy value từ object nhiều tầng (VD: instructorId.fullName)
  const getNestedValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

  return (
    <div className="overflow-x-auto w-full bg-white rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4 border-b border-r border-gray-200 bg-gray-50 w-1/4 font-bold text-gray-700">Tiêu chí</th>
            {courses.map(course => (
              <th key={course.id} className="p-4 border-b border-gray-200 bg-white min-w-[200px] align-top">
                <img src={course.image} alt={course.subject} className="w-full aspect-video object-cover rounded-lg mb-3" />
                <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{course.subject}</h4>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 border-b border-r border-gray-200 font-medium text-gray-600 text-sm bg-gray-50/30">
                {feature.label}
              </td>
              {courses.map(course => {
                const rawValue = getNestedValue(course, feature.key);
                const value = rawValue !== undefined ? rawValue : feature.default;
                
                return (
                  <td key={course.id} className="p-4 border-b border-gray-100 text-sm text-gray-800">
                    {feature.type === 'boolean' ? (
                      value ? <Check size={18} className="text-success" /> : <X size={18} className="text-red-500" />
                    ) : (
                      feature.format ? feature.format(value) : value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}