import React, { useState, useContext, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import useChat from '../../hooks/useChat';
import { UserContext } from '../../configs/MyContexts';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  
  const user = useContext(UserContext);
  
  // Kết nối vào phòng chat
  const { messages, isLoading, sendMessage } = useChat('edu_global_room');
  const messagesEndRef = useRef(null);

  // Tự động cuộn
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Hàm xử lý gửi tin nhắn được truyền xuống ChatInput
  const handleSendMessage = (text) => {
    if (!user) return;
    sendMessage(user.id, user.fullName, text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-[350px] sm:w-[400px] h-[500px] mb-4 rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand text-white p-4 flex justify-between items-center shadow-md z-10">
              <div>
                <h3 className="font-bold">Phòng trao đổi chung</h3>
                <p className="text-xs text-brand-light">Hỗ trợ trực tuyến 24/7</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Vùng hiển thị tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              {!user ? (
                <div className="text-center text-sm text-gray-500 my-auto">
                  Vui lòng đăng nhập để tham gia trò chuyện.
                </div>
              ) : isLoading ? (
                <div className="text-center text-sm text-gray-500 my-auto">
                  Đang kết nối...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 my-auto">
                  Chưa có tin nhắn nào. Hãy là người bắt đầu!
                </div>
              ) : (
                messages.map((msg) => (
                  <ChatMessage 
                    key={msg.id} 
                    message={msg} 
                    isMe={user?.id === msg.senderId} 
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Component Nhập tin nhắn */}
            <ChatInput 
              onSendMessage={handleSendMessage} 
              disabled={!user} 
            />

          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-brand/30 hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
    </div>
  );
}