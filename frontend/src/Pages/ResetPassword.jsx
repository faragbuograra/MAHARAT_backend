import React, { useState } from 'react';
import fetchData from '../Api/FetchApi';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current_password || !form.password || !form.password_confirmation) {
      return;
    }
    if (form.password !== form.password_confirmation) {
      // FetchApi shows toasts; here we simply block submit when mismatch
      alert('كلمات المرور غير متطابقة');
      return;
    }
    try {
      setLoading(true);
      await fetchData(
        'auth/password',
        'POST',
        JSON.stringify({
          current_password: form.current_password,
          password: form.password,
          password_confirmation: form.password_confirmation,
        })
      );
      setForm({ current_password: '', password: '', password_confirmation: '' });
      navigate('/admin');
    } catch (err) {
      // Errors are handled via toasts in fetchData
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ">
      <div className=" mx-auto bg-white">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-[#2446ed]">تغيير كلمة المرور</h1>
          <p className="text-sm text-gray-500 mt-1">قم بتحديث كلمة المرور الخاصة بك بأمان.</p>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">كلمة المرور الحالية</label>
            <input
              type="password"
              name="current_password"
              value={form.current_password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="********"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور الجديدة</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="********"
                minLength={6}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">تأكيد كلمة المرور</label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="********"
                minLength={6}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
           
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md border bg-gray-50 hover:bg-gray-100"
            >
              إلغاء
            </button>
             <button
              type="submit"
              disabled={loading}
              className="bg-[#2446ed] text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
