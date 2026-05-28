import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Apis, { endpoints } from '../../configs/Apis';

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (!orderId) { setStatus('failed'); return; }

    const verify = async () => {
      try {
        const res = await Apis.get(endpoints.payments.status(orderId));
        const result = res.data;
        setData(result);
        setStatus(result.enrolled ? 'success' : 'failed');
      } catch {
        setStatus('failed');
      }
    };

    verify();
  }, []);

  if (status === 'loading') return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <Loader2 size={40} className="animate-spin text-brand" />
      <p className="text-gray-600 font-medium">Đang xác nhận thanh toán...</p>
    </div>
  );

  if (status === 'success') return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 max-w-md w-full mx-4">
        <CheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900">Thanh toán thành công!</h2>
        <p className="text-gray-500 text-center">Bạn đã đăng ký khoá học thành công.</p>
        <button
          onClick={() => nav(`/course/${data.courseId}/lesson`)}
          className="w-full bg-brand text-white py-3 rounded-2xl font-semibold hover:bg-brand-dark transition-colors"
        >
          Vào học ngay
        </button>
        <button
          onClick={() => nav('/')}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 max-w-md w-full mx-4">
        <XCircle size={64} className="text-red-400" />
        <h2 className="text-2xl font-bold text-gray-900">Thanh toán thất bại</h2>
        <p className="text-gray-500 text-center">Giao dịch không thành công hoặc đã bị huỷ.</p>
        <button
          onClick={() => nav('/')}
          className="w-full bg-brand text-white py-3 rounded-2xl font-semibold hover:bg-brand-dark transition-colors"
        >
          Quay về trang chủ 
        </button>
      </div>
    </div>
  );
};

export default PaymentReturn;