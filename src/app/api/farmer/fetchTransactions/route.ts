import { auth } from "@/auth";
import { Transaction } from "@/models/Transactions";
import { NextRequest, NextResponse } from "next/server";

// Add this line to explicitly mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await auth();
        const aadharNumber = user?.user.aadharNumber || '';

        const transactions = await Transaction.aggregate([
            { $unwind: "$creditsAllocation" },
            {
                $match: {
                    "creditsAllocation.farmerAadharNumber": aadharNumber
                }
            },
            {
                $project: {
                    buyer_gstin: 1,
                    paymentId: 1,
                    orderId: 1,
                    amount: 1,
                    totalCreditsPurchased: "$creditsBought",
                    district: 1,
                    dateTime: 1,
                    creditsSold: "$creditsAllocation.creditsBought"
                }
            }
        ]);

        return NextResponse.json({ success: true, transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}