import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "nivin77789" && password === "Nivin77789@") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      setError("Invalid username or password");
      setShaking(true);
      toast({ title: "Login Failed", description: "Invalid username or password", variant: "destructive" });
      setTimeout(() => { setError(""); setShaking(false); }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Animated background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

      <div className={`relative z-10 w-full max-w-md ${shaking ? "animate-shake" : ""}`}>
        <div className="glass-card p-8 sm:p-10">
          {/* Avatar badge */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-display font-bold text-white shadow-lg shadow-primary/30 animate-pulse-glow mb-4">
              PP
            </div>
            <h1 className="text-2xl font-display font-bold gradient-text">Pleasure Portal</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full py-3 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-3 pl-11 pr-12 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-display font-bold text-white bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Secure access to your personal portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
