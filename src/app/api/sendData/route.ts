import { connectToDatabase } from '@/lib/utils';
import { Farmer } from '@/models/Farmer';
import { NextRequest, NextResponse } from 'next/server';

interface CarbonCreditsEntry {
    month: string;
    creditsEarned: number;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { aadharNumber, month, creditsEarned } = reqBody;

        if (!aadharNumber || !month || creditsEarned === undefined) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const farmer = await Farmer.findOne({ aadharNumber });

        if (!farmer) {
            return NextResponse.json(
                { error: "Farmer Not Found" },
                { status: 404 }
            );
        }

        // Check if the month already exists in the carbonCreditsHistory array
        const monthExists = farmer.carbonCreditsHistory.some(
            (entry: CarbonCreditsEntry) => entry.month === month
        );

        if (monthExists) {
            // Update existing month's credits
            await Farmer.updateOne(
                {
                    aadharNumber,
                    'carbonCreditsHistory.month': month
                },
                {
                    $set: {
                        'carbonCreditsHistory.$.creditsEarned': creditsEarned
                    }
                }
            );

            return NextResponse.json({
                message: "Credits updated for existing month",
                success: true
            });
        }

        // Add new month entry
        await Farmer.updateOne(
            { aadharNumber },
            {
                $push: {
                    carbonCreditsHistory: {
                        month,
                        creditsEarned
                    }
                }
            }
        );

        return NextResponse.json({
            message: "Credits added for new month",
            success: true
        });

    } catch (error) {
        console.error("Error in updating farmer's credits:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// Enable CORS if needed
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';