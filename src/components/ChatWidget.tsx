import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, MessageSquare, Trash2, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";
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
                    <span className="text-[10px] font-black uppercase tracking-widest">System Override: Success</span>
                </div>
                <p className="text-[11px] font-bold leading-relaxed text-slate-100">
                    💀 **DE-ESCALATION PROTOCOL...**{"\n\n"}
                    HAHA! Bro, CHILL! 😂 Just kidding! {"\n\n"}
                    This was a **PRANK**. No videos were uploaded, no lawyers were called, and her money is safe. {"\n\n"}
                    Take a deep breath. High tolerance starts now! 🧘‍♂️
                </p>
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[9px] text-emerald-300 font-mono uppercase text-center">
                    Session Status: Safe & Humorous
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-tighter text-red-500 animate-pulse">Live Uplink: Active</span>
                    <Badge variant="destructive" className="animate-bounce text-[8px] py-0 h-4">CRITICAL</Badge>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-red-500/50">
                    <img src="/nivin.png" alt="Evidence" className="w-full h-full object-cover grayscale contrast-125" />
                    <div className="absolute inset-0 bg-red-900/20 animate-pulse" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="p-2 bg-black/40 border border-white/5 rounded-lg text-[10px] font-mono text-white italic truncate">
                    @{FAKE_INSTA_IDS[instaIndex]}
                </div>
                <Button
                    className="w-full h-9 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-between px-3"
                    disabled
                >
                    <span>Uploading...</span>
                    <span>{countdown}S</span>
                </Button>
            </div>
        </div>
    );
};

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I am your AI assistant. How can I help you today?"
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

        // --- PRANK SEQUENCE TRIGGER (Shared with Chat Page) ---
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
                    setIsLoading(false);
                }, 1500);
            }, 500);
            return;
        }

        // Custom check for Rojee
        if (userInput.includes("rojee") || userInput.includes("who is rojee")) {
            setTimeout(() => {
                const rojeeDetails = "Rojee Tamang is a 28-year-old professional Therapist currently working at VRS Spa & Saloon in Bangalore.\n\n" +
                    "**Status & Lifestyle:**\n" +
                    "• **Smoking**: Smoker (Indiment, Connect, Shift)\n" +
                    "• **Honesty**: Truth 40% | Lie 50% | Doubt 10%\n" +
                    "• **Total Spend**: ₹1,28,100 (Inc. Outside)\n\n" +
                    "**Contact & Socials:**\n" +
                    "• **Instagram**: @ro_se.__22\n" +
                    "• **WhatsApp**: +91 84312 38167\n" +
                    "• **Device**: iPhone 14 Plus";

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
                headers: { "Content-Type": "application/json" },
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
        <div className="fixed bottom-24 lg:bottom-10 right-6 z-[1000] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <Card className="w-[320px] sm:w-[380px] h-[500px] mb-4 glass-card border-indigo-500/20 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    <CardHeader className="p-4 border-b border-white/10 gradient-primary flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-wider text-white">AI Assistant</CardTitle>
                                <div className="flex items-center gap-1.5 leading-none">
                                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                    <span className="text-[8px] text-white/70 font-bold uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-slate-950/50">
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-scale-in`}>
                                        <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-indigo-600" : "bg-white/10"}`}>
                                                {message.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                                            </div>
                                            <div className={`p-3 rounded-xl text-[12px] leading-relaxed ${message.role === "user" ? "bg-indigo-600/20 border border-indigo-500/20 text-white rounded-tr-none" : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"}`}>
                                                {message.isPrank ? (
                                                    <PrankMessage />
                                                ) : (
                                                    <>
                                                        {message.image && (
                                                            <div className="mb-2 rounded-lg overflow-hidden border border-white/10">
                                                                <img src={message.image} alt="Media" className="w-full h-auto max-w-[180px]" />
                                                            </div>
                                                        )}
                                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none">
                                                <Loader2 className="w-4 h-4 animate-spin text-indigo-500/50" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="bg-black/40 border-white/10 h-10 text-[12px] rounded-lg focus-visible:ring-indigo-500/50"
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="h-10 w-10 shrink-0 gradient-primary shadow-lg shadow-indigo-500/20">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Floating Bubble */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl shadow-2xl transition-all duration-500 ${isOpen ? 'rotate-90 scale-90 bg-rose-500 hover:bg-rose-600' : 'gradient-primary hover:scale-110 shadow-indigo-500/40 animate-bounce-slow'}`}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#03060d] rounded-full animate-pulse" />
                )}
            </Button>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
            `}} />
        </div>
    );
};

export default ChatWidget;
