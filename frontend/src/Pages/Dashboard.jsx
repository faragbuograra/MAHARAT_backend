import React from "react";

// Example statistics data (replace with API call in production)
const statistics = {
  usersCount: 4,
  providersCount: 1,
  seekersCount: 2,
  servicesCount: 6,
  messagesCount: 82,
  reviewsCount: 4,
  latestUsers: [
    {
      id: 5,
      name: "3",
      email: "a111a@a.com",
      role: "seeker",
      location: "a",
      phone: "a",
      bio: "a",
      profile_image: null,
      status: "active",
      created_at: "2025-10-28T11:43:20.572Z",
      updated_at: "2025-10-28T11:43:20.572Z"
    },
    {
      id: 4,
      name: "aa",
      email: "a1@a.com",
      role: "seeker",
      location: "a",
      phone: "a",
      bio: "a",
      profile_image: null,
      status: "active",
      created_at: "2025-10-20T08:32:14.268Z",
      updated_at: "2025-10-20T08:32:14.268Z"
    },
    {
      id: 3,
      name: "qqqq",
      email: "aa@a.com",
      role: "provider",
      location: "12",
      phone: "12",
      bio: "12",
      profile_image: "attachment_1760961947598_209623054.jpeg",
      status: "active",
      created_at: "2025-10-20T08:27:32.771Z",
      updated_at: "2025-10-20T12:05:47.643Z"
    },
    {
      id: 2,
      name: "farag",
      email: "a@a.com",
      role: "admin",
      location: "q",
      phone: "",
      bio: null,
      profile_image: null,
      status: "active",
      created_at: "2025-10-20T08:24:01.896Z",
      updated_at: "2025-10-20T09:30:15.972Z"
    }
  ],
  topProviders: [
    {
      id: 3,
      name: "qqqq",
      serviceCount: "2"
    }
  ],
  latestServices: [
    {
      id: 7,
      provider_id: 3,
      category_id: 2,
      title: "تجاره",
      description: "تجاره",
      price: "20000.00",
      location: "فويهات",
      images: null,
      status: "active",
      created_at: "2025-10-20T11:15:27.474Z",
      updated_at: "2025-10-20T11:15:27.474Z"
    },
    {
      id: 6,
      provider_id: 2,
      category_id: 1,
      title: "122",
      description: "12",
      price: "12121.00",
      location: "12",
      images: "attachment_1760954728062_286170109.jpeg",
      status: "active",
      created_at: "2025-10-20T10:05:28.099Z",
      updated_at: "2025-10-20T10:05:28.099Z"
    },
    {
      id: 5,
      provider_id: 2,
      category_id: 1,
      title: "12",
      description: "1212",
      price: "123123.00",
      location: "3123",
      images: "{\"attachment_1760954691087_976513199.jpg\"}",
      status: "active",
      created_at: "2025-10-20T10:04:51.090Z",
      updated_at: "2025-10-20T10:04:51.090Z"
    },
    {
      id: 4,
      provider_id: 2,
      category_id: 1,
      title: "12",
      description: "12",
      price: "212.00",
      location: "12",
      images: "{\"attachment_1760954622577_416592056.jpg\"}",
      status: "active",
      created_at: "2025-10-20T10:03:42.586Z",
      updated_at: "2025-10-20T10:05:37.293Z"
    },
    {
      id: 3,
      provider_id: 2,
      category_id: 1,
      title: "12",
      description: "12",
      price: "212.00",
      location: "12",
      images: "attachment_1760953941383_357745938.jpg",
      status: "pending",
      created_at: "2025-10-20T09:52:21.422Z",
      updated_at: "2025-10-20T09:53:42.172Z"
    }
  ],
  latestMessages: [
    {
      id: 82,
      sender_id: 3,
      receiver_id: 3,
      content: "farag",
      read_status: false,
      created_at: "2025-10-28T12:02:09.534Z",
      updated_at: "2025-10-28T12:02:09.534Z"
    },
    {
      id: 81,
      sender_id: 3,
      receiver_id: 5,
      content: "adasdad",
      read_status: false,
      created_at: "2025-10-28T11:57:12.338Z",
      updated_at: "2025-10-28T11:57:12.338Z"
    },
    {
      id: 80,
      sender_id: 5,
      receiver_id: 3,
      content: "sadsad",
      read_status: false,
      created_at: "2025-10-28T11:57:09.681Z",
      updated_at: "2025-10-28T11:57:09.681Z"
    },
    {
      id: 79,
      sender_id: 3,
      receiver_id: 5,
      content: "wr",
      read_status: false,
      created_at: "2025-10-28T11:57:04.201Z",
      updated_at: "2025-10-28T11:57:04.201Z"
    },
    {
      id: 78,
      sender_id: 5,
      receiver_id: 4,
      content: "qq",
      read_status: false,
      created_at: "2025-10-28T11:57:02.145Z",
      updated_at: "2025-10-28T11:57:02.145Z"
    }
  ]
};

