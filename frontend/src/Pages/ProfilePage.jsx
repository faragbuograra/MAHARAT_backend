import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../componenta/AppBar';
import fetchData, { BASE_URL } from '../Api/FetchApi';
import { FiEdit, FiTrash2, FiPlusCircle, FiUpload } from 'react-icons/fi';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', bio: '', location: '', profile_image: null });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userProfile = await fetchData('me');
        setUser(userProfile.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const openEditModal = () => {
    setEditData({
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
      location: user.location || '',
      profile_image: null,
    });
    setEditOpen(true);
    setEditError(null);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_image') {
      setEditData((prev) => ({ ...prev, profile_image: files[0] }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('phone', editData.phone);
      formData.append('bio', editData.bio);
      formData.append('location', editData.location);
      if (editData.profile_image) {
        formData.append('profile_image', editData.profile_image);
      }
      await fetchData(`users/${user.id}`, 'PATCH', formData);
      setEditOpen(false);
      setLoading(true);
      const userProfile = await fetchData('me');
      setUser(userProfile.data);
    } catch (err) {
      setEditError('حدث خطأ أثناء تحديث البيانات');
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">User not found.</h2>
        <p className="text-gray-500">Please try logging in again.</p>
        <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }

  // Helper to get the correct profile image URL
  const getProfileImageUrl = (img) => {
  
    if (!img) return 'https://randomuser.me/api/portraits/men/32.jpg';
    if (img.startsWith('http')) return img;
    return `${BASE_URL}/uploads/attachment/${img}`.replaceAll('/api/v1', '');
  };

  const renderProviderProfile = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:space-x-8 md:space-x-reverse mb-8">
        <img className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" src={getProfileImageUrl(user.profile_image)} alt={user.name} />
        <div className="text-center md:text-right mt-4 md:mt-0 flex-1">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center md:justify-start">
            {user.name}
            <button className="ml-2 text-blue-500 hover:text-blue-700" onClick={openEditModal}><FiEdit size={22} /></button>
          </h1>
          <p className="text-lg text-gray-600">{user.phone && <span className="font-bold">{user.phone}</span>} {user.title ? `- ${user.title}` : ''} - {user.location}</p>
          {user.rating && (
            <div className="flex items-center justify-center md:justify-start mt-2">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="font-bold ml-1 text-gray-700">{user.rating}</span>
              <span className="text-gray-500 ml-2">({user.reviews || 0} تقييم)</span>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">نبذة عني</h3>
        <p className="text-gray-700 leading-relaxed">{user.bio}</p>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">خدماتي</h2>
          <Link to="/services/create" className="flex items-center bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FiPlusCircle className="mr-2" />
            إنشاء خدمة
          </Link>
        </div>
        {user.services && user.services.length > 0 ? (
          <div className="space-y-4">
            {user.services.map(service => (
              <div key={service.id} className="bg-gray-50 hover:bg-gray-100 p-5 rounded-lg flex justify-between items-center transition-colors">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
                  <p className="text-green-600 font-bold">{service.price} د.ل</p>
                </div>
                <div className="flex space-x-4 space-x-reverse">
                  <Link to={`/services/edit/${service.id}`} className="text-blue-500 hover:text-blue-700 transition-colors"><FiEdit size={20} /></Link>
                  <button className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">لم تقم بإضافة أي خدمات بعد.</p>
        )}
      </div>
    </div>
  );

  const renderSeekerProfile = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:space-x-8 md:space-x-reverse mb-8">
        <img className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" src={getProfileImageUrl(user.profile_image)} alt={user.name} />
        <div className="text-center md:text-right mt-4 md:mt-0 flex-1">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center md:justify-start">
            {user.name}
            <button className="ml-2 text-blue-500 hover:text-blue-700" onClick={openEditModal}><FiEdit size={22} /></button>
          </h1>
          <p className="text-lg text-gray-600">{user.phone && <span className="font-bold">{user.phone}</span>} - {user.location}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">مقدمو الخدمات المحفوظون</h2>
        {user.saved_list && user.saved_list.length > 0 ? (
          <div className="space-y-4">
            {user.saved_list.map(provider => (
              <div key={provider.id} className="bg-gray-50 hover:bg-gray-100 p-5 rounded-lg flex justify-between items-center transition-colors">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{provider.provider.name}</h3>
                  <p className="text-gray-500">{provider.provider.phone}</p>
                  <p className="text-gray-500">{provider.provider.bio}</p>
                </div>
                <Link to={`/provider/${provider.provider.id}`} className="text-blue-500 hover:underline">
                  عرض الملف الشخصي
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">ليس لديك أي مقدمي خدمات محفوظين.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      <AppBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {user.role === 'provider' ? renderProviderProfile() : renderSeekerProfile()}
      </main>
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button type="button" className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 text-2xl" onClick={() => setEditOpen(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-center">تعديل البيانات الشخصية</h2>
            {editError && <div className="text-red-500 mb-4 text-center">{editError}</div>}
            <div className="mb-4">
              <label className="block mb-1 font-medium">الاسم</label>
              <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">رقم الهاتف</label>
              <input type="text" name="phone" value={editData.phone} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">الموقع</label>
              <input type="text" name="location" value={editData.location} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">نبذة عنك</label>
              <textarea name="bio" value={editData.bio} onChange={handleEditChange} className="w-full border rounded px-3 py-2" rows={3} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">صورة الملف الشخصي</label>
              <input type="file" name="profile_image" accept="image/*" onChange={handleEditChange} className="w-full" />
            </div>
            <button type="submit" disabled={editLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold flex items-center justify-center">
              <FiUpload className="ml-2" />
              {editLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
