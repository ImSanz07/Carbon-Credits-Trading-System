import { NextRequest, NextResponse } from "next/server";
import dialogflow from "@google-cloud/dialogflow";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Load Dialogflow Key
// const keyPath = path.resolve("./public/dialogflow-key.json");
const keyPath = path.resolve(process.cwd(), "dialogflow-key.json");
const sessionClient = new dialogflow.SessionsClient({ keyFilename: keyPath });

// Function to send user query to Dialogflow
async function detectIntent(
    projectId: string,
    sessionId: string,
    query: string,
    languageCode = "en"
) {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult;
}

// Handle API Route
export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();
        const sessionId = uuidv4();
        const projectId = "agribot-tqec"; // Replace with your Dialogflow Project ID

        const result = await detectIntent(projectId, sessionId, query);
        if (!result || !result.fulfillmentText) {
            return NextResponse.json({ error: "No response from Dialogflow" }, { status: 500 });
        }
        return NextResponse.json({ response: result.fulfillmentText });
    } catch (error) {
        console.error("Error with Dialogflow:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
