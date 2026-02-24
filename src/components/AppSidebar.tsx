import { useNavigate, useLocation } from "react-router-dom";
import { X, LogOut, Settings, ChevronRight } from "lucide-react";
import {
  FaChartBar, FaHome, FaSmile,
  FaKissWinkHeart, FaUtensils,
  FaHeartbeat, FaUsers
} from "react-icons/fa";

export const menuItems = [
  { name: "Dashboard", path: "/spa", icon: <FaChartBar /> },
  { name: "Home", path: "/home", icon: <FaHome /> },
  { name: "Happiness", path: "/happiness", icon: <FaSmile /> },
  { name: "Lust", path: "/lust", icon: <FaKissWinkHeart /> },
  { name: "Craving", path: "/craving", icon: <FaUtensils /> },
  { name: "Health", path: "/health", icon: <FaHeartbeat /> },
  { name: "Family", path: "/family", icon: <FaUsers /> },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#03060d]/90 backdrop-blur-2xl border-r border-indigo-500/10 z-[80] transform transition-all duration-500 ease-in-out custom-scrollbar overflow-y-auto
          ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0"} 
          shadow-[20px_0_40px_rgba(0,0,0,0.4)] md:shadow-none`}
      >
        <div className="p-8 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-end mb-12">
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <div className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-[3px] mb-4 ml-4">Main Navigation</div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/spa' && location.pathname.startsWith('/spa'));
              return (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.path); onClose(); }}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[0.7rem] font-bold uppercase tracking-[2px] transition-all duration-300 group
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-indigo-500/5 text-indigo-300 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)] scale-[1.02]"
                      : "text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[1.3rem] transition-all duration-300 ${isActive ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] rotate-[-5deg]" : "group-hover:scale-110"}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />}
                  {!isActive && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />}
                </button>
              );
            })}
          </nav>

          {/* Footer Card */}
          <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-accent/5 border border-indigo-500/10 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="absolute top-[-20%] right-[-20%] w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all" />
            <div className="relative z-10">
              <p className="text-[0.6rem] font-bold text-indigo-400 uppercase tracking-widest mb-1">Current Session</p>
              <p className="text-white text-xs font-bold truncate">Premium User Mode</p>
              <div className="flex gap-2 mt-4">
                <button className="p-2 bg-white/5 hover:bg-indigo-500/20 rounded-lg text-slate-400 hover:text-white transition-all"><Settings className="w-4 h-4" /></button>
                <button className="p-2 bg-white/5 hover:bg-rose-500/20 rounded-lg text-slate-400 hover:text-rose-400 transition-all"><LogOut className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
