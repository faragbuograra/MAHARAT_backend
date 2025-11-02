import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../Api/FetchApi';

const AppBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
 useEffect(() => {
    const getProfile = async () => {
      try {
        const userProfile = await fetchData('me');
        setUser(userProfile.data);
       
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
                setIsLoggedIn(false);
      } finally {

      }
    };

    getProfile();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    // You might want to redirect to the homepage or login page
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">مهارات</Link>
            <nav className="hidden md:flex mx-10 space-x-8">
              {isLoggedIn ? (
                <>
                  <Link to="/seeker" className="text-gray-500 hover:text-gray-900">البحث</Link>
                
                 {localStorage.getItem('role') === 'provider' && (
                               <Link to={`/chats`} className="text-gray-500 hover:text-gray-900">
                                 محادثة
                               </Link>
                             )}
                </>
                ) : (
                  <>
                  <Link to="/" className="text-gray-500 hover:text-gray-900">الرئيسية</Link>
                  <Link to="/seeker" className="text-gray-500 hover:text-gray-900">الخدمات</Link>
                  <Link to="/about" className="text-gray-500 hover:text-gray-900">حول المنصة</Link>
                  <Link to="/contact" className="text-gray-500 hover:text-gray-900">اتصل بنا</Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => {
                    const menu = document.getElementById('user-menu');
                    menu.classList.toggle('hidden');
                }}>
                    <div className="flex justify-center items-center">
 <img className="w-8 h-8 rounded-full" src={user?.profilePicture || "https://randomuser.me/api/portraits/women/8.jpg"} alt="User" />
                  <span className="m-2 text-sm text-gray-700">{user?.name || "مستخدم"}</span>
                    </div>
                 
                </button>
                <div id="user-menu" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الملف الشخصي</Link>
                  <button onClick={handleLogout} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-500 hover:text-gray-900 ml-4">تسجيل الدخول</Link>
                <Link to="/login" className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  انضم الآن
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
