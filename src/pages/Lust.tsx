import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, UserCheck, Home, Wine, Flame, Flower2, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import BackgroundOrbs from "@/components/BackgroundOrbs";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, UserCheck, Home, Wine, Flame, Flower2,
};

const lustOptions = [
  { name: "Partners", path: "/partners", iconName: "Heart", color: "text-rose-500" },
  { name: "Colleagues", path: "/colleagues", iconName: "UserCheck", color: "text-blue-500" },
  { name: "Home Service", path: "/home-service", iconName: "Home", color: "text-teal-500" },
  { name: "Pub", path: "/pub", iconName: "Wine", color: "text-amber-500" },
  { name: "Hooked Up", path: "/hookedup", iconName: "Flame", color: "text-orange-500" },
  { name: "Spa", path: "/spa", iconName: "Flower2", color: "text-indigo-500" },
];

const Lust = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigate("/home")} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white/10 transition-colors text-sm font-semibold text-foreground/80 uppercase tracking-wide">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Title */}
      <div className={`flex flex-col items-center gap-5 transition-all duration-700 ${loaded ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}>
        <div className="p-5 rounded-[2rem] glass-card shadow-2xl shadow-accent/15">
          <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-accent drop-shadow-[0_4px_8px_rgba(244,63,94,0.4)]" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black gradient-text-rose text-center tracking-tight pb-2">
          Lust Categories
        </h1>
        <p className="text-muted-foreground text-center max-w-xl text-lg font-medium leading-relaxed px-4">
          Select a category below to explore personalized matches, environments, and immersive experiences tailored just for you.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1200px" }}>
        {lustOptions.map((opt, i) => {
          const Icon = iconMap[opt.iconName];
          return (
            <div
              key={i}
              onClick={() => navigate(opt.path)}
              className={`group relative glass-card p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-accent/40 transform
                ${loaded ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}
              style={{ transitionDelay: `${i * 120}ms`, transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left gap-6">
                <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">
                  {Icon && <Icon className={`w-8 h-8 md:w-10 md:h-10 ${opt.color}`} />}
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {opt.name}
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 border border-white/10">
                      <ChevronRight className="w-5 h-5 text-accent ml-0.5" />
                    </div>
                  </div>
                  <div className="h-1.5 w-0 group-hover:w-1/2 bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500 ease-out" />
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-50 group-hover:scale-150 group-hover:from-accent/10 transition-all duration-700 pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lust;
