import { connectToDatabase } from '@/lib/utils';
import { Farmer } from '@/models/Farmer';
import { NextRequest, NextResponse } from 'next/server';

interface CarbonCreditsEntry {
    month: string;
    creditsEarned: number;
}

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { aadharNumber, month, creditsEarned } = reqBody;

        await connectToDatabase();
        console.log('Received Aadhar Number:', aadharNumber);

        const farmer = await Farmer.findOne({ aadharNumber });

        if (!farmer) {
            return NextResponse.json({ error: "Farmer Not Found" }, { status: 400 });
        }

        // Check if the month already exists in the carbonCreditsHistory array
        const monthExists = farmer.carbonCreditsHistory.some((entry: CarbonCreditsEntry) => entry.month === month);

        if (monthExists) {
            // If the month exists, update the creditsEarned for that month
            await Farmer.updateOne(
                { aadharNumber: aadharNumber, 'carbonCreditsHistory.month': month },
                {
                    $set: { 'carbonCreditsHistory.$.creditsEarned': creditsEarned }
                }
            );
            return NextResponse.json({ message: "Credits updated for existing month" }, { status: 200 });
        } else {
            // If the month doesn't exist, push a new entry into the array
            await Farmer.updateOne(
                { aadharNumber: aadharNumber },
                {
                    $push: {
                        carbonCreditsHistory: {
                            month: month,
                            creditsEarned: creditsEarned
                        }
                    }
                }
            );
            return NextResponse.json({ message: "Credits added for new month" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error in updating farmer's credits:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
