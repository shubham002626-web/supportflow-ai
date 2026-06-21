import { Router } from "express";
import { generateTicketInsights, generateChatResponse, summarizeConversation } from "./services/aiService";

const router = Router();

// Endpoint for analyzing a ticket upon creation
router.post("/ticket/analyze", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
           return res.status(400).json({ error: "Message is required" });
        }
        
        const insights = await generateTicketInsights(message);
        res.json({ success: true, insights });
    } catch (e: any) {
        console.error("Analysis Error:", e);
        res.status(500).json({ error: e.message || "Failed to analyze ticket" });
    }
});

// Endpoint for chatting with the AI Support Assistant
router.post("/chat", async (req, res) => {
    try {
        const { message, history = [], knowledgeContext = "" } = req.body;
        if (!message) {
           return res.status(400).json({ error: "Message is required" });
        }
        
        let responseText;
        try {
             responseText = await generateChatResponse(history, message, knowledgeContext);
        } catch (e: any) {
             console.error("AI Gen error", e);
             return res.json({ 
                response: "Hello! I am SupportFlow AI (Mock Mode). Please configure a valid GEMINI_API_KEY."
            });
        }
        
        res.json({ response: responseText });
    } catch (e: any) {
        console.error("Chat Error:", e);
        res.status(500).json({ error: e.message || "Failed to chat" });
    }
});

router.post("/chat/summarize", async (req, res) => {
    try {
        const { history } = req.body;
        if (!history || !Array.isArray(history)) {
           return res.status(400).json({ error: "Chat history array is required" });
        }
        
        const summary = await summarizeConversation(history);
        res.json({ success: true, summary });
    } catch (e: any) {
        console.error("Summarize Error:", e);
        res.status(500).json({ error: e.message || "Failed to summarize chat" });
    }
});

export default router;
