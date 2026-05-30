import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import useUserStore from '../../store/useUserStore';
import useChatInbox from '../../hooks/useChatInbox';
import { ROLES } from '../../constants/roles';

const ChatInboxList = ({ onSelectRoom, onClose }) => {
  const { rooms, isLoading, error } = useChatInbox();
  const user = useUserStore((s) => s.user);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      <div className="bg-brand text-white p-4 flex justify-between items-center shadow-sm z-10">
        <div>
          <h3 className="font-bold text-lg">Tin nhắn khóa học</h3>
          <p className="text-xs text-brand-light">
            {user?.role === ROLES.INSTRUCTOR ? 'Quản lý học viên của bạn' : 'Chọn một môn học để thảo luận'}
          </p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
        {!user ? (
          <div className="text-center text-sm text-gray-500 mt-10">Vui lòng đăng nhập.</div>
        ) : isLoading ? (
          <div className="text-center text-sm text-gray-500 mt-10 animate-pulse">Đang tải danh sách...</div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 mt-10">
            {error.message || "Không thể tải danh sách khóa học."}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center text-sm text-gray-500 mt-10">
            {user?.role === ROLES.INSTRUCTOR ? 'Bạn chưa tạo khóa học nào.' : 'Bạn chưa tham gia khóa học nào.'}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {rooms.map((room) => (
                <button 
                key={room.id}
                onClick={() => onSelectRoom(room)}
                className="flex items-center gap-3 p-3 text-left bg-white hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200 shadow-sm"
              >
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{room.subject || room.name}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.role === ROLES.INSTRUCTOR ? 'Phòng chat học viên' : `Giảng viên: ${room.instructorName || 'Đang cập nhật'}`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInboxList;