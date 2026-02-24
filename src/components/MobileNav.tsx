import { useNavigate, useLocation } from "react-router-dom";
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

export default function MobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#03060d]/95 backdrop-blur-xl border-t border-indigo-500/20 z-[100] overflow-x-auto mobile-nav-scroll pb-safe">
            <div className="flex items-center px-4 py-3 gap-6 w-max mx-auto">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path || (item.path === '/spa' && location.pathname.startsWith('/spa'));
                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer group px-2 min-w-[60px] ${isActive ? 'scale-105' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className={`text-[1.4rem] transition-all transform duration-300 ${isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] -translate-y-1' : 'text-slate-400 group-hover:text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)] group-hover:-translate-y-1'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-[0.6rem] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-indigo-300' : 'text-slate-500 group-hover:text-indigo-300'}`}>
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .mobile-nav-scroll::-webkit-scrollbar { display: none; }
        .mobile-nav-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: calc(1rem + env(safe-area-inset-bottom)); }
        `
            }} />
        </div>
    );
}
