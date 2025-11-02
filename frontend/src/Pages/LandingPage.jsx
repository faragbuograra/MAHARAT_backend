import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProviders from '../componenta/FeaturedProviders';
import Footer from '../componenta/Footer';
import AppBar from '../componenta/AppBar';

const LandingPage = () => {
  return (
    <div className="bg-white">
      <AppBar />

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-right">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">مقدمي الخدمات</span>
                  <span className="block text-blue-600">اربط مع الأفضل في بنغازي</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  منصة مهارات تجمع بين أصحاب المهارات المحترفين والباحثين عن الخدمات في مدينة بنغازي. احصل على الخدمة التي تحتاجها بسهولة وثقة.
                </p>
                <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="relative rounded-md shadow-sm w-full max-w-md">
                    <input
                      type="text"
                      className="form-input py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                      placeholder="ابحث عن الخدمة التي تحتاجها..."
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                 <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
                    <button className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        ابحث عن خدمة
                    </button>
                    <button className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                        + قدم خدماتك
                    </button>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <img className="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Team working" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">فئات الخدمات المتاحة</h2>
              <p className="mt-4 text-lg text-gray-500">اكتشف مجموعة واسعة من الخدمات المهنية في بنغازي</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-orange-100 rounded-lg shadow-lg p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white mx-auto">
                  {/* Icon */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">الصيانة والإصلاح</h3>
                <p className="mt-2 text-base text-gray-500">صيانة المنازل، السيارات، والأجهزة</p>
              </div>
              <div className="bg-green-100 rounded-lg shadow-lg p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  {/* Icon */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">التعليم والتدريب</h3>
                <p className="mt-2 text-base text-gray-500">دروس خصوصية، تدريب مهني، وتطوير المهارات</p>
              </div>
              <div className="bg-purple-100 rounded-lg shadow-lg p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  {/* Icon */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">التصميم والإبداع</h3>
                <p className="mt-2 text-base text-gray-500">التصميم الجرافيكي، الهوية البصرية، والفنون</p>
              </div>
              <div className="bg-blue-100 rounded-lg shadow-lg p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  {/* Icon */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">تقنية المعلومات</h3>
                <p className="mt-2 text-base text-gray-500">تطوير المواقع، التطبيقات، والدعم التقني</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works Section */}
        <div className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">كيف تعمل المنصة؟</h2>
              <p className="mt-4 text-lg text-gray-500">خطوات بسيطة للحصول على الخدمة المناسبة</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-2xl mx-auto">1</div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">ابحث عن الخدمة</h3>
                <p className="mt-2 text-base text-gray-500">استخدم شريط البحث أو تصفح الفئات للعثور على الخدمة المطلوبة.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-2xl mx-auto">2</div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">اختر مقدم الخدمة</h3>
                <p className="mt-2 text-base text-gray-500">قارن بين مقدمي الخدمات واطلع على تقييماتهم وأعمالهم السابقة.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white font-bold text-2xl mx-auto">3</div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">احصل على الخدمة</h3>
                <p className="mt-2 text-base text-gray-500">تواصل مباشرة مع مقدم الخدمة واحصل على ما تحتاجه بجودة عالية.</p>
              </div>
            </div>
          </div>
        </div>

        <FeaturedProviders />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
