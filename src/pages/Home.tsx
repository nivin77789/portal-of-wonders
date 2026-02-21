import { useState, useEffect } from "react";
import {
  Mail, Phone, Linkedin, Globe, MessageCircle, MapPin,
  Bot, TrendingUp, Zap, PenTool, Palette, Code, Layers,
  Mic, BookOpen, Code2, GraduationCap, School, Building2,
  Award, Trophy, Database, Coffee, Cpu, Gem, Calculator,
  Languages as LanguagesIcon,
} from "lucide-react";
import { experiences, education, skills, languages, certifications } from "@/data/portfolio-data";

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot, TrendingUp, Zap, PenTool, Palette, Code, Layers, Mic, BookOpen, Code2,
  GraduationCap, School, Building2, Award, Trophy, Database, Coffee, Cpu, Gem, Calculator, Globe,
};

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 300); }, []);

  return (
    <div className={`max-w-7xl mx-auto space-y-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Hero */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-bl-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-display font-bold text-white shadow-lg shadow-primary/30 shrink-0 overflow-hidden">
            <img src="/nivin.png" alt="Nivin Mathew S" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left space-y-3 flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              ✦ Available for Work
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">Nivin Mathew S</h1>
            <p className="text-muted-foreground text-lg">Self-taught Data Scientist & AI Engineer | Machine Learning | Deep Learning | Python</p>
            <p className="text-muted-foreground/70 text-sm max-w-2xl">
              Dedicated web developer with 2 years of experience. Strong creative and analytical skills. Experienced with MySQL, Python, C++, Java, MongoDB & Ruby on Rails. Goal-oriented and driven to create custom, immersive digital experiences. Interested in Brain-Computer Interfaces.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <ContactLink icon={<Mail className="w-3.5 h-3.5" />} label="Email" href="mailto:nivinmathews@gmail.com" />
              <ContactLink icon={<Phone className="w-3.5 h-3.5" />} label="+91 7975339228" href="tel:+917975339228" />
              <ContactLink icon={<Linkedin className="w-3.5 h-3.5" />} label="LinkedIn" href="https://linkedin.com/in/nivinmathews" />
              <ContactLink icon={<MessageCircle className="w-3.5 h-3.5" />} label="WhatsApp" href="https://wa.me/917975339228" />
              <ContactLink icon={<Globe className="w-3.5 h-3.5" />} label="Portfolio" href="#" />
              <ContactLink icon={<MapPin className="w-3.5 h-3.5" />} label="Bengaluru, India" />
            </div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" /> Top Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => {
                const Icon = iconComponents[s.iconName];
                return (
                  <span key={s.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground/90">
                    {Icon && <Icon className="w-3.5 h-3.5 text-primary" />} {s.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <LanguagesIcon className="w-5 h-5 text-primary" /> Languages
            </h2>
            <div className="space-y-4">
              {languages.map((item) => (
                <div key={item.lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground/90">{item.lang}</span>
                    <span className="text-muted-foreground text-xs">{item.prof}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000" style={{ width: `${item.p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Certifications & Honors
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => {
                const Icon = iconComponents[cert.iconName];
                return (
                  <div key={cert.title} className="flex items-start gap-3">
                    {Icon && <Icon className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-sm text-foreground/90">{cert.title}</p>
                      {cert.detail && <p className="text-xs text-muted-foreground">{cert.detail}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Experience */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, i) => {
                const Icon = iconComponents[exp.iconName];
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className={`w-10 h-10 rounded-xl ${exp.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      {Icon && <Icon className={`w-4 h-4 ${exp.color}`} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground/90">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground/70">{exp.duration}</p>
                      {exp.location && <p className="text-xs text-muted-foreground/50 flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</p>}
                      {exp.desc && <p className="text-xs text-muted-foreground/70 mt-1 italic">{exp.desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" /> Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => {
                const Icon = iconComponents[edu.iconName];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-4 h-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/90">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.inst}</p>
                      <p className="text-xs text-muted-foreground/70">{edu.duration}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Family Background
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">NM</div>
                <div>
                  <p className="text-sm font-semibold text-foreground/90">Nithin Mathew S</p>
                  <p className="text-xs text-muted-foreground">Sibling • Male</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <InfoItem label="Date of Birth" value="16/05/2000" />
                <InfoItem label="Location" value="Kerala, India" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Education</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" /> BA in Logistics Malta, Europe
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" /> MS in Supply Chain England, UK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) => {
  const cls = "flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-foreground/90 hover:scale-105";
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{icon}{label}</a> : <span className={cls}>{icon}{label}</span>;
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm text-foreground/90 font-medium">{value}</p>
  </div>
);

export default Home;
