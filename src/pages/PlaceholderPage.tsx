import {
  MessageCircle, BarChart3, Briefcase, Smile, Frown,
  UtensilsCrossed, AlertTriangle, Sparkles, HeartPulse, Users,
  Heart, Home, UserCheck, Wine, Flame,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle, BarChart3, Briefcase, Smile, Frown,
  UtensilsCrossed, AlertTriangle, Sparkles, HeartPulse, Users,
  Heart, Home, UserCheck, Wine, Flame,
};

interface PlaceholderPageProps {
  title: string;
  iconName: string;
}

const PlaceholderPage = ({ title, iconName }: PlaceholderPageProps) => {
  const Icon = iconMap[iconName];
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-card p-10 md:p-16 text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          {Icon && <Icon className="w-10 h-10 text-primary" />}
        </div>
        <h1 className="text-3xl font-display font-bold gradient-text mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg">Coming Soon</p>
        <div className="mt-6 h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
      </div>
    </div>
  );
};

export default PlaceholderPage;
