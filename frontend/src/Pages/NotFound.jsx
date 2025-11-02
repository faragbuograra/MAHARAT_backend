import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="p-6 flex items-center justify-center">
      <div className="bg-white border rounded-xl shadow p-8 text-center max-w-lg w-full">
        <div className="text-6xl font-extrabold text-indigo-600 mb-2">404</div>
        <h1 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h1>
        <p className="text-gray-600 mb-6">يبدو أنك وصلت إلى رابط غير صحيح أو أن الصفحة قد تمت إزالتها.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border bg-white hover:bg-gray-50"
          >
            رجوع
          </button>
          <Link
            to="/admin"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
