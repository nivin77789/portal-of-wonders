import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import BackgroundOrbs from "./BackgroundOrbs";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background relative">
      <BackgroundOrbs />
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 relative z-10 min-w-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 lg:hidden glass border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground p-2 rounded-xl hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <button onClick={() => navigate("/home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              NM
            </div>
          </button>
        </header>

        <main className="p-4 md:p-8 pb-safe">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
