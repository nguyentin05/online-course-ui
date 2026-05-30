import React from 'react';

const ChatMessage = ({ message, isMe }) => {
  return (
    <div className={`flex flex-col max-w-[80%] ${isMe ? 'self-end' : 'self-start'}`}>
      <span className={`text-[10px] text-gray-400 mb-1 mx-1 ${isMe ? 'text-right' : 'text-left'}`}>
        {isMe ? 'Bạn' : message.senderName}
      </span>
      <div className={`px-4 py-2 rounded-2xl text-sm ${
        isMe 
          ? 'bg-brand text-white rounded-tr-none' 
          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
      }`}>
        {message.text}
      </div>
    </div>
  );
}

export default ChatMessage; 