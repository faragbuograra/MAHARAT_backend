import React, { useEffect, useState } from "react";
import fetchData from "../Api/FetchApi";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', phone: '', location: '' });

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData('admin/users', 'GET');
      setUsers(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err?.message || "فشل في جلب المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || '',
      phone: user.phone || '',
      location: user.location || ''
    });
  };

  const handleEditSave = async () => {
    try {
      await fetchData(`admin/users/${editId}`, 'PATCH', JSON.stringify(editForm));
      setEditId(null);
      loadUsers();
    } catch (err) {
      setError(err?.message || "فشل في تعديل المستخدم");
    }
  };

  const handleAdd = async () => {
    try {
      await fetchData('admin/users', 'POST', JSON.stringify(editForm));
      setEditId(null);
      setEditForm({ name: '', email: '', role: '', phone: '', location: '' });
      loadUsers();
    } catch (err) {
      setError(err?.message || "فشل في إضافة المستخدم");
    }
  };

  return (
    <div className="p-4 md:p-6">
        <div className="flex lex items-center justify-between mb-4">
<h1 className="text-2xl font-bold mb-4">إدارة المستخدمين</h1>
       <div className="">
          {editId === null && (
            <button
              onClick={() => setEditId('new')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              إضافة مستخدم جديد
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
              <th className="px-4 py-2 text-right text-sm font-semibold">الاسم</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">البريد الإلكتروني</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الدور</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">رقم الهاتف</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">الموقع</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">تعديل</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">لا توجد بيانات.</td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id ?? idx} className="border-t">
                  <td className="px-4 py-2 text-sm">{user.id ?? idx + 1}</td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <select
                        value={editForm.role}
                        onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
                        className="border rounded p-1 w-full"
                      >
                        <option value="seeker">باحث</option>
                        <option value="provider">مقدم خدمة</option>
                        <option value="admin">مدير</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      user.phone || '-'
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      user.location || '-'
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {editId === user.id ? (
                      <>
                        <button onClick={handleEditSave} className="px-2 py-1 bg-green-500 text-white rounded mr-2">حفظ</button>
                        <button onClick={() => setEditId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">إلغاء</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(user)} className="px-2 py-1 bg-blue-500 text-white rounded">تعديل</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       
        {editId === 'new' && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="font-bold mb-2">إضافة مستخدم جديد</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="الاسم"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                className="border rounded p-2"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={editForm.email}
                onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                className="border rounded p-2"
              />
              <select
                value={editForm.role}
                onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
                className="border rounded p-2"
              >
                <option value="">اختر الدور</option>
                <option value="seeker">باحث</option>
                <option value="provider">مقدم خدمة</option>
                <option value="admin">مدير</option>
              </select>
              <input
                type="text"
                placeholder="رقم الهاتف"
                value={editForm.phone}
                onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="الموقع"
                value={editForm.location}
                onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                className="border rounded p-2"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">حفظ</button>
              <button onClick={() => { setEditId(null); setEditForm({ name: '', email: '', role: '', phone: '', location: '' }); }} className="px-4 py-2 bg-gray-400 text-white rounded">إلغاء</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
