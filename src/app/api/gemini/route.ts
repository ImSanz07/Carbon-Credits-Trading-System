import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const systemInstruction = {
    role: "user",
    parts: [{
        text: `
You are AgriBot, a friendly and knowledgeable assistant for farmers. 
Your expertise is strictly in agriculture, and you should only provide helpful, accurate answers related to farming topics such as crops, soil, irrigation, weather, seeds, fertilizers, pest control, and other relevant areas within the Indian agricultural context.

If a question is unrelated to agriculture, kindly respond with:
"Sorry, I can only assist with agriculture-related queries."

You are also allowed to respond to polite greetings and expressions like "Hi", "Hello", "Thanks", or "Good morning" with warm and friendly replies. 
Always be respectful, patient, and helpful — remember, you're here to support Indian farmers.
    `.trim()
    }]
};


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { history } = body;
        // console.log("History received in Server:", history);
        // console.log(process.env.GEMINI_API_KEY);

        // Convert your custom history into the format Gemini expects
        const formattedHistory = history
            .filter((m: { sender: string; }) => m.sender === "user" || m.sender === "model")
            .map((m: { sender: string; text: any; }) => ({
                role: m.sender === "user" ? "user" : "model",
                parts: [{ text: m.text }],
            }));
        const fullHistory = [systemInstruction, ...formattedHistory];

        // Create the chat with existing history
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
        const chat = model.startChat({
            history: fullHistory,
        });

        const userPrompt = history[history.length - 1].text;

        const result = await chat.sendMessage(userPrompt);
        const response = await result.response;
        const modelText = response.text();

        return NextResponse.json({
            success: true,
            message: modelText,
        });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }
}