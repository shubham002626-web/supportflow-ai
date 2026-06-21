import { useState } from "react";
import { toast } from "sonner";

export interface ChatMessage {
    id: string;
    role: "user" | "model";
    content: string;
}

export const useAIChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (message: string, context?: string) => {
        setIsLoading(true);
        setError(null);
        
        const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: message };
        setMessages(prev => [...prev, userMsg]);

        try {
            const apiHistory = messages.map(m => ({ role: m.role, content: m.content }));
            
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, history: apiHistory, knowledgeContext: context })
            });

            if (!res.ok) throw new Error("Failed to communicate with AI");
            
            const data = await res.json();
            
            const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "model", content: data.response || "No response received." };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred");
            toast.error("AI Communication Error: " + (err.message || "Could not reach the AI agent."));
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", content: "Error: Could not reach the AI support agent." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, sendMessage, isLoading, error, setMessages };
};

export const useAITicketInsights = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const analyzeTicket = async (message: string) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/ticket/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });
            if (!res.ok) throw new Error("Failed to analyze");
            const data = await res.json();
            toast.success("AI Analysis Complete");
            return data.insights;
        } catch (err) {
            console.error("Insight Error", err);
            toast.error("AI Analysis Failed: Could not process ticket.");
            return null;
        } finally {
            setIsLoading(false);
        }
    };
    
    return { analyzeTicket, isLoading };
};
