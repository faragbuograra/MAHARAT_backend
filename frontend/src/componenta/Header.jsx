import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Language map for titles
const titles = {
  ar: {
    dashboard: "لوحة التحكم",
    session: "ربط الهاتف",
    chat: "الرسائل",
    "auto-reply": "الرد الآلي",
    profile: "الملف الشخصي",
    "send-message": "إرسال رسالة",
    auth: "تسجيل الدخول",
    register: "تسجيل حساب جديد",
    "chat-statistics": "إحصائيات الرسائل",
    "auto-reply-list": "قائمة الردود الآلية",
    "session-status": "حالة الجلسة",
    "send-message-list": "قائمة الرسائل المرسلة",
    "dashboard-home": "الرئيسية",
    "not-found": "غير موجود",
    "settings": "الإعدادات",
    "users": "المستخدمون",
    "reports": "التقارير",
    "logout": "تسجيل الخروج"
  },
  en: {
    dashboard: "Dashboard",
    session: "Session",
    chat: "Chats",
    "auto-reply": "Auto Reply",
    profile: "Profile",
    "send-message": "Send Message",
    auth: "Login",
    register: "Register",
    "chat-statistics": "Chat Statistics",
    "auto-reply-list": "Auto Reply List",
    "session-status": "Session Status",
    "send-message-list": "Sent Messages",
    "dashboard-home": "Home",
    "not-found": "Not Found",
    "settings": "Settings",
    "users": "Users",
    "reports": "Reports",
    "logout": "Logout"
  }
};

function getHeaderTitle(pathname, lang) {
  if (pathname === "/" || pathname === "") return titles[lang].dashboard;
  const endpoint = pathname.split("/").filter(Boolean).pop();
  if (!endpoint) return titles[lang].dashboard;
  return titles[lang][endpoint] || endpoint;
}

export default function Header() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Toggle handler
  const toggleDarkMode = () => setDarkMode((d) => !d);
  const location = useLocation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ar");
  const [title, setTitle] = useState(getHeaderTitle(location.pathname, lang));
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // new state for mobile menu
  const navigate = useNavigate();

  // Update title on route or lang change
  useEffect(() => {
    setTitle(getHeaderTitle(location.pathname, lang));
  }, [location.pathname, lang]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Language switch handler
  const handleLangChange = (e) => {
    setLang(e.target.value);
    localStorage.setItem("lang", e.target.value);
    window.location.reload(); // reload to apply language everywhere
  };

  return (
    <header className="bg-white  shadow h-16 flex items-center px-4 sm:px-6 justify-between border-b border-gray-200  relative">
      {/* Mobile hamburger */}
    
      {/* Logo and title */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img
          src="./LogoCBL.svg (1).png"
          alt="Logo"
          className="h-16 w-14 object-contain"
        />
        <span className="font-extrabold text-lg sm:text-xl text-[#2446ed]  tracking-tight">{title}</span>
      </div>
        <button
        className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100  text-[#2446ed]  mr-2"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {/* Desktop controls */}
      <div className="hidden sm:flex items-center gap-4">
        {/* <select
          value={lang}
          onChange={handleLangChange}
          className="border rounded px-2 py-1 text-sm bg-gray-50  "
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select> */}
        <button className="relative bg-gray-100  px-3 py-1 rounded-full hover:bg-indigo-50  transition flex items-center gap-2 text-[#2446ed]  font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="hidden sm:inline">{lang === "ar" ? "الإشعارات" : "Notifications"}</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
        </button>
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200  text-gray-800  rounded-full px-3 py-1 mr-2 transition hover:bg-gray-300 "
          title={darkMode ? (lang === "ar" ? "وضع النهار" : "Light Mode") : (lang === "ar" ? "الوضع الداكن" : "Dark Mode")}
        >
          {darkMode ? (lang === "ar" ? "☀️" : "☀️") : (lang === "ar" ? "🌙" : "🌙")}
        </button>
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer border border-indigo-200 text-[#2446ed] font-bold text-lg hover:bg-indigo-200 transition"
            onClick={() => setMenuOpen((v) => !v)}
            title={lang === "ar" ? "الحساب" : "Account"}
          >
            U
          </div>
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white  border  rounded shadow-lg z-20 text-right animate-fade-in">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-indigo-50  text-[#2446ed] "
                onClick={() => setMenuOpen(false)}
              >
                {lang === "ar" ? "الملف الشخصي" : "Profile"}
              </Link>
              <Link
                to="/admin/reset-password"
                className="block px-4 py-2 hover:bg-indigo-50  text-[#2446ed] "
                onClick={() => setMenuOpen(false)}
              >
                {lang === "ar" ? "تغيير كلمة المرور" : "Reset Password"}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-right px-4 py-2 hover:bg-indigo-50  text-red-600 "
              >
                {lang === "ar" ? "تسجيل الخروج" : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white  border-t border-gray-200  z-30 flex flex-col gap-2 px-4 py-3 animate-fade-in">
          <select
            value={lang}
            onChange={handleLangChange}
            className="border rounded px-2 py-1 text-sm bg-gray-50   mb-2"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
          <button className="relative bg-gray-100  px-3 py-1 rounded-full hover:bg-indigo-50  transition flex items-center gap-2 text-[#2446ed]  font-semibold mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>{lang === "ar" ? "الإشعارات" : "Notifications"}</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200  text-gray-800  rounded-full px-3 py-1 transition hover:bg-gray-300  mb-2"
            title={darkMode ? (lang === "ar" ? "وضع النهار" : "Light Mode") : (lang === "ar" ? "الوضع الداكن" : "Dark Mode")}
          >
            {darkMode ? (lang === "ar" ? "☀️" : "☀️") : (lang === "ar" ? "🌙" : "🌙")}
          </button>
          <Link
            to="/profile"
            className="block px-4 py-2 rounded hover:bg-indigo-50  text-[#2446ed] "
            onClick={() => setMobileMenuOpen(false)}
          >
            {lang === "ar" ? "الملف الشخصي" : "Profile"}
          </Link>
          <button
            onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
            className="block w-full text-right px-4 py-2 rounded hover:bg-indigo-50  text-red-600 "
          >
            {lang === "ar" ? "تسجيل الخروج" : "Logout"}
          </button>
        </div>
      )}
    </header>
  );
}