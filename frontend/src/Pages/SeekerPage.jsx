import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../componenta/AppBar';
import fetchData from '../Api/FetchApi';
import { FiSearch, FiMapPin, FiStar, FiChevronDown, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';

const getProfileImageUrl = (img) => {
  if (!img) return 'https://randomuser.me/api/portraits/men/32.jpg';
  if (img.startsWith('http')) return img;
  return `/uploads/attachment/${img}`;
};

const SeekerPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    price: '',
    rating: '',
  });
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '', serviceId: null });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [minAvgRating, setMinAvgRating] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [serviceRes, categoryRes] = await Promise.all([
          fetchData('services'),
          fetchData('categories'),
        ]);
        setServices(serviceRes.data || []);
        setCategories(categoryRes.data || []);
      } catch (err) {
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredServices = services.filter(service => {
    const provider = service.provider || {};
    // Calculate average rating from reviews
    const reviews = service.reviews || [];
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;
    return (
      (filters.search === '' || service.title.includes(filters.search) || service.description.includes(filters.search) || provider.name.includes(filters.search)) &&
      (filters.category === '' || service.category_id == filters.category) &&
      (filters.location === '' || provider.location === filters.location) &&
      (minAvgRating === '' || avgRating >= parseFloat(minAvgRating))
    );
  });

  const uniqueLocations = [...new Set(services.map(s => s.provider?.location).filter(Boolean))];

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, i) => (
          <FiStar key={i} className={i < filledStars ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
        ))}
        <span className="text-gray-600 text-sm mr-2">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReviewData(prev => ({ ...prev, rating: newRating }));
  };

  const openReviewModal = (serviceId) => {
    setReviewData({ rating: 0, comment: '', serviceId });
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await fetchData('reviews', 'POST', JSON.stringify({
        service_id: reviewData.serviceId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }));
      toast.success('تم إرسال تقييمك بنجاح!');
      setReviewModalOpen(false);
      setReviewData({ rating: 0, comment: '', serviceId: null });
    } catch (err) {
      toast.error(err.data?.message || 'حدث خطأ أثناء إرسال التقييم');
    } finally {
      setReviewLoading(false);
    }
  };

  const FilterSidebar = () => (
    <aside className="w-full lg:w-1/4 xl:w-1/5 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">تصفية النتائج</h3>
      
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">فئة المهارة</h4>
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center mb-2">
            <input type="checkbox" id={`cat-${cat.id}`} name="category" value={cat.id} onChange={handleFilterChange} className="ml-2" />
            <label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
          </div>
        ))}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">الموقع</h4>
        <select name="location" onChange={handleFilterChange} className="w-full p-2 border rounded-md">
          <option value="">جميع المدن</option>
          {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">نطاق السعر (دينار ليبي)</h4>
        <div className="flex items-center mb-2"><input type="radio" name="price" value="0-50" className="ml-2" /> أقل من 50</div>
        <div className="flex items-center mb-2"><input type="radio" name="price" value="50-100" className="ml-2" /> 50 - 100</div>
        <div className="flex items-center mb-2"><input type="radio" name="price" value="100-200" className="ml-2" /> 100 - 200</div>
        <div className="flex items-center mb-2"><input type="radio" name="price" value="200+" className="ml-2" /> أكثر من 200</div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">متوسط التقييم</h4>
        <select value={minAvgRating} onChange={e => setMinAvgRating(e.target.value)} className="w-full p-2 border rounded-md">
          <option value="">كل التقييمات</option>
          <option value="5">5 نجوم</option>
          <option value="4">4 نجوم فأكثر</option>
          <option value="3">3 نجوم فأكثر</option>
        </select>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">تطبيق الفلاتر</button>
    </aside>
  );

  const ServiceCard = ({ service }) => {
    const provider = service.provider || {};
    const reviews = service.reviews || [];
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;
    const reviewCount = reviews.length;

    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-shadow duration-300">
        <div className="w-full sm:w-48 flex flex-col items-center text-center ">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mb-3"
            src={getProfileImageUrl(provider.profile_image)}
            alt={provider.name}
          />
        </div>
        <div className=" ">
          <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
          <p className="text-blue-600 font-semibold">{service.title}</p>
          <p className="text-gray-500 text-sm flex items-center gap-1/flex-1/6 mt-1">
            <FiMapPin />
            {provider.location}
          </p>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {renderStars(avgRating)}
              <span className="text-sm text-gray-500">({avgRating.toFixed(1)})</span>
              <span className="text-sm text-gray-500">({reviewCount} تقييم)</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-green-600">يبدأ من {service.price} د.ل</span>
            <Link to={`/provider/${provider.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              عرض الملف
            </Link>
            <button onClick={() => openReviewModal(service.id)} className="flex items-center bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
              <FiEdit className="ml-1" /> تقييم الخدمة
            </button>
            {localStorage.getItem('role') === 'seeker' && (
              <Link to={`/chat/${provider.id}`} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                محادثة
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <AppBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">نتائج البحث</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                name="search"
                placeholder="ابحث عن المهارة أو الخدمة..."
                onChange={handleFilterChange}
                className="w-full p-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">بحث</button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          <div className="w-full lg:flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold">تم العثور على {filteredServices.length} مقدم خدمة</p>
              <div className="flex items-center gap-2">
                <span>ترتيب حسب:</span>
                <select className="p-2 border rounded-md">
                  <option>الأعلى تقييماً</option>
                  <option>الأقل سعراً</option>
                  <option>الأعلى سعراً</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-bold py-10">{error}</div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">لا توجد نتائج</h3>
                <p>حاول تغيير كلمات البحث أو تعديل الفلاتر.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>

        {reviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">كتابة تقييم</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">التقييم</label>
                  <div className="flex items-center justify-center text-3xl">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={ratingValue}>
                          <input type="radio" name="rating" value={ratingValue} onClick={() => handleRatingChange(ratingValue)} className="hidden" />
                          <FiStar className={`cursor-pointer ${ratingValue <= reviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="comment" className="block mb-2 font-medium">التعليق</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="اكتب تعليقك هنا..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setReviewModalOpen(false)} className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">
                    إلغاء
                  </button>
                  <button type="submit" disabled={reviewLoading} className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
                    {reviewLoading ? 'جاري الإرسال...' : 'إرسال'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeekerPage;
