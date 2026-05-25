import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../configs/firebase';

export default function useChat(roomId) {
  // 1. Thay thế cỗ máy useReducer cồng kềnh bằng 3 state cơ bản
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lắng nghe tin nhắn Realtime
  useEffect(() => {
    if (!roomId) return;

    // Khởi tạo trạng thái tải
    setIsLoading(true);
    setError(null);

    const messagesRef = ref(db, `chats/${roomId}/messages`);

    // 2. Firebase onValue tự động bắn data mới mỗi khi có người chat
    const unsubscribe = onValue(messagesRef, 
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          
          messageList.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(messageList);
        } else {
          setMessages([]); // Phòng trống
        }
        setIsLoading(false); // Xong thì tắt loading
      }, 
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    // 3. Dọn dẹp bộ nhớ khi thoát phòng chat
    return () => {
      unsubscribe();
      setMessages([]); 
    };
  }, [roomId]);

  // Hàm gửi tin nhắn mới
  const sendMessage = useCallback(async (senderId, senderName, text) => {
    if (!text.trim() || !roomId) return;

    const messagesRef = ref(db, `chats/${roomId}/messages`);
    const newMessageRef = push(messagesRef);

    // TỐI ƯU UX (Optimistic UI):
    // Ép mảng cũ cộng thêm tin nhắn mới ngay lập tức
    const newMessage = {
      id: newMessageRef.key,
      senderId,
      senderName,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);

    // Ngầm lưu xuống DB, lỗi thì in ra log
    try {
      await set(newMessageRef, {
        senderId,
        senderName,
        text,
        timestamp: newMessage.timestamp
      });
    } catch (err) {
      console.error("Lỗi đồng bộ tin nhắn:", err);
    }
  }, [roomId]);

  // Trả về dữ liệu chuẩn mực
  return { 
    messages, 
    isLoading, 
    error,
    sendMessage 
  };
}