const kpiCards = [
  { label: "عدد المستخدمين", value: statistics.usersCount, icon: "👤" },
  { label: "عدد مقدمي الخدمات", value: statistics.providersCount, icon: "🧑‍💼" },
  { label: "عدد الباحثين", value: statistics.seekersCount, icon: "🔎" },
  { label: "عدد الخدمات", value: statistics.servicesCount, icon: "🛠️" },
  { label: "عدد الرسائل", value: statistics.messagesCount, icon: "✉️" },
  { label: "عدد التقييمات", value: statistics.reviewsCount, icon: "⭐" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">لوحة إحصائيات النظام</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpiCards.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-sm font-semibold">{kpi.label}</span>
              <span className="text-2xl">{kpi.icon}</span>
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Latest Users & Top Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Latest Users */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <span className="font-bold text-lg mb-4">أحدث المستخدمين</span>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">الاسم</th>
                  <th className="p-2">البريد الإلكتروني</th>
                  <th className="p-2">الدور</th>
                  <th className="p-2">الحالة</th>
                  <th className="p-2">تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody>
                {statistics.latestUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2 font-semibold flex items-center gap-2">
                      {user.profile_image ? (
                        <img src={user.profile_image.startsWith('attachment_') ? `/uploads/attachment/${user.profile_image}` : user.profile_image} alt="" className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <span className="inline-block w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">👤</span>
                      )}
                      {user.name}
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
                    </td>
                    <td className="p-2">{user.created_at.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Providers */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <span className="font-bold text-lg mb-4">أفضل مقدمي الخدمات</span>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">الاسم</th>
                  <th className="p-2">عدد الخدمات</th>
                </tr>
              </thead>
              <tbody>
                {statistics.topProviders.map((provider) => (
                  <tr key={provider.id} className="border-b">
                    <td className="p-2 font-semibold">{provider.name}</td>
                    <td className="p-2">{provider.serviceCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Services & Latest Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Services */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <span className="font-bold text-lg mb-4">أحدث الخدمات</span>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">العنوان</th>
                  <th className="p-2">الوصف</th>
                  <th className="p-2">السعر</th>
                  <th className="p-2">الموقع</th>
                  <th className="p-2">الحالة</th>
                  <th className="p-2">تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody>
                {statistics.latestServices.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="p-2 font-semibold">{service.title}</td>
                    <td className="p-2">{service.description}</td>
                    <td className="p-2">{service.price}</td>
                    <td className="p-2">{service.location}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${service.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{service.status}</span>
                    </td>
                    <td className="p-2">{service.created_at.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Messages */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <span className="font-bold text-lg mb-4">أحدث الرسائل</span>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">المحتوى</th>
                  <th className="p-2">تاريخ الإرسال</th>
                  <th className="p-2">حالة القراءة</th>
                </tr>
              </thead>
              <tbody>
                {statistics.latestMessages.map((msg) => (
                  <tr key={msg.id} className="border-b">
                    <td className="p-2">{msg.content}</td>
                    <td className="p-2">{msg.created_at.split('T')[0]}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${msg.read_status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{msg.read_status ? 'مقروء' : 'غير مقروء'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}