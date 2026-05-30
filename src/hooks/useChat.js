import { useEffect, useState, useCallback } from 'react';
import { ref, onChildAdded, push, serverTimestamp } from 'firebase/database';
import { signInWithCustomToken } from 'firebase/auth';
import { auth, db } from '../configs/firebase';
import Apis, { endpoints } from '../configs/Apis';
import { extractErrorMessage } from '../utils/errorUtils';

const useChat = (courseId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    let unsubscribe = null;
    let isMounted = true;

    const setupChat = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await Apis.post(endpoints.chat.createToken);
        const firebaseToken = res.data.firebaseToken;
        await signInWithCustomToken(auth, firebaseToken);
        await Apis.post(endpoints.chat.join(courseId));

        if (!isMounted) return;
        setIsReady(true);
        
        unsubscribe = onChildAdded(
          ref(db, `rooms/${courseId}/messages`),
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setMessages(prev => {
                if (prev.some(msg => msg.id === snapshot.key)) {
                  return prev;
                }
                return [...prev, {
                  id: snapshot.key,
                  senderId: String(data.uid),
                  senderName: data.username,
                  text: data.content,
                  timestamp: data.timestamp
                }];
              });
            }
          },
          (err) => {
            if (isMounted) {
              setError(extractErrorMessage(err, "Mất kết nối phòng chat"));
            }
          }
        );

        setIsLoading(false);

      } catch (err) {
        if (!isMounted) return;
        setError(extractErrorMessage(err, "Không thể kết nối phòng chat"));
        setIsLoading(false);
      }
    };
    
    setupChat();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
      setMessages([]);
      setIsReady(false);
    };
  }, [courseId]);

  const sendMessage = useCallback(async (senderId, senderName, text) => {
    if (!text.trim() || !courseId || !isReady) return;
    
    try {
      await push(ref(db, `rooms/${courseId}/messages`), {
        uid: String(senderId),
        username: senderName,
        content: text.trim(),
        timestamp: serverTimestamp() 
      });
    } catch (err) {
      setError(extractErrorMessage(err, "Lỗi gửi tin nhắn"));
    }
  }, [courseId, isReady]);

  return { 
    messages, 
    isLoading, 
    error,
    isReady,
    sendMessage 
  };
}

export default useChat;