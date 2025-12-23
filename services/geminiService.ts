import { GoogleGenAI } from "@google/genai";

// Initialize lazily to prevent runtime errors if process.env is not fully ready at module load time
const getAiClient = () => {
    // Safe access to process.env
    let apiKey = '';
    try {
        if (typeof process !== 'undefined' && process.env) {
            apiKey = process.env.API_KEY || '';
        } else if (typeof window !== 'undefined' && (window as any).process && (window as any).process.env) {
            apiKey = (window as any).process.env.API_KEY || '';
        }
    } catch (e) {
        console.warn("Failed to access process.env", e);
    }

    if (!apiKey) {
        console.warn("API_KEY is missing.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const generateProductivityTip = async (context?: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "API Key is missing. Please configure your environment variables.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = context 
      ? `Based on this context: "${context}", give me a short, actionable productivity tip.`
      : "Give me a single, short, high-impact productivity tip for a software engineering team manager. Keep it under 2 sentences.";

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Focus on one big thing today.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Stay focused and keep moving forward.";
  }
};

export const chatWithAssistant = async (
    history: {role: 'user' | 'model', text: string}[], 
    newMessage: string,
    systemInstruction?: string
) => {
    const ai = getAiClient();
    if (!ai) return "Please provide an API Key to chat.";
    
    try {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            })),
            config: {
                systemInstruction: systemInstruction || "You are Stride, a smart productivity assistant. You are helpful, concise, and professional. You help users organize thoughts and tasks."
            }
        });

        const result = await chat.sendMessage({ message: newMessage });
        return result.text || "";
    } catch (error) {
        console.error("Chat error", error);
        return "I'm having trouble connecting right now. Please try again later.";
    }
}