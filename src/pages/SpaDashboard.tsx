import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Search, Users, ArrowRight, DollarSign, CalendarCheck, Flower2, BarChart3 } from "lucide-react";
import { generateClients, pieData, barData, CHART_COLORS } from "@/data/spa-clients";

const SpaDashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const tableData = useMemo(() => generateClients(), []);

  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);

  const filteredSorted = useMemo(() => {
    if (!searchTerm.trim()) return tableData;
    const q = searchTerm.toLowerCase().trim();
    const matches = tableData.filter(r => r.name.toLowerCase().includes(q));
    const others = tableData.filter(r => !r.name.toLowerCase().includes(q));
    return [...matches, ...others];
  }, [tableData, searchTerm]);

  const onSearchClicked = (e?: React.FormEvent) => { e?.preventDefault(); setSearchTerm(searchInput); };
  const resetSearch = () => { setSearchInput(""); setSearchTerm(""); };

  return (
    <div className={`max-w-7xl mx-auto space-y-6 md:space-y-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 md:mb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-3 glass-card">
              <Flower2 className="w-8 h-8 md:w-10 md:h-10 text-accent drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black gradient-text tracking-tight">Spa Dashboard</h1>
          </div>
          <p className="text-primary/70 mt-2 font-medium max-w-xl text-sm md:text-base hidden sm:block">
            Monitor client satisfaction, spending patterns, and comprehensive health details efficiently.
          </p>
        </div>
        <div className="flex items-center gap-3 glass-card px-5 py-3">
          <Users className="text-primary w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Clients</span>
            <span className="text-xl font-bold text-foreground">{tableData.length}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 sm:p-8 group relative overflow-hidden hover:border-primary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
          <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2.5 bg-primary/20 rounded-xl text-primary group-hover:scale-110 transition-transform"><BarChart3 className="w-4 h-4" /></div>
            Satisfaction Status
          </h3>
          <div className="w-full h-[250px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={95} innerRadius={65} paddingAngle={3} stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(230 25% 9%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 group relative overflow-hidden hover:border-accent/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
          <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2.5 bg-accent/20 rounded-xl text-accent group-hover:scale-110 transition-transform"><BarChart3 className="w-4 h-4" /></div>
            Clients by Spa
          </h3>
          <div className="w-full h-[250px] relative z-10 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "hsl(230 25% 9%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-5 md:p-6">
        <form className="flex flex-col sm:flex-row gap-4 items-center justify-between" onSubmit={onSearchClicked}>
          <div className="w-full sm:flex-grow flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="text-accent w-5 h-5" />
            <input type="text" placeholder="Search clients by name..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-base" />
          </div>
          <div className="w-full sm:w-auto flex gap-3">
            <button type="submit" className="flex-1 sm:flex-none bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">Search</button>
            <button type="button" onClick={resetSearch} className="flex-1 sm:flex-none bg-transparent border border-white/10 hover:bg-white/5 text-muted-foreground font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0">Reset</button>
          </div>
        </form>
      </div>

      {/* Client Directory */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            Client Directory <span className="text-sm px-2.5 py-1 bg-white/10 rounded-full text-primary ml-2">{filteredSorted.length} found</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {filteredSorted.length > 0 ? filteredSorted.map((row) => {
            const isMatch = searchTerm.trim() && row.name.toLowerCase().includes(searchTerm.toLowerCase());
            return (
              <div
                key={row.id}
                onClick={() => navigate(`/spa/${row.id}`, { state: { user: row } })}
                className={`group glass-card p-5 md:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl relative overflow-hidden flex flex-col gap-4
                  ${isMatch ? "border-primary/60 shadow-[0_0_20px_rgba(99,102,241,0.2)]" : ""}`}
              >
                <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-accent/20 group-hover:via-primary/10 group-hover:to-transparent rounded-full blur-[30px] transition-all duration-500 pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px] shrink-0 group-hover:scale-105 transition-transform">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=1a1f3a&color=fff`} alt={row.name} className="w-full h-full object-cover rounded-full border-2 border-card" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-foreground truncate group-hover:text-accent transition-colors">{row.name}</h4>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client ID: #{row.id.toString().padStart(4, "0")}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-1 relative z-10">
                  <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                    <div className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Visits</div>
                    <div className="text-lg font-bold text-foreground">{row.totalVisit}</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Spend</div>
                    <div className="text-lg font-bold text-foreground truncate" title={row.totalSpend}>{row.totalSpend}</div>
                  </div>
                </div>

                <div className="space-y-2 mt-1 relative z-10">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-tighter">
                    <span className="text-emerald-400">Truth: {row.honesty.truth}%</span>
                    <span className="text-rose-400">Lie: {row.honesty.lie}%</span>
                    <span className="text-amber-400">Doubt: {row.honesty.doubt}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${row.honesty.truth}%` }} className="h-full bg-emerald-500" />
                    <div style={{ width: `${row.honesty.lie}%` }} className="h-full bg-rose-500" />
                    <div style={{ width: `${row.honesty.doubt}%` }} className="h-full bg-amber-500" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className={`w-2 h-2 rounded-full ${row.lifestyle.smoking.includes("Smoker") && !row.lifestyle.smoking.includes("Non") ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase truncate">
                      {row.lifestyle.smoking}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full flex items-center justify-between relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-accent">View Details</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-foreground">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center glass-card">
              <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl text-foreground font-bold mb-2">No clients found</h3>
              <p className="text-muted-foreground">Try changing your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaDashboard;
