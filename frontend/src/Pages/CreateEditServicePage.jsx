import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppBar from '../componenta/AppBar';
import fetchData from '../Api/FetchApi';
import { FiSave } from 'react-icons/fi';

const CreateEditServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    location: '',
    images: '', // for filename or File
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = id !== undefined;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchData('categories');
        setCategories(categoriesData.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();

    if (isEditMode) {
      setLoading(true);
      const fetchService = async () => {
        try {
          const serviceData = await fetchData(`services/${id}`);
          setService(serviceData);
        } catch (err) {
          setError('Failed to fetch service details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setService(prev => ({ ...prev, images: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setService(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isEditMode ? `services/${id}` : 'services';
    const method = isEditMode ? 'PATCH' : 'POST';

    try {
      let payload;
      let sendAsForm = service.images && service.images instanceof File;
      if (sendAsForm) {
        payload = new FormData();
        payload.append('title', service.title);
        payload.append('description', service.description);
        payload.append('price', service.price);
        payload.append('category_id', service.category_id);
        payload.append('location', service.location);
        payload.append('attachment', service.images);
      } else {
        payload = JSON.stringify({ ...service, images: typeof service.images === 'string' ? service.images : '' });
      }
      await fetchData(endpoint, method, payload);
      navigate('/profile');
    } catch (err) {
      setError('Failed to save the service. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      <AppBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isEditMode ? 'تعديل الخدمة' : 'إنشاء خدمة جديدة'}
          </h1>
          
          {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان الخدمة</label>
              <input
                type="text"
                name="title"
                id="title"
                value={service.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">وصف الخدمة</label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={service.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر (د.ل)</label>
              <input
                type="number"
                name="price"
                id="price"
                value={service.price}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">الفئة</label>
              <select
                name="category_id"
                id="category_id"
                value={service.category_id}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">اختر فئة</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">الموقع</label>
              <input
                type="text"
                name="location"
                id="location"
                value={service.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">صورة الخدمة</label>
              <input
                type="file"
                name="images"
                id="images"
               
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {imagePreview && (
                <img src={imagePreview} alt="preview" className="w-24 h-24 object-cover rounded border mt-2" />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                <FiSave className="mr-2" />
                {loading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEditServicePage;
