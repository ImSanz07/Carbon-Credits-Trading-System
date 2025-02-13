import { connectToDatabase } from '@/lib/utils';
import { Farmer } from '@/models/Farmer';
import { NextRequest, NextResponse } from 'next/server';

// Mark as dynamic since this is a dynamic route with [aadharNumber]
export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    { params }: { params: { aadharNumber: string } }
) {
    try {
        // Try to connect to the database
        await connectToDatabase();
    } catch (dbError) {
        console.error("Database connection failed:", dbError);
        return NextResponse.json(
            { success: false, error: "Database connection failed" },
            { status: 503 }
        );
    }

    try {
        const { aadharNumber } = params;

        if (!aadharNumber) {
            return NextResponse.json(
                { success: false, error: "Aadhar number is required" },
                { status: 400 }
            );
        }

        const farmer = await Farmer.findOne({ aadharNumber: aadharNumber });

        if (!farmer) {
            return NextResponse.json(
                { success: false, error: "Farmer not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: farmer },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching farmer details:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}