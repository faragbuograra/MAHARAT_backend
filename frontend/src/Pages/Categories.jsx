
import React, { useEffect, useState } from "react";
import fetchData from "../Api/FetchApi";
import { useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
const navigate = useNavigate();
  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData('admin/categories', 'GET');
      setCategories(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err?.message || "فشل في جلب التصنيفات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setEditForm({ name: cat.name, description: cat.description || '' });
  };

  const handleEditSave = async () => {
    try {
      await fetchData(`admin/categories/${editId}`, 'PATCH', JSON.stringify(editForm));
      setEditId(null);
      loadCategories();
    } catch (err) {
      setError(err?.message || "فشل في تعديل التصنيف");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">قائمة التصنيفات</h1>
        <div className="">
          <button
            onClick={() => navigate('/admin/categories/add')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            إضافة تصنيف جديد
          </button>
        </div>

      </div>
   
      {loading && <div>جاري التحميل...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-right text-sm font-semibold">#</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">الاسم</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">الوصف</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">لا توجد بيانات.</td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr key={cat.id ?? idx} className="border-t">
                    <td className="px-4 py-2 text-sm">{cat.id ?? idx + 1}</td>
                    <td className="px-4 py-2 text-sm">
                      {editId === cat.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {editId === cat.id ? (
                        <input
                          type="text"
                          value={editForm.description}
                          onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        cat.description || '-'
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {editId === cat.id ? (
                        <>
                          <button onClick={handleEditSave} className="px-2 py-1 bg-green-500 text-white rounded mr-2">حفظ</button>
                          <button onClick={() => setEditId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">إلغاء</button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(cat)} className="px-2 py-1 bg-blue-500 text-white rounded">تعديل</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
}
