import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/utils";
import { Farmer } from "@/models/Farmer";

export async function GET(req: NextRequest, { params }: { params: { state: string } }) {
    const { state } = params;

    await connectToDatabase();

    try {
        // Fetch farmers by state and group by district to sum the latest month's credits
        const creditsByDistrict = await Farmer.aggregate([
            {
                $match: { "address.state": state } // Match farmers from the given state
            },
            {
                $project: {
                    district: "$address.district", // Include the district field
                    latestCredit: { $arrayElemAt: ["$carbonCreditsHistory", -1] } // Get the last element of the credits history
                }
            },
            {
                $match: { latestCredit: { $ne: null } } // Ensure we only include farmers with a valid latest credit
            },
            {
                $group: {
                    _id: "$district", // Group by district
                    totalCredits: { $sum: "$latestCredit.creditsEarned" } // Sum up the latest credits
                }
            },
            {
                $project: {
                    _id: 0,
                    district: "$_id", // Rename _id field to district
                    totalCredits: 1 // Keep totalCredits in the result
                }
            }
        ]);
        // console.log(creditsByDistrict);
        

        if (creditsByDistrict.length === 0) {
            return NextResponse.json({ message: 'No credits found for this state.' }, { status: 404 });
        }
   

        return NextResponse.json(creditsByDistrict, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
