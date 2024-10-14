// pages/api/msme/marketplace/getCarbonCreditHistory/[district].ts


// Define an interface for the Carbon Credits History
interface CarbonCreditsHistory {
    month: string;
    creditsEarned: number;
}

// Define an interface for a Farmer
interface Farmer {
    aadharNumber: string;
    carbonCreditsHistory: CarbonCreditsHistory[];
}


import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/utils";
import { Farmer as FarmerModel } from "@/models/Farmer"; 

export async function GET(req: NextRequest, { params }: { params: { district: string } }) {
    const { district } = params;

    await connectToDatabase();

    try {
        // Fetch farmers by district and include their historical carbon credits
        const farmers: Farmer[] = await FarmerModel.find(
            { "address.district": district }, // Match farmers from the given district
            { aadharNumber: 1, carbonCreditsHistory: 1 } // Include aadharNumber and carbonCreditsHistory fields
        );

        if (farmers.length === 0) {
            return NextResponse.json({ message: 'No farmers found for this district.' }, { status: 404 });
        }

        // Map farmers to a simpler structure with historical credits
        const historicalCredits = farmers.map((farmer) => ({
            aadharNumber: farmer.aadharNumber,
            carbonCreditsHistory: farmer.carbonCreditsHistory.map((record: CarbonCreditsHistory) => ({
                month: record.month,
                creditsEarned: record.creditsEarned,
            })),
        }));

        console.log(historicalCredits);

        return NextResponse.json(historicalCredits, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
