import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Users, Zap, Heart, MessageSquare, Sun, Music, Coffee, Sparkles, Ghost } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const happinessPillars = [
    {
        title: "Social Resonance",
        icon: <Users className="w-6 h-6" />,
        color: "from-blue-500/20 to-cyan-500/20",
        items: [
            {
                name: "Time with Friends",
                description: "The pure, unfiltered joy of shared laughter and collective memories.",
                tag: "Connection"
            },
            {
                name: "Witty Sarcasm",
                description: "Engaging with people who possess high-level sarcasm—where words are a sport.",
                tag: "Intellect"
            },
            {
                name: "Meaningful Dialogues",
                description: "Conversations that go beyond the surface and touch the soul.",
                tag: "Depth"
            }
        ]
    },
    {
        title: "The Romantic Chase",
        icon: <Heart className="w-6 h-6" />,
        color: "from-rose-500/20 to-pink-500/20",
        items: [
            {
                name: "The Pre-Proposal Thrill",
                description: "The electric tension and mystery of love before it's officially claimed.",
                tag: "The Spark"
            },
            {
                name: "The Mystery Factor",
                description: "Once the 'I do' or the proposal happens, the hunt ends, but the memory remains eternal.",
                tag: "Ephemeral"
            },
            {
                name: "Late Night Calls",
                description: "When the world is asleep and only two voices exist in the universe.",
                tag: "Intimacy"
            }
        ]
    },
    {
        title: "Dopamine Architecture",
        icon: <Zap className="w-6 h-6" />,
        color: "from-amber-500/20 to-orange-500/20",
        items: [
            {
                name: "Instant Wins",
                description: "The biological rush of achieving a goal or receiving sudden good news.",
                tag: "Biological"
            },
            {
                name: "Morning Sunlight",
                description: "Natural serotonin and dopamine reset through the first rays of the sun.",
                tag: "Vibe"
            },
            {
                name: "The Perfect Beat",
                description: "When the bass drops and your brain releases a flood of euphoria.",
                tag: "Auditory"
            }
        ]
    },
    {
        title: "The Little Wonders",
        icon: <Sparkles className="w-6 h-6" />,
        color: "from-emerald-500/20 to-teal-500/20",
        items: [
            {
                name: "Dark Humor & Wit",
                description: "Finding light in the shadows through sophisticated, sharp-edged humor.",
                tag: "Personality"
            },
            {
                name: "A Perfect Brew",
                description: "The first sip of coffee that feels like a warm hug for your brain.",
                tag: "Sensory"
            },
            {
                name: "Spontaneous Trips",
                description: "Leaving the plan behind and letting the road decide the destination.",
                tag: "Freedom"
            }
        ]
    }
];

const Happiness = () => {
    return (
        <div className="pb-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="mb-16 text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-2xl mb-6 group hover:scale-110 transition-transform duration-500">
                        <Smile className="h-10 w-10 text-amber-400 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight text-white uppercase mb-4">
                        The Happiness <span className="gradient-text">Matrix</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium capitalize">
                        Curating the moments, chemicals, and connections that make existence worthwhile.
                    </p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {happinessPillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className="space-y-6 animate-scale-in"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-center gap-4 ml-2">
                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${pillar.color} border border-white/10`}>
                                    {pillar.icon}
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white tracking-wide uppercase">{pillar.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {pillar.items.map((item) => (
                                    <Card key={item.name} className="glass-card border-white/5 group hover:bg-white/10 transition-all duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                    {item.name}
                                                </h3>
                                                <Badge variant="outline" className="text-[0.6rem] uppercase tracking-widest border-indigo-500/20 text-indigo-400 bg-indigo-500/5">
                                                    {item.tag}
                                                </Badge>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Thought */}
                <div className="mt-24 p-12 glass-card border-indigo-500/10 text-center relative overflow-hidden group max-w-4xl mx-auto">
                    <div className="absolute top-[-50%] left-[-20%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
                    <div className="relative z-10 space-y-4">
                        <Ghost className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-20" />
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-relaxed">
                            "Happiness is not a destination. It is the frequency we choose to vibrate at."
                        </h3>
                        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full mt-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Happiness;
