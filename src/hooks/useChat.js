import { useEffect, useCallback, useReducer } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../configs/firebase';

// 1. Import Reducer vào Hook
import MyChatReducer, { initialChatState } from '../reducers/MyChatReducer';

export default function useChat(roomId) {
  // 2. Sử dụng useReducer thay cho useState
  const [state, dispatch] = useReducer(MyChatReducer, initialChatState);

  // Lắng nghe tin nhắn Realtime
  useEffect(() => {
    if (!roomId) return;

    // Báo cho UI biết đang tải dữ liệu
    dispatch({ type: 'FETCH_MESSAGES_START' });

    const messagesRef = ref(db, `chats/${roomId}/messages`);

    // Firebase onValue sẽ tự động chạy lại khi có biến động dữ liệu
    const unsubscribe = onValue(messagesRef, 
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          
          messageList.sort((a, b) => a.timestamp - b.timestamp);
          
          // Ném danh sách lấy được từ Server vào Reducer
          dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: messageList });
        } else {
          // Phòng chat chưa có tin nhắn nào
          dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: [] });
        }
      }, 
      (error) => {
        // Nếu kết nối Firebase bị lỗi
        dispatch({ type: 'FETCH_MESSAGES_ERROR', payload: error.message });
      }
    );

    // Dọn dẹp: Ngắt kết nối và xóa sạch chat cũ khi chuyển sang phòng khác
    return () => {
      unsubscribe();
      dispatch({ type: 'CLEAR_CHAT' });
    };
  }, [roomId]);

  // Hàm gửi tin nhắn mới
  const sendMessage = useCallback(async (senderId, senderName, text) => {
    if (!text.trim() || !roomId) return;

    const messagesRef = ref(db, `chats/${roomId}/messages`);
    const newMessageRef = push(messagesRef); // Sinh ra ID mới từ Firebase

    // TỐI ƯU UX (Optimistic UI):
    // Đẩy ngay tin nhắn vào Reducer để hiện lên màn hình lập tức, không độ trễ!
    const newMessage = {
      id: newMessageRef.key,
      senderId,
      senderName,
      text,
      timestamp: Date.now()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });

    // Cùng lúc đó, ngầm lưu xuống Firebase
    await set(newMessageRef, {
      senderId,
      senderName,
      text,
      timestamp: newMessage.timestamp
    });
  }, [roomId]);

  // 3. Trả về đúng định dạng gốc để ChatWindow không bị ảnh hưởng
  return { 
    messages: state.messages, 
    isLoading: state.isLoading, 
    error: state.error,
    sendMessage 
  };
}