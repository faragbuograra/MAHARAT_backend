import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppBar from '../componenta/AppBar';
import fetchData from '../Api/FetchApi';
import { FiMapPin, FiStar, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const getProfileImageUrl = (img) => {
  if (!img) return 'https://randomuser.me/api/portraits/men/32.jpg';
  if (img.startsWith('http')) return img;
  return `/uploads/attachment/${img}`;
};

const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, i) => (
          <FiStar key={i} className={i < filledStars ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
        ))}
      </div>
    );
};

const ProviderProfilePage = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProvider = async () => {
      try {
        setLoading(true);
        const response = await fetchData(`admin/users/${id}`);
        setProvider(response);
      } catch (err) {
        setError('حدث خطأ أثناء جلب بيانات مقدم الخدمة');
      } finally {
        setLoading(false);
      }
    };
    getProvider();
  }, [id]);

  const handleSaveProvider = async () => {
    try {
      await fetchData('saved_list', 'POST', JSON.stringify({ provider_id: id }));
      toast.success('تم حفظ مقدم الخدمة بنجاح!');
    } catch (err) {
      toast.error(err.data?.message || 'حدث خطأ ما');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-red-600">{error || 'لم يتم العثور على مقدم الخدمة.'}</h2>
        <Link to="/seekers" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          العودة إلى البحث
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      <AppBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 md:space-x-reverse mb-8">
            <img className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" src={getProfileImageUrl(provider.profile_image)} alt={provider.name} />
            <div className="text-center md:text-right mt-4 md:mt-0 flex-1">
              <h1 className="text-4xl font-bold text-gray-800">{provider.name}</h1>
              <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start gap-2">
                <FiMapPin /> {provider.location}
              </p>
              {provider.rating && (
                <div className="flex items-center justify-center md:justify-start mt-2">
                  {renderStars(provider.rating)}
                  <span className="font-bold ml-2 text-gray-700">{provider.rating}</span>
                  <span className="text-gray-500 ml-2">({provider.reviews || 0} تقييم)</span>
                </div>
              )}
            </div>
            <button onClick={handleSaveProvider} className="mt-4 md:mt-0 flex items-center bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition-colors">
              <FiHeart className="mr-2" />
              حفظ
            </button>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">نبذة عني</h3>
            <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">خدماتي</h2>
            {provider.services && provider.services.length > 0 ? (
              <div className="space-y-4">
                {provider.services.map(service => (
                  <div key={service.id} className="bg-gray-50 hover:bg-gray-100 p-5 rounded-lg flex justify-between items-center transition-colors">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
                      <p className="text-green-600 font-bold">{service.price} د.ل</p>
                    </div>
                    <Link to={`/service/${service.id}`} className="text-blue-500 hover:underline">
                      عرض تفاصيل الخدمة
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">لا توجد خدمات متاحة من هذا المقدم.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfilePage;
