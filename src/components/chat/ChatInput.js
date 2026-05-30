import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Input from '../common/Input';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
      <Input 
        variant="search"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="flex-1"
        inputClassName="py-2.5"
      />
      <button 
        type="submit"
        disabled={disabled || !text.trim()}
        className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-brand-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Send size={18} className="-ml-0.5" />
      </button>
    </form>
  );
}

export default ChatInput;