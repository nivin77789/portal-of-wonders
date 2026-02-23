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
}

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

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("https://text.pollinations.ai/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model: "openai", // You can change this to "mistral" or "searchgpt"
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.text(); // Pollinations often returns plain text for simple POSTs
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
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

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
