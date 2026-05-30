import React, { useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import useChat from '../../hooks/useChat';
import useUserStore from '../../store/useUserStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatConversation = ({ room, onBack }) => {
  const user = useUserStore((s) => s.user);
  const { messages, isLoading, error, isReady, sendMessage } = useChat(room.id);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!user || !isReady) return;
    sendMessage(user.id, user.username, text);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      <div className="bg-brand text-white p-3 flex items-center gap-3 shadow-md z-10">
        <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-sm truncate">{room.subject || room.name}</h3>
          <p className="text-xs text-brand-light truncate">
            {isLoading ? 'Đang kết nối...' : 'Trực tuyến'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
        {error ? (
          <div className="text-center text-sm text-red-500 my-auto p-4 bg-red-50 rounded-lg border border-red-100">
            <span className="font-semibold block mb-1">Truy cập bị từ chối</span>
            {error}
          </div>
        ) : isLoading ? (
          <div className="text-center text-sm text-gray-500 my-auto flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mb-2"></div>
            Đang tải dữ liệu...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500 my-auto">
            Chưa có tin nhắn nào trong khóa học này.
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isMe={user.username === msg.senderName} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={!user || !isReady || !!error} 
      />
    </div>
  );
};

export default ChatConversation;