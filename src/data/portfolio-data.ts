export const menuItems = [
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
] as const;

export const experiences = [
  { role: "ML Engineer", company: "AALBOT", duration: "March 2024 - Present (2 years)", location: "Bengaluru, Karnataka, India", color: "text-emerald-400", bg: "bg-emerald-400/10", iconName: "Bot" },
  { role: "Data Scientist intern", company: "Exposys Data Labs", duration: "July 2023 - Present (2 years 8 months)", location: "Bengaluru, Karnataka, India", color: "text-blue-400", bg: "bg-blue-400/10", iconName: "TrendingUp" },
  { role: "Student Ambassador", company: "Viral Fission", duration: "September 2022 - Present (3 years 6 months)", location: "Bengaluru, Karnataka, India", color: "text-amber-400", bg: "bg-amber-400/10", iconName: "Zap" },
  { role: "Social Media Designer", company: "Saahitya", duration: "May 2021 - Present (4 years 10 months)", location: "", color: "text-pink-400", bg: "bg-pink-400/10", iconName: "PenTool" },
  { role: "Graphic Designer", company: "TEDxMVJCE", duration: "October 2021 - Present (4 years 5 months)", location: "", color: "text-red-500", bg: "bg-red-500/10", iconName: "Palette" },
  { role: "Core team member", company: "GDSC MVJCE", duration: "August 2021 - February 2022 (7 months)", location: "", color: "text-blue-500", bg: "bg-blue-500/10", iconName: "Globe", desc: "It was great working with the GDSC Tech team." },
  { role: "Core tech team member", company: "Nova Innovative Compsky", duration: "July 2021 - January 2022 (7 months)", location: "", color: "text-indigo-400", bg: "bg-indigo-400/10", iconName: "Code" },
  { role: "Core design team member", company: "Nova Innovative Compsky", duration: "July 2021 - December 2021 (6 months)", location: "", color: "text-indigo-400", bg: "bg-indigo-400/10", iconName: "Palette" },
  { role: "Graphic Designer", company: "SOFTWARE DEVELOPMENT CLUB-MVJCE", duration: "January 2021 - September 2021 (9 months)", location: "", color: "text-teal-400", bg: "bg-teal-400/10", iconName: "Layers" },
  { role: "Campus Ambassador", company: "SkillVertex", duration: "April 2021 - June 2021 (3 months)", location: "", color: "text-orange-400", bg: "bg-orange-400/10", iconName: "Mic" },
  { role: "Dhwani Editor", company: "Dhwani SSCBS", duration: "March 2021 - April 2021 (2 months)", location: "", color: "text-purple-400", bg: "bg-purple-400/10", iconName: "BookOpen" },
  { role: "Frontend Developer", company: "WiseChoice.com", duration: "June 2020 - March 2021 (10 months)", location: "", color: "text-cyan-400", bg: "bg-cyan-400/10", iconName: "Code2" },
];

export const education = [
  { degree: "Bachelor of Technology - BTech, Artificial Intelligence", inst: "MVJ College of Engineering, Bangalore", duration: "Aug 2020 - May 2024", iconName: "GraduationCap" },
  { degree: "1st and 2nd PU, Computer Science", inst: "SMPUC High School", duration: "Mar 2018 - Mar 2020", iconName: "School" },
  { degree: "SSLC", inst: "Royal International High School", duration: "Sep 2018", iconName: "Building2" },
];

export const skills = [
  { name: "React.js", iconName: "Code2" },
  { name: "Pandas", iconName: "Database" },
  { name: "NumPy", iconName: "Calculator" },
  { name: "Python", iconName: "Code" },
  { name: "Ruby on Rails", iconName: "Gem" },
  { name: "C / C++", iconName: "Cpu" },
  { name: "MySQL & MongoDB", iconName: "Database" },
  { name: "Java", iconName: "Coffee" },
];

export const languages = [
  { lang: "Malayalam", prof: "Native or Bilingual", p: 100 },
  { lang: "English", prof: "Professional Working", p: 85 },
  { lang: "Hindi", prof: "Limited Working", p: 50 },
  { lang: "Tamil", prof: "Limited Working", p: 40 },
];

export const certifications = [
  { title: "CTF Competition Participant", detail: "Conducted by NIC.", iconName: "Trophy" },
  { title: "Artificial Intelligence", detail: "", iconName: "Award" },
  { title: "Python and SQL for Data Science", detail: "", iconName: "Award" },
  { title: "Ruby Programming Language Course", detail: "", iconName: "Award" },
  { title: "Java and C language (100k coding challenge)", detail: "", iconName: "Award" },
  { title: "Certified Web Designer", detail: "", iconName: "Award" },
];

export const lustOptions = [
  { name: "Partners", path: "/partners", iconName: "Heart", color: "text-rose-500" },
  { name: "Colleagues", path: "/colleagues", iconName: "UserCheck", color: "text-blue-500" },
  { name: "Home Service", path: "/home-service", iconName: "Home", color: "text-teal-500" },
  { name: "Pub", path: "/pub", iconName: "Wine", color: "text-amber-500" },
  { name: "Hooked Up", path: "/hookedup", iconName: "Flame", color: "text-orange-500" },
  { name: "Spa", path: "/spa", iconName: "Flower2", color: "text-indigo-500" },
];
