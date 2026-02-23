import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, MessageSquare, Trash2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
    role: "user" | "assistant";
    content: string;
    image?: string;
    isPrank?: boolean;
}

const FAKE_INSTA_IDS = [
    "rojee_hater_99", "justice_for_nivin", "mocca_spa_scams", "exposed_rojee",
    "karnataka_news_bt", "bangalore_scam_alert", "sikkim_truth_seeker", "therapist_exposed",
    "ro_se_scams", "nivin_warrior", "truth_bomb_2026", "illegal_activity_tracker"
];

const PrankMessage = () => {
    const [countdown, setCountdown] = useState(10);
    const [instaIndex, setInstaIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else {
            setIsFinished(true);
        }
    }, [countdown]);

    useEffect(() => {
        if (!isFinished) {
            const timer = setInterval(() => setInstaIndex(prev => (prev + 1) % FAKE_INSTA_IDS.length), 200);
            return () => clearInterval(timer);
        }
    }, [isFinished]);

    if (isFinished) {
        return (
            <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-3 text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">System Override: Success</span>
                </div>
                <p className="text-sm font-bold leading-relaxed text-slate-100">
                    💀 **DE-ESCALATION PROTOCOL...**{"\n\n"}
                    HAHA! Bro, CHILL! 😂 Just kidding! {"\n\n"}
                    This was a **PRANK**. No videos were uploaded, no lawyers were called, and her money is safe. {"\n\n"}
                    Take a deep breath. High tolerance starts now! 🧘‍♂️
                </p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-300 font-mono uppercase text-center">
                    Session Status: Safe & Humorous
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-red-500 animate-pulse">Live Uplink: Active</span>
                    <Badge variant="destructive" className="animate-bounce text-[9px]">CRITICAL</Badge>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <img src="/nivin.png" alt="Evidence" className="w-full h-full object-cover grayscale contrast-125" />
                    <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay animate-pulse" />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                        REC: PORTAL_SOURCE_01
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                        <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Broadcasting to Authorities</div>
                        <div className="text-[11px] font-mono text-indigo-400">TV9_KANNADA_REPORTER_SYD: DISRESPECT_RAID_REQUEST</div>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                        <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Targeting Social Graph</div>
                        <div className="text-[13px] font-black text-white italic uppercase tracking-wider animate-in slide-in-from-right-full duration-75">
                            @{FAKE_INSTA_IDS[instaIndex]}
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs flex items-center justify-between px-6 shadow-[0_4px_15px_rgba(220,38,38,0.3)] group"
                        disabled
                    >
                        <span>Initiating Mass-Upload</span>
                        <div className="flex items-center gap-2">
                            <div className="w-[1px] h-4 bg-white/20" />
                            <span className="text-sm font-mono">{countdown}S</span>
                        </div>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 opacity-50">
                <div className="text-[8px] font-mono text-slate-400 uppercase">Packet Stream: {Math.random().toString(16).slice(2, 10)}...</div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${(10 - countdown) * 10}%` }} />
                </div>
            </div>
        </div>
    );
};

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I am your AI assistant from the Portal of Wonders. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userInput = input.toLowerCase();
        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // --- PRANK SEQUENCE TRIGGER ---
        if (userInput.includes("rojee behaved") && userInput.includes("insulted")) {
            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    role: "assistant",
                    content: "⚠️ **ACTIVE DEFENSE MODE ENGAGED** ⚠️\nProtocol: Zero Tolerance for Disrespect.\n\n**Target Locked:** Rojee Tamang\nInitiating counter-measures...",
                    image: "/rojee.png"
                }]);

                setTimeout(() => {
                    setMessages((prev) => [...prev, {
                        role: "assistant",
                        content: "Generating evidence packages and syncing with media servers...",
                        isPrank: true
                    }]);
                    // setIsLoading(false); // Moved to PrankMessage component's onPrankEnd
                }, 1500);
            }, 500);
            return;
        }

        // Custom check for Rojee
        if (userInput.includes("rojee") || userInput.includes("who is rojee")) {
            setTimeout(() => {
                const rojeeDetails = "Rojee Tamang is a 27-year-old (Born: Feb 22, 1998) professional Beauty Therapist currently working at Mocca Spa in Bangalore.\n\n" +
                    "**Professional Details:**\n" +
                    "• **Current Role**: Beauty Therapist at Mocca Spa.\n" +
                    "• **History**: Previously Senior Therapist at O3 Spa and Junior Massuse at Ozone Wellness (2019-2021).\n" +
                    "• **Education**: Graduate from Government Senior Secondary School, Jorethang (Sikkim), class of 2020.\n\n" +
                    "**Contact & Socials:**\n" +
                    "• **Instagram**: @ro_se.__22\n" +
                    "• **Snapchat**: rojee_t20\n" +
                    "• **WhatsApp**: +91 84312 38167\n" +
                    "• **Device**: iPhone 14 Plus\n\n" +
                    "**Profile Insights:**\n" +
                    "She resides in Immadihalli, Bangalore, and is known for her growth-oriented mindset and active professional lifestyle. She manages her financial intelligence via HDFC Bank and is a valued member of the Portal of Wonders community.";

                setMessages((prev) => [...prev, {
                    role: "assistant",
                    content: rojeeDetails,
                    image: "/rojee.png"
                }]);
                setIsLoading(false);
            }, 1000);
            return;
        }

        try {
            const response = await fetch("https://text.pollinations.ai/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model: "openai",
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.text();
            setMessages((prev) => [...prev, { role: "assistant", content: data }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: "assistant",
                content: "Chat cleared. I'm ready for new questions!"
            }
        ]);
    };

    return (
        <div className="pb-20 relative h-[calc(100vh-120px)]">
            <div className="container mx-auto px-4 py-8 max-w-5xl h-full flex flex-col">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl gradient-primary shadow-lg shadow-indigo-500/20">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-black tracking-tight text-white uppercase">AI Assistant</h1>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[0.6rem] uppercase tracking-widest border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                                    Online
                                </Badge>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Powered by Pollinations</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearChat}
                        className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Chat
                    </Button>
                </div>

                {/* Chat Area */}
                <Card className="flex-1 glass-card border-white/5 overflow-hidden flex flex-col mb-4">
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                        } animate-scale-in`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${message.role === "user" ? "bg-indigo-600 shadow-indigo-500/20" : "bg-white/10 shadow-black/20"
                                            }`}>
                                            {message.role === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl relative group ${message.role === "user"
                                            ? "bg-indigo-600/20 border border-indigo-500/20 text-white rounded-tr-none"
                                            : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                                            }`}>
                                            {message.isPrank ? (
                                                <PrankMessage />
                                            ) : (
                                                <>
                                                    {message.image && (
                                                        <div className="mb-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                            <img src={message.image} alt="Media" className="w-full h-auto max-w-[240px] object-cover" />
                                                        </div>
                                                    )}
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                                </>
                                            )}

                                            {/* Subtle timestamp-like indicator */}
                                            <div className={`absolute -bottom-5 text-[10px] font-bold text-slate-600 uppercase tracking-tighter ${message.role === "user" ? "right-0" : "left-0"
                                                }`}>
                                                {message.role === "user" ? "Sent" : "Received"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shadow-lg">
                                            <Bot className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce [animation-delay:0.2s]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <CardHeader className="border-t border-white/5 p-6 bg-white/[0.02]">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex gap-4"
                        >
                            <div className="relative flex-1 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about your journey..."
                                    className="relative z-10 bg-black/40 border-white/10 h-14 rounded-xl px-6 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all placeholder:text-slate-600"
                                    disabled={isLoading}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2">
                                    <div className="w-[1px] h-6 bg-white/10 mr-2" />
                                    <Sparkles className="w-4 h-4 text-slate-600" />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="h-14 w-14 rounded-xl gradient-primary border-0 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all duration-300"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Send className="w-6 h-6 text-white" />}
                            </Button>
                        </form>
                        <p className="mt-3 text-[10px] text-center text-slate-600 font-bold uppercase tracking-[0.2em]">
                            Tips: Ask for recipes, workout advice, or just vent your day
                        </p>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};

export default Chat;
