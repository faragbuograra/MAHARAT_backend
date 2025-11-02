import React, { useState } from 'react';
import fetchData from './Api/FetchApi';
import { FaFacebookF, FaGoogle, FaSearch, FaBriefcase, FaUserGraduate, FaUsers, FaStar, FaShieldAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [selectedAccount, setSelectedAccount] = useState(null); // 'searcher' or 'provider'
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
    bio: '',
  });

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="flex w-[900px] h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 p-10 flex flex-col justify-center" style={{ direction: 'rtl' }}>
          <h2 className="text-2xl font-bold mb-2 text-center">مرحباً بك</h2>
          <p className="text-gray-500 mb-5 text-center">اختر نوع حسابك للمتابعة</p>
          
          <div className="flex justify-center mb-5">
            <button
              className={`flex flex-col items-center rounded-md py-2 px-5 mx-1 transition-all duration-300 border ${selectedAccount === 'searcher' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-gray-300 text-black'}`}
              onClick={() => setSelectedAccount('searcher')}
            >
              <FaSearch />
              <span className="font-bold">باحث عن خدمة</span>
              <small>أبحث عن مقدم خدمة</small>
            </button>
            <button
              className={`flex flex-col items-center rounded-md py-2 px-5 mx-1 transition-all duration-300 border ${selectedAccount === 'provider' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-gray-300 text-black'}`}
              onClick={() => setSelectedAccount('provider')}
            >
              <FaBriefcase />
              <span className="font-bold">مقدم خدمة</span>
              <small>أقدم خدماتي</small>
            </button>
          </div>

          <div className="flex justify-center mb-5">
            <button 
              onClick={() => setActiveTab('login')}
              className={`py-2 px-5 ${activeTab === 'login' ? 'text-gray-700 border-b-2 border-blue-500' : 'text-gray-400'}`}
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`py-2 px-5 ${activeTab === 'register' ? 'text-gray-700 border-b-2 border-blue-500' : 'text-gray-400'}`}
            >
              إنشاء حساب
            </button>
          </div>

          {activeTab === 'login' ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const body = JSON.stringify({
                  email: loginForm.email,
                  password: loginForm.password,
                });
                const res = await fetchData('login', 'POST', body);
                if (res && res.status === 'success' && res.token && res.role) {
                  localStorage.setItem('access_token', res.token);
                  localStorage.setItem('role', res.role);
                  localStorage.setItem('id', JSON.stringify(res.id));
                  if (res.role === 'provider') {
                    window.location.href = '#/seeker';
                  } else if (res.role === 'seeker') {
                    window.location.href = '#/seeker';
                  } else {
                    window.location.href = '#/admin';
                  }
                }
              }}
            >
              <div className="mb-4">
                <label className="block mb-1 font-bold">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">كلمة المرور</label>
                <input
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                />
              </div>
              <div className="flex justify-between items-center mb-5">
                <label className="flex items-center">
                  <input type="checkbox" className="ml-2" /> تذكرني
                </label>
                <a href="#" className="text-blue-500">نسيت كلمة المرور؟</a>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md text-lg">تسجيل الدخول</button>
            </form>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedAccount) {
                  alert('يرجى اختيار نوع الحساب');
                  return;
                }
                if (registerForm.password !== registerForm.confirmPassword) {
                  alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
                  return;
                }
                const body = JSON.stringify({
                  name: registerForm.name,
                  email: registerForm.email,
                  password: registerForm.password,
                  role: selectedAccount === 'provider' ? 'provider' : 'seeker',
                  location: registerForm.location,
                  phone: registerForm.phone,
                  bio: registerForm.bio,
                });
                await fetchData('register', 'POST', body);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-1 font-bold">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.name}
                    onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.email}
                    onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold">كلمة المرور</label>
                  <input
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.password}
                    onChange={e => setRegisterForm(f => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.confirmPassword}
                    onChange={e => setRegisterForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold">الموقع</label>
                  <input
                    type="text"
                    placeholder="أدخل موقعك"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.location}
                    onChange={e => setRegisterForm(f => ({ ...f, location: e.target.value }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold">رقم الهاتف</label>
                  <input
                    type="text"
                    placeholder="أدخل رقم هاتفك"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.phone}
                    onChange={e => setRegisterForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block mb-1 font-bold">نبذة عنك</label>
                  <textarea
                    placeholder="اكتب نبذة قصيرة عنك"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={registerForm.bio}
                    onChange={e => setRegisterForm(f => ({ ...f, bio: e.target.value }))}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md text-lg mt-5">إنشاء حساب</button>
            </form>
          )}

          
        </div>
        <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex justify-center items-center text-center" style={{ direction: 'rtl' }}>
          <div className="p-10">
            <FaUserGraduate size={50} className="mx-auto" />
            <h1 className="text-4xl mb-2">مهارات</h1>
            <p className="text-lg mb-8">منصة ربط المهارات والخبرات</p>
            <ul className="list-none p-0">
              <li className="flex items-center mb-4 text-lg"><FaUsers className="ml-3" /> <span>ربط الباحثين بمقدمي الخدمات</span></li>
              <li className="flex items-center mb-4 text-lg"><FaStar className="ml-3" /> <span>جودة عالية وثقة مضمونة</span></li>
              <li className="flex items-center text-lg"><FaShieldAlt className="ml-3" /> <span>أمان وحماية للجميع</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
