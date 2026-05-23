// Khởi tạo State mặc định cho Chat
export const initialChatState = {
  messages: [],
  isLoading: false,
  error: null
};

// Reducer xử lý các Action (Hành động) gửi tới
export default function MyChatReducer(state, action) {
  switch (action.type) {
    case 'FETCH_MESSAGES_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
      
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        messages: action.payload // payload chứa mảng tin nhắn lấy từ Firebase/API
      };
      
    case 'FETCH_MESSAGES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case 'ADD_MESSAGE':
      // Kiểm tra xem tin nhắn đã tồn tại chưa (tránh trùng lặp khi dùng realtime)
      const isExist = state.messages.find(m => m.id === action.payload.id);
      if (isExist) return state;
      
      return {
        ...state,
        // Chèn tin nhắn mới vào cuối mảng hiện tại
        messages: [...state.messages, action.payload]
      };
      
    case 'CLEAR_CHAT':
      return initialChatState;

    default:
      return state;
  }
}