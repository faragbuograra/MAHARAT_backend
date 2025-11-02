import React from 'react';

const providers = [
  {
    name: 'أحمد الليبي',
    title: 'مطور مواقع',
    rating: 5,
    reviews: 24,
    description: 'متخصص في تطوير المواقع الإلكترونية والتطبيقات بأحدث التقنيات',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'فاطمة محمد',
    title: 'مصممة جرافيك',
    rating: 4,
    reviews: 18,
    description: 'خبيرة في التصميم الجرافيكي والهوية البصرية للشركات والمؤسسات',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'محمد العربي',
    title: 'فني صيانة',
    rating: 5,
    reviews: 31,
    description: 'متخصص في صيانة وإصلاح الأجهزة المنزلية والكهربائية',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
];

const FeaturedProviders = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">مقدمو خدمات مميزون</h2>
          <p className="mt-4 text-lg text-gray-500">تعرف على أفضل المحترفين في بنغازي</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img className="w-24 h-24 rounded-full mx-auto mb-4" src={provider.image} alt={provider.name} />
              <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
              <p className="text-gray-500">{provider.title}</p>
              <div className="flex justify-center items-center my-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < provider.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 ml-2">({provider.reviews} تقييم)</span>
              </div>
              <p className="text-gray-600 my-4">{provider.description}</p>
              <button className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                عرض الملف الشخصي
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProviders;
