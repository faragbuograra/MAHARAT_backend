import React, { useEffect, useState } from "react";
import fetchData, { BASE_URL } from "../Api/FetchApi";

export default function ServicesManagement() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    provider_id: '',
    category_id: '',
    title: '',
    description: '',
    price: '',
    location: '',
    images: '', // filename string
    status: 'active',
  });

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData('admin/services', 'GET');
      setServices(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err?.message || "فشل في جلب الخدمات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
    // Load categories for select
    (async () => {
      try {
        const data = await fetchData('admin/categories', 'GET');
        setCategories(Array.isArray(data) ? data : data?.data || []);
      } catch {}
    })();
  }, []);

  const handleEdit = (service) => {
    setEditId(service.id);
    setEditForm({
      provider_id: service.provider_id || '',
      category_id: service.category_id || '',
      title: service.title || '',
      description: service.description || '',
      price: service.price || '',
      location: service.location || '',
      images: Array.isArray(service.images) ? service.images[0] : service.images || '',
      status: service.status || 'active',
    });
  };

   const handleEditSave = async () => {
     try {
       let body = { ...editForm };
       // If a new image is selected, upload and replace
       if (editForm.images && editForm.images instanceof File) {
         const formData = new FormData();
         formData.append('attachment', editForm.images);
         // Add other fields to formData
         Object.entries(editForm).forEach(([key, value]) => {
           if (key !== 'images') formData.append(key, value);
         });
         await fetchData(`admin/services/${editId}`, 'PATCH', formData);
       } else {
         // If not, keep the old image filename as a string
         body.images = typeof body.images === 'string' ? body.images : '';
         await fetchData(`admin/services/${editId}`, 'PATCH', JSON.stringify(body));
       }
       setEditId(null);
       loadServices();
     } catch (err) {
       setError(err?.message || "فشل في تعديل الخدمة");
     }
   };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('provider_id', editForm.provider_id);
      formData.append('category_id', editForm.category_id);
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      formData.append('price', editForm.price);
      formData.append('location', editForm.location);
      formData.append('status', editForm.status);
      if (editForm.images && editForm.images instanceof File) {
        formData.append('attachment', editForm.images);
      }
      await fetchData('admin/services', 'POST', formData);
      setEditId(null);
      setEditForm({ provider_id: '', category_id: '', title: '', description: '', price: '', location: '', images: '', status: 'active' });
      loadServices();
    } catch (err) {
      setError(err?.message || "فشل في إضافة الخدمة");
    }
  };

  return (
    <div className="p-4 md:p-6">
        <div className="flex justify-between items-center m-1"> 
     <h1 className="text-2xl font-bold mb-4">إدارة الخدمات</h1>
     <div className=" flex justify-end">
          {editId === null && (
            <button
              onClick={() => setEditId('new')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              إضافة خدمة جديدة
            </button>
          )}
        </div>
        </div>
 
      {loading && <div>جاري التحميل...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-semibold">#</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">المزود</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">التصنيف</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">العنوان</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الوصف</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">السعر</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الموقع</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الصور</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الحالة</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">تعديل</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">لا توجد بيانات.</td>
              </tr>
            ) : (
              services.map((service, idx) => (
                <tr key={service.id ?? idx} className="border-t">
                  <td className="px-4 py-2 text-sm">{service.id ?? idx + 1}</td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="text" value={editForm.provider_id} onChange={e => setEditForm(f => ({ ...f, provider_id: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.provider_id || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="text" value={editForm.category_id} onChange={e => setEditForm(f => ({ ...f, category_id: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.category_id || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.title || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="text" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.description || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="number" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.price || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <input type="text" value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} className="border rounded p-1 w-full" />
                  ) : (service.location || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files[0];
                          setEditForm(f => ({ ...f, images: file }));
                        }}
                        className="border rounded p-1 w-full"
                      />
                      {editForm.images && editForm.images instanceof File && (
                        <img
                          src={URL.createObjectURL(editForm.images)}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                      {editForm.images && typeof editForm.images === 'string' && editForm.images !== '' && (
                        <img
                          src={`${BASE_URL}/uploads/attachment/${editForm.images}`.replaceAll('/api/v1', '')}
                          alt={service.title}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                    </div>
                  ) : (
                    <img src={`${BASE_URL}/uploads/attachment/${service.images}`.replaceAll('/api/v1', '')} alt={service.title} className="w-16 h-16 object-cover" />
                  )}</td>
                  

           
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="border rounded p-1 w-full">
                      <option value="active">نشط</option>
                      <option value="pending">معلق</option>
                      <option value="removed">محذوف</option>
                    </select>
                  ) : (service.status || '-')}
                  </td>
                  <td className="px-4 py-2 text-sm">{editId === service.id ? (
                    <>
                      <button onClick={handleEditSave} className="px-2 py-1 bg-green-500 text-white rounded mr-2">حفظ</button>
                      <button onClick={() => setEditId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">إلغاء</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(service)} className="px-2 py-1 bg-blue-500 text-white rounded">تعديل</button>
                  )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {editId === 'new' && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="font-bold mb-2">إضافة خدمة جديدة</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="معرف المزود" value={editForm.provider_id} onChange={e => setEditForm(f => ({ ...f, provider_id: e.target.value }))} className="border rounded p-2" />
              <select value={editForm.category_id} onChange={e => setEditForm(f => ({ ...f, category_id: e.target.value }))} className="border rounded p-2">
                <option value="">اختر التصنيف</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input type="text" placeholder="العنوان" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="border rounded p-2" />
              <input type="text" placeholder="الوصف" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} className="border rounded p-2" />
              <input type="number" placeholder="السعر" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} className="border rounded p-2" />
              <input type="text" placeholder="الموقع" value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} className="border rounded p-2" />
              <div className="flex flex-col gap-1">
                <input type="file" accept="image/*" onChange={e => setEditForm(f => ({ ...f, images: e.target.files[0] }))} className="border rounded p-2" />
                {editForm.images && editForm.images instanceof File && (
                  <img src={URL.createObjectURL(editForm.images)} alt="preview" className="w-16 h-16 object-cover rounded border mt-1" />
                )}
              </div>
              <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="border rounded p-2">
                <option value="active">نشط</option>
                <option value="pending">معلق</option>
                <option value="removed">محذوف</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">حفظ</button>
              <button onClick={() => { setEditId(null); setEditForm({ provider_id: '', category_id: '', title: '', description: '', price: '', location: '', images: '', status: 'active' }); }} className="px-4 py-2 bg-gray-400 text-white rounded">إلغاء</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
