import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="bg-blue-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          ابدأ رحلتك مع مهارات اليوم
        </h2>
        <p className="mt-4 text-lg text-blue-200">
          انضم إلى آلاف المستخدمين الذين يثقون في منصتنا
        </p>
        <div className="mt-8 flex justify-center space-x-4 space-x-reverse">
          <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
            سجل كباحث عن خدمة
          </button>
          <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
            سجل كمقدم خدمة
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <CallToAction />
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
            {/* About Section */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">مهارات</h3>
              <p className="text-gray-400">منصة تربط بين أصحاب المهارات والباحثين عن الخدمات في بنغازي.</p>
              <div className="flex justify-end space-x-4 mt-4">
                <Link to="#" className="text-gray-400 hover:text-white">F</Link>
                <Link to="#" className="text-gray-400 hover:text-white">T</Link>
                <Link to="#" className="text-gray-400 hover:text-white">I</Link>
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-8 md:mb-0">
              <h4 className="font-bold mb-4">الخدمات</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">تقنية المعلومات</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">التصميم والإبداع</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">التعليم والتدريب</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">الصيانة والإصلاح</Link></li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="mb-8 md:mb-0">
              <h4 className="font-bold mb-4">الدعم</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">مركز المساعدة</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">اتصل بنا</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">الأسئلة الشائعة</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">شروط الاستخدام</Link></li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-end items-center">
                  info@maharat.ly <span className="ml-2">E</span>
                </li>
                <li className="flex justify-end items-center">
                  +218 91 234 5678 <span className="ml-2">P</span>
                </li>
                <li className="flex justify-end items-center">
                  بنغازي, ليبيا <span className="ml-2">M</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2024 مهارات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
