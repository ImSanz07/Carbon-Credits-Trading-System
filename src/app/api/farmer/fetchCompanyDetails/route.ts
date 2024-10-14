import { connectToDatabase } from "@/lib/utils";
import { MSME } from "@/models/MSME";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await connectToDatabase();

    try {

        const { gstin } = await request.json();
        // Validate the GSTIN
        if (!gstin) {
            return NextResponse.json({ success: false, message: "GSTIN is required" }, { status: 400 });
        }

        const msmeDetails = await MSME.findOne({ gstin: gstin }).select("-password");

        if (!msmeDetails) {
            return NextResponse.json({ success: false, message: "MSME not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msmeDetails });

    } catch (error) {
        console.error("Error fetching MSME details:", error);
        return NextResponse.json({ success: false, message: "An error occurred while fetching MSME details" }, { status: 500 });
    }
}
