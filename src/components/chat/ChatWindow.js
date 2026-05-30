import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ChatInboxList from './ChatInboxList';
import ChatConversation from './ChatConversation';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveRoom(null), 200); 
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
            {!activeRoom ? (
              <ChatInboxList 
                onSelectRoom={(room) => setActiveRoom(room)} 
                onClose={handleClose} 
              />
            ) : (
              <ChatConversation 
                room={activeRoom} 
                onBack={() => setActiveRoom(null)} 
              />
            )}
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

export default ChatWindow;