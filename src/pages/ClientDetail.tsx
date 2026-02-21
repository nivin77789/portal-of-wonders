import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Heart, Shield, Brain, Eye, Activity, CalendarCheck, DollarSign, Users, Flower2 } from "lucide-react";
import { generateClients, type ClientData } from "@/data/spa-clients";
import { useMemo } from "react";

const ClientDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const allClients = useMemo(() => generateClients(), []);
  const user: ClientData | undefined = (location.state as { user?: ClientData })?.user ?? allClients.find(c => c.id === Number(id));

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-10 text-center">
          <h2 className="text-xl font-display font-bold text-foreground mb-2">Client not found</h2>
          <button onClick={() => navigate("/spa")} className="text-primary hover:underline">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate("/spa")} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white/10 transition-colors text-sm font-semibold text-foreground/80 uppercase tracking-wide">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-bl-[80px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent p-[3px] shrink-0">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a1f3a&color=fff&size=128`} alt={user.name} className="w-full h-full rounded-full border-2 border-card" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-display font-bold gradient-text">{user.name}</h1>
            <p className="text-muted-foreground text-sm">Client ID: #{user.id.toString().padStart(4, "0")}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<CalendarCheck className="w-4 h-4 text-primary" />} label="Total Visits" value={String(user.totalVisit)} />
        <StatCard icon={<DollarSign className="w-4 h-4 text-emerald-400" />} label="Total Spend" value={user.totalSpend} />
        <StatCard icon={<Activity className="w-4 h-4 text-amber-400" />} label="Satisfaction" value={user.satisfaction} />
        <StatCard icon={<Flower2 className="w-4 h-4 text-accent" />} label="Spa" value={user.spa} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard icon={<User className="w-4 h-4" />} label="Age" value={String(user.age)} />
        <InfoCard icon={<Heart className="w-4 h-4" />} label="Status" value={user.status} />
        <InfoCard icon={<Users className="w-4 h-4" />} label="Partner" value={user.partner} />
        <InfoCard icon={<User className="w-4 h-4" />} label="Partner Occupation" value={user.partnerOccupation} />
        <InfoCard icon={<Users className="w-4 h-4" />} label="Family Size" value={String(user.family)} />
        <InfoCard icon={<Users className="w-4 h-4" />} label="Siblings" value={String(user.siblings)} />
        <InfoCard icon={<Shield className="w-4 h-4" />} label="Strength" value={user.strength} />
        <InfoCard icon={<Shield className="w-4 h-4" />} label="Weakness" value={user.weakness} />
        <InfoCard icon={<Brain className="w-4 h-4" />} label="Mindset" value={user.mindset} />
        <InfoCard icon={<Eye className="w-4 h-4" />} label="Opinion" value={user.opinion} />
        <InfoCard icon={<Activity className="w-4 h-4" />} label="STI Risk Level" value={user.stiRisk} />
      </div>

      {/* Honesty Meter */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-display font-bold text-foreground mb-4">Honesty Meter</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-emerald-400">Truth</span>
              <span className="text-foreground font-bold">{user.honesty.truth}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${user.honesty.truth}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-red-400">Lie</span>
              <span className="text-foreground font-bold">{user.honesty.lie}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-1000" style={{ width: `${user.honesty.lie}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="glass-card p-4 text-center">
    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">{icon}{label}</div>
    <div className="text-xl font-bold text-foreground">{value}</div>
  </div>
);

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="glass-card p-4 flex items-start gap-3">
    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default ClientDetail;
