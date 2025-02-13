import { auth } from "@/auth";
import { Transaction } from "@/models/Transactions";
import { NextResponse } from "next/server";

// Mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await auth();
        const gstin = user?.user.gstin || '';
        console.log(gstin);

        const transactions = await Transaction.find({
            buyer_gstin: gstin
        }).select('-creditsAllocation');

        return NextResponse.json({ success: true, transactions });

    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}