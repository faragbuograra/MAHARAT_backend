import React, { useEffect, useState } from 'react';
import fetchData from '../Api/FetchApi';
import { Link } from 'react-router-dom';

const ChatsListPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        // Fetch all messages where I am sender or receiver
        const res = await fetchData('messages');
        const messages = res || [];
        // Group messages by the other participant
        const chatMap = {};
        messages.forEach(msg => {
          const otherId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          if (!chatMap[otherId]) chatMap[otherId] = [];
          chatMap[otherId].push(msg);
        });
        // Convert to array of { userId, lastMessage }
        const chatList = Object.entries(chatMap).map(([otherId, msgs]) => ({
          userId: otherId,
          lastMessage: msgs[msgs.length - 1],
          messages: msgs
        }));
        // Sort by last message time desc
        chatList.sort((a, b) => new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at));
        setChats(chatList);
      } catch (err) {
        setError('حدث خطأ أثناء جلب المحادثات');
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [user.id]);

  return (
    <div className="container py-8 px-4 ">
      <h1 className="text-2xl font-bold  mb-6">محادثاتي</h1>
      {loading ? (
        <div className="text-center">جاري التحميل...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : chats.length === 0 ? (
        <div className="text-center text-gray-500">لا توجد محادثات بعد.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {chats.map(chat => (
            <li key={chat.userId} className="py-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">مستخدم رقم {chat.userId}</div>
                <div className="text-gray-600 text-sm truncate max-w-xs">{chat.lastMessage.content}</div>
                <div className="text-xs text-gray-400">{new Date(chat.lastMessage.created_at).toLocaleString()}</div>
              </div>
              <Link to={`/chat/${chat.userId}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">فتح المحادثة</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatsListPage;
