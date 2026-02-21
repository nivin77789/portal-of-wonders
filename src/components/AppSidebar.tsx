import { useNavigate, useLocation } from "react-router-dom";
import {
  MessageCircle, BarChart3, Briefcase, Smile, Heart, Frown,
  UtensilsCrossed, AlertTriangle, Sparkles, HeartPulse, Users,
  Home, X,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle, BarChart3, Briefcase, Smile, Heart, Frown,
  UtensilsCrossed, AlertTriangle, Sparkles, HeartPulse, Users,
};

const menuItems = [
  { name: "Chat", path: "/chat", icon: "MessageCircle" },
  { name: "Dashboard", path: "/dashboard", icon: "BarChart3" },
  { name: "Services", path: "/services", icon: "Briefcase" },
  { name: "Happiness", path: "/happiness", icon: "Smile" },
  { name: "Lust", path: "/lust", icon: "Heart" },
  { name: "Sad", path: "/sad", icon: "Frown" },
  { name: "Craving", path: "/craving", icon: "UtensilsCrossed" },
  { name: "Worried", path: "/worried", icon: "AlertTriangle" },
  { name: "Pleasure", path: "/pleasure", icon: "Sparkles" },
  { name: "Health", path: "/health", icon: "HeartPulse" },
  { name: "Family", path: "/family", icon: "Users" },
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 glass border-r border-white/10 z-50 transform transition-transform duration-300 ease-out custom-scrollbar overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:z-10`}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <button onClick={() => navigate("/home")} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-display font-bold text-sm tracking-wider uppercase">Portal_Nav</span>
          </button>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => { navigate(item.path); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
