import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Calendar, Heart, User, Briefcase, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const familyMembers = [
    {
        name: "San Sebastian",
        relation: "Dad",
        qualifications: ["MBA", "BA in Commerce"],
        dob: "1970-05-15",
        age: "54",
        icon: <Briefcase className="w-6 h-6" />,
        color: "from-blue-500/20 to-indigo-500/20",
        motto: "Integrity is the only path to true success.",
        details: [
            "Strategic visionary and financial mentor",
            "Expert in business management and commerce",
            "Enjoys reading leadership books and evening walks",
            "Values discipline and lifelong learning",
            "Known for his impeccable sense of timing and wisdom"
        ]
    },
    {
        name: "Manju",
        relation: "Mom",
        qualifications: ["B.Pharma"],
        dob: "1975-08-22",
        age: "49",
        icon: <Heart className="h-6 w-6" />,
        color: "from-rose-500/20 to-pink-500/20",
        motto: "Kindness is the ultimate form of strength.",
        details: [
            "Health and wellness specialist",
            "Pharmaceutical expertise with a caring touch",
            "Passionate about traditional cooking and gardening",
            "The emotional pillar and peacemaker of the family",
            "Has an amazing ability to find anything lost"
        ]
    },
    {
        name: "Nithin Mathew S",
        relation: "Brother",
        qualifications: ["B.Tech (Computer Science)"],
        dob: "1998-12-10",
        age: "26",
        icon: <User className="w-6 h-6" />,
        color: "from-emerald-500/20 to-teal-500/20",
        motto: "Default to action and keep building.",
        details: [
            "Tech enthusiast and software explorer",
            "The creative mind behind many family projects",
            "Loves gaming, trekking, and music production",
            "Always up for a late-night coding session",
            "Expert at explaining complex tech in simple terms"
        ]
    }
];

const Family = () => {
    return (
        <div className="pb-20 relative">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Page Header */}
                <div className="mb-12 animate-fade-in">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary shadow-lg shadow-indigo-500/20">
                            <Users className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-display font-black tracking-tight text-white uppercase">My Inner Circle</h1>
                            <p className="text-indigo-400 font-bold tracking-[0.2em] text-xs uppercase opacity-80">Family & Roots</p>
                        </div>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                        The foundation of everything I am. A collective of brilliant minds, caring hearts, and unwavering support.
                    </p>
                </div>

                {/* Family Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {familyMembers.map((member, index) => (
                        <Card
                            key={member.name}
                            className={`glass-card border-white/5 overflow-hidden group hover:scale-[1.02] transition-all duration-500 animate-slide-in-right`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${member.color} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />

                            <CardHeader className="relative z-10 pb-0">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white shadow-inner group-hover:bg-white/10 transition-colors">
                                        {member.icon}
                                    </div>
                                    <Badge variant="outline" className="text-[0.6rem] uppercase tracking-widest border-indigo-500/30 text-indigo-300">
                                        {member.relation}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl font-display font-bold text-white mb-1">{member.name}</CardTitle>
                                <p className="text-[0.65rem] italic text-indigo-300 font-medium mb-4 opacity-70">"{member.motto}"</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.qualifications.map(qual => (
                                        <div key={qual} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[0.65rem] font-bold text-white uppercase tracking-tighter">
                                            <GraduationCap className="w-3 h-3 text-indigo-400" />
                                            {qual}
                                        </div>
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="relative z-10 space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[0.6rem] uppercase tracking-widest text-slate-500 font-bold">Age</p>
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-amber-400/70" />
                                            <span className="text-lg font-bold text-white">{member.age}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[0.6rem] uppercase tracking-widest text-slate-500 font-bold">Born</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-indigo-400/70" />
                                            <span className="text-sm font-bold text-slate-300">{member.dob}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details List */}
                                <div className="space-y-3">
                                    <p className="text-[0.6rem] uppercase tracking-widest text-indigo-400 font-black mb-1">Key Traits</p>
                                    <ul className="space-y-3">
                                        {member.details.map((detail, dIndex) => (
                                            <li key={dIndex} className="flex items-start gap-3 group/item">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-transform shadow-[0_0_8px_#6366f1]" />
                                                <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors leading-snug font-medium">
                                                    {detail}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Interactive Footer */}
                                <div className="pt-4 flex justify-end">
                                    <button className="text-[0.65rem] uppercase tracking-widest font-black text-indigo-500 hover:text-white flex items-center gap-2 group/btn transition-colors">
                                        View More Details
                                        <div className="w-6 h-6 rounded-full border border-indigo-500/30 flex items-center justify-center group-hover/btn:bg-indigo-500/20 transition-all">
                                            <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </div>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Family Quote */}
                <div className="mt-12 p-8 glass-card border-indigo-500/10 relative overflow-hidden text-center animate-fade-in">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />
                    <Heart className="w-12 h-12 text-rose-500/20 mx-auto mb-6 animate-pulse" />
                    <blockquote className="relative z-10">
                        <p className="text-2xl font-display font-medium text-white/90 italic leading-relaxed">
                            "Family is not an important thing. It's everything."
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

// Required for the interactive footer in the loop
const ChevronRight = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18l6-6-6-6" />
    </svg>
);

export default Family;
