import { MoreVertical, ChevronLast, ChevronFirst ,LayoutDashboard,Phone, MessageSquare, Send, BotMessageSquare, Bot, Hotel, Banknote, Users  } from "lucide-react"
import { useContext, createContext } from "react"
import { Link, useLocation } from "react-router-dom"
// import { t, getLang } from "../i18n"; // <-- import i18n
import React from "react"
const SidebarContext = createContext()

export default function Sidebar({ children, open = false, onToggle }) {

  const expanded = open;
  const location = useLocation();
  const lang ="ar";
  const isRTL = lang === "ar";

  return (
    <aside
      className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-screen transition-all duration-300 z-30 ${expanded ? 'w-64' : 'w-16'}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg bg-gray-50  hover:bg-gray-100 "
          >
            {!expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        
      
        <SidebarContext.Provider value={{ expanded }}>
          <SidebarItem icon={<LayoutDashboard size={20} />} text={"لوحة التحكم"} to="/admin/" active={location.pathname === "/admin/"} />
          <SidebarItem icon={<MessageSquare size={20} />} text={"قائمة التصنيفات"} to="/admin/Categories" active={location.pathname === "/admin/Categories"} />
        
          <SidebarItem icon={<Users size={20} />} text={"قائمة المستخدمين"} to="/admin/users" active={location.pathname === "/admin/users"} />
          <SidebarItem icon={<Banknote size={20} />} text={"إدارة الخدمات"} to="/admin/services" active={location.pathname === "/admin/services"} />
          {/* <SidebarItem icon={<Phone size={20} />} text={t("session")} to="/admin/session" active={location.pathname === "/admin/session"} />
          <SidebarItem icon={<MessageSquare size={20} />} text={t("chat")} to="/admin/chat" active={location.pathname === "/admin/chat"} />
          <SidebarItem icon={<Bot  size={20} />} text={t("auto-reply")} to="/admin/auto-reply" active={location.pathname === "/admin/auto-reply"} />
          <SidebarItem icon={<Send size={20} />} text={t("send-message")} to="/admin/send-message" active={location.pathname === "/admin/send-message"} />
          <SidebarItem icon={<Hotel  size={20} />} text={t("client")} to="/admin/client" active={location.pathname === "/admin/client"} />
          <SidebarItem icon={<BotMessageSquare  size={20} />} text={t("groups")} to="/admin/groups" active={location.pathname === "/admin/groups"} />
          <SidebarItem icon={<Banknote  size={20} />} text={t("payment")} to="/admin/payment" active={location.pathname === "/admin/payment"} /> */}

         {/* <SidebarItem icon={<MoreVertical size={20} />} text={"api-docs"} to="/admin/api-docs" active={location.pathname === "/admin/more"} />
          <ul className="flex-1 px-3 ">{children}</ul> */}
           <ul className="flex-1 px-3 ">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={"https://ui-avatars.com/api/?background=2446ed&name="+ localStorage.getItem('user')?.username}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 mx-3" : "w-0"} "
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold ">{
                localStorage.getItem("user")?.name
                }</h4>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                تواصل علي 0917667647
                </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <Link to={to || "#"} className="">
      <li
        className={`
          relative flex items-center my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
          }
          ${expanded ? "py-2 px-3" : "py-2 px-1 justify-center"}
          h-12
        `}
        style={{
          minHeight: expanded ? "48px" : "48px",
          height: "48px",
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 mx-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  )
}
<ul>
  {/* ...existing links... */}
  <li>
   
  </li>
  {/* ...existing links... */}
</ul>