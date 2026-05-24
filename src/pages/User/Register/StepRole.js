import Button from '../../../components/common/Button';
import { ROLES } from '../../../constants/roles';

const roleInfo = [
  {
    value: ROLES.STUDENT,
    label: 'Sinh viên',
    icon: '🎓',
    features: ['Học các khoá học', 'Theo dõi tiến độ', 'Nhận chứng chỉ']
  },
  {
    value: ROLES.INSTRUCTOR,
    label: 'Giảng viên',
    icon: '🧑‍🏫',
    features: ['Tạo khoá học', 'Quản lý học viên', 'Thống kê doanh thu']
  },
];

const StepRole = ({ selected, onSelect, onNext }) => (
  <div>
    <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
      Bạn muốn tham gia với tư cách?
    </h3>

    <div className="grid grid-cols-2 gap-4 mb-6">
      {roleInfo.map(r => (
        <button
          key={r.value}
          type="button"
          onClick={() => onSelect(r.value)}
          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
            selected === r.value
              ? 'border-brand bg-brand/5 shadow-md shadow-brand/10'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-4xl">{r.icon}</span>
          <span className={`text-base font-bold ${selected === r.value ? 'text-brand' : 'text-gray-800'}`}>
            {r.label}
          </span>
          <ul className="space-y-1 w-full">
            {r.features.map(f => (
              <li key={f} className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="text-green-400">✓</span> {f}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>

    <Button variant="primary" className="w-full" disabled={!selected} onClick={onNext}>
      Tiếp tục
    </Button>
  </div>
);

export default StepRole;