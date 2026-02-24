import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, Settings, User } from "lucide-react";
import {
  FaChartBar, FaHome, FaKissWinkHeart, FaUtensils,
  FaHeartbeat, FaUsers
} from "react-icons/fa";
import AppSidebar from "./AppSidebar";
import BackgroundOrbs from "./BackgroundOrbs";
import MobileNav from "./MobileNav";
import ChatWidget from "./ChatWidget";



const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#03060d] relative selection:bg-indigo-500/30">
      <BackgroundOrbs />

      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-[60] glass border-b border-indigo-500/10 px-4 md:px-8 py-3 flex items-center justify-between backdrop-blur-2xl lg:pl-[300px]">
        <div className="flex items-center gap-4 lg:gap-10">
          <button onClick={() => navigate("/home")} className="flex items-center gap-3 group transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-accent flex items-center justify-center text-xs font-bold text-white overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-all">
              <img src="/nivin.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="font-display font-black text-sm tracking-[1px] uppercase text-white group-hover:text-indigo-300 transition-colors sm:hidden">My Psych's</span>
              <span className="font-display font-black text-sm tracking-[2px] uppercase text-white group-hover:text-indigo-300 transition-colors hidden sm:block">Portal_of_Nav</span>
              <span className="text-[0.6rem] font-bold text-indigo-500/70 tracking-widest uppercase">Premium Access</span>
            </div>
          </button>

          {/* Navigation Links removed for desktop fixed sidebar */}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><LogOut className="w-4 h-4" /></button>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative z-10 min-w-0">
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24 lg:pb-12 max-w-[1600px] mx-auto w-full transition-all lg:pl-[300px]">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <ChatWidget />
    </div>
  );
};

export default AppLayout;
