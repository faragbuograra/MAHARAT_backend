import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

import Sidebar from './componenta/Slider';
import DashboardHome from './Pages/Dashboard';
import Header from './componenta/Header';

import ResetPassword from './Pages/ResetPassword';



import NotFound from './Pages/NotFound';
import CategoriesList from './Pages/Categories';
import AddCategory from './Pages/AddCategory';
import UsersManagement from './Pages/UsersManagement';
import ServicesManagement from './Pages/ServicesManagement';
import LandingPage from './Pages/LandingPage';
import SeekerPage from './Pages/SeekerPage';
import ProfilePage from './Pages/ProfilePage';
import CreateEditServicePage from './Pages/CreateEditServicePage';
import ProviderProfilePage from './Pages/ProviderProfilePage';
import ChatPage from './Pages/ChatPage';
import ChatsListPage from './Pages/ChatsListPage';
const App = () => {
  // Fetch the image and display it as a blob URL
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 768 // Open sidebar on larger screens
      ? true
      : false
  );  const sidebarMargin = 'ar'
    ? (sidebarOpen ? 'mr-16 md:mr-64' : 'mr-16')
    : (sidebarOpen ? 'ml-16 md:ml-64' : 'ml-16');
    const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  return (
    <div className="flex flex-col h-screen" dir="rtl">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/seeker" element={<SeekerPage />} />
        <Route path="/provider/:id" element={<ProviderProfilePage />} />
        <Route path="/chat/:userId" element={<RequireAuth><ChatPage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/chats" element={<RequireAuth><ChatsListPage /></RequireAuth>} />
        <Route path="/services/create" element={<RequireAuth><CreateEditServicePage /></RequireAuth>} />
        <Route path="/services/edit/:id" element={<RequireAuth><CreateEditServicePage /></RequireAuth>} />
             <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
            element={
              <RequireAuth>
                <>
                 <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
                 <div
                    className={`flex flex-col bg-gray-1000 transition-all duration-300 ${sidebarMargin}`}
                  >
          <Header onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
                 
                  <Routes>
                    <Route path="/admin" element={<DashboardHome />} />
                    <Route path="/admin/categories" element={<CategoriesList />} />
                    <Route path="/admin/categories/add" element={<AddCategory />} />

                    <Route path="/admin/reset-password" element={<ResetPassword />} />
                    <Route path="/admin/users" element={<UsersManagement />} />
                    <Route path="/admin/services" element={<ServicesManagement />} />
                  
                 
                  </Routes>
                              
                  </div>
                </>
              </RequireAuth>
            }
          />
             <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
};
function RequireAuth({ children }) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;

