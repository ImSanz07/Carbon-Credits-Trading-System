// app/api/farmers/route.js
import { connectToDatabase } from "@/lib/utils"; // Adjust the path as necessary
import { Farmer } from "@/models/Farmer"; // Adjust the path as necessary
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase(); // Connect to the database
        const farmers = await Farmer.find().lean(); // Get all farmers

        return NextResponse.json(farmers); // Return JSON response
    } catch (error) {
        console.error("Error fetching farmers:", error);
        return NextResponse.json({ error: "Failed to fetch farmers." }, { status: 500 });
    }
}
