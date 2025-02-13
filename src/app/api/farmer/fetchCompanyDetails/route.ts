import { connectToDatabase } from "@/lib/utils";
import { MSME } from "@/models/MSME";
import { NextRequest, NextResponse } from "next/server";

// Mark as dynamic since we're using database operations
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        // Try to connect to the database
        await connectToDatabase();
    } catch (dbError) {
        console.error("Database connection failed:", dbError);
        return NextResponse.json(
            { success: false, message: "Database connection failed" },
            { status: 503 }
        );
    }

    try {
        const { gstin } = await request.json();

        // Validate the GSTIN
        if (!gstin) {
            return NextResponse.json(
                { success: false, message: "GSTIN is required" },
                { status: 400 }
            );
        }

        const msmeDetails = await MSME.findOne({ gstin: gstin }).select("-password");

        if (!msmeDetails) {
            return NextResponse.json(
                { success: false, message: "MSME not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, msmeDetails });
    } catch (error) {
        console.error("Error fetching MSME details:", error);
        return NextResponse.json(
            { success: false, message: "An error occurred while fetching MSME details" },
            { status: 500 }
        );
    }
}