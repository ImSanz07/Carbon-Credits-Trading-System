import { auth } from "@/auth";
import { Transaction } from "@/models/Transactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        const user = await auth();
        const aadharNumber = user?.user.aadharNumber || '';

        // // Temporarily Parse the request body to get the aadharNumber
        // const body = await request.json();
        // const aadharNumber = body.aadharNumber || '';

        const transactions = await Transaction.aggregate([
            {$unwind: "$creditsAllocation"}, //Flatten the creditsAllocation array
            {
                $match:{
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

        // Return the transactions as JSON response
        return NextResponse.json({success:true,transactions});

    }catch(error){
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch transactions' });

    }
    
}