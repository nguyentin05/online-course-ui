import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import Button from '../common/Button';

export default function PaymentModal({ isOpen, onClose, onConfirm, course }) {
  const [selectedMethod, setSelectedMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !course) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Giả lập quá trình giao tiếp với cổng thanh toán mất 2 giây
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm(selectedMethod); // Báo về component cha là thanh toán thành công
  };

  const methods = [
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'stripe', name: 'Thẻ tín dụng (Stripe)', icon: '💳' },
    { id: 'momo', name: 'Ví MoMo', icon: '🟣' },
    { id: 'zalopay', name: 'ZaloPay', icon: '🟢' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard size={24} className="text-brand" /> Thanh toán
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="p-5 bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">Khóa học</p>
          <p className="font-semibold text-gray-900 line-clamp-1">{course.subject}</p>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-700">Tổng thanh toán:</span>
            <span className="text-2xl font-bold text-brand">${course.price}</span>
          </div>
        </div>

        {/* Chọn phương thức */}
        <div className="p-5">
          <p className="font-medium text-gray-900 mb-3">Phương thức thanh toán</p>
          <div className="space-y-2">
            {methods.map(method => (
              <label key={method.id} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                selectedMethod === method.id ? 'border-brand bg-brand/5' : 'border-gray-200 hover:border-brand/30'
              }`}>
                <input 
                  type="radio" name="paymentMethod" value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="text-brand focus:ring-brand w-4 h-4"
                />
                <span className="text-xl">{method.icon}</span>
                <span className="font-medium text-gray-700">{method.name}</span>
              </label>
            ))}
          </div>

          <Button 
            variant="primary" 
            className="w-full mt-6" 
            onClick={handlePayment}
            isLoading={isProcessing}
          >
            Thanh toán ${course.price}
          </Button>
        </div>

      </div>
    </div>
  );
}