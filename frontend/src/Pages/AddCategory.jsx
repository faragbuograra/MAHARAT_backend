import React, { useState } from "react";
import fetchData from "../Api/FetchApi";

export default function AddCategory() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await fetchData("admin/categories", "POST", JSON.stringify(form));
      setSuccess("تمت إضافة التصنيف بنجاح");
      setForm({ name: "", description: "" });
    } catch (err) {
      setError(err?.message || "فشل في إضافة التصنيف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 ">
      <h1 className="text-2xl font-bold mb-4">إضافة تصنيف جديد</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="rounded-xl p-6">
        <div className="mb-4">
          <label className="block mb-1 font-bold">اسم التصنيف</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">الوصف</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md text-lg"
          disabled={loading}
        >
          {loading ? "جاري الإضافة..." : "إضافة التصنيف"}
        </button>
      </form>
    </div>
  );
}
