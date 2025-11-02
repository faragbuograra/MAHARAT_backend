import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import fetchData, { BASE_URL } from '../Api/FetchApi';

const SOCKET_URL = 'http://10.11.1.67:8012';

const ChatPage = () => {
  const { userId } = useParams(); // userId: the other participant
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const s = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(s);
    // Get current user id from localStorage
    const id = localStorage.getItem('id');
    s.emit('join', { userId: id });
    s.on('message', (msg) => {
      setMessages((prev) => {
        // Prevent duplicate messages (by content and createdAt)
        if (prev.length > 0) {
          const last = prev[prev.length - 1];
          if (last.content === msg.content && last.createdAt === msg.createdAt) {
            return prev;
          }
        }
        console.log('New message received:', msg);
        return [...prev, msg];
      });
    });
    return () => s.disconnect();
  }, [userId]);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Fetch chat history
    const fetchMessages = async () => {
      const res = await fetchData(`messages/${userId}`);
      setMessages(res || []);
    };
    fetchMessages();
  }, [userId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Get senderId from localStorage (assuming user object is stored)
    const user = localStorage.getItem('id');
    socket.emit('message', { receiver_id: userId, content: input, sender_id : user });
    setInput('');
 
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => {
          // Determine if the message was sent by the current user
          const id = localStorage.getItem('id');
          const isMine = msg.sender_id
            ? msg.sender_id == id
            : msg.receiver_id == id;
          console.log(isMine);
          return (
            <div key={idx} className={`mb-2 flex ${!isMine ? 'justify-end' : 'justify-start'}`} >
              <div className={`px-4 py-2 rounded-lg ${!isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.content}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex p-4 bg-white border-t">
        <input
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="اكتب رسالة..."
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">إرسال</button>
      </form>
    </div>
  );
};

export default ChatPage;
