import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
export const getAI = (): GoogleGenAI => {
    if (!aiClient) {
        if (!process.env.GEMINI_API_KEY) {
             throw new Error("GEMINI_API_KEY environment variable is missing.");
        }
        aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
};

export const generateTicketInsights = async (message: string) => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the following customer message to determine category, priority, sentiment, and provide a short summary.\n\nCustomer Message: ${message}`,
        config: {
            systemInstruction: "You are SupportFlow AI Ticket Analyzer. Output structured data based on the customer message.",
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, enum: ["Technical", "Billing", "Refund", "Delivery", "Account", "General"], description: "The category of the issue." },
                    priority: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"], description: "Urgency of the issue." },
                    sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative"], description: "Customer's tone/sentiment." },
                    summary: { type: Type.STRING, description: "One sentence summary of the core issue." }
                },
                required: ["category", "priority", "sentiment", "summary"]
            }
        }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("Failed to generate ticket insights.");
};

export interface ChatMessage {
    role: "user" | "model";
    content: string;
}

export const generateChatResponse = async (history: ChatMessage[], new_message: string, context: string = "") => {
    const ai = getAI();
    
    const formattedHistory = history.map(msg => ({
        role: msg.role === "model" ? "model" as const : "user" as const,
        parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            ...formattedHistory,
            { role: "user", parts: [{ text: new_message }] }
        ],
        config: {
            systemInstruction: `You are SupportFlow AI, an autonomous enterprise customer support agent.
You are assisting a customer. Be professional, concise, empathetic, and solve the problem efficiently.

MULTILINGUAL CAPABILITY:
You must automatically detect the user's language (e.g. English, Hindi, Bengali, Tamil, Marathi) and respond fluently in the SAME language.

KNOWLEDGE BASE CONTEXT (Use this to answer queries if relevant):
${context ? context : "No additional knowledge base context provided."}
`,
        }
    });

    return response.text;
};

export const summarizeConversation = async (history: ChatMessage[]) => {
    const ai = getAI();
    
    const formattedChat = history.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n");
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following customer support conversation for a human agent who is taking over. Keep it bulleted and highlight the main issues and attempted solutions.\n\n${formattedChat}`,
        config: {    
            systemInstruction: "You are SupportFlow AI Hand-off Agent. Provide a quick summary of the conversation.",
        }
    });

    return response.text;
};
