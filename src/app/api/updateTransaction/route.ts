
import { auth } from '@/auth';
import { Transaction } from '@/models/Transactions';
import { NextResponse } from 'next/server';
import { Farmer } from '@/models/Farmer';

interface Allocation {
    aadharNumber: string;
    creditsAllocated: number;
}

export async function POST(req: Request) {

    const { orderId, paymentId, allocationObject, creditsBought, amount, dateTime,district } = await req.json();

    const user = await auth();
    // console.log("Logged in users GSTIN:",user?.user.gstin);
    const gstin = user?.user.gstin || '';
      
    //Update the Databases
    console.log(creditsBought);
    
    try {
        //1. Update the Transactions Database
        const newTransaction = new Transaction({
            buyer_gstin: gstin,
            paymentId: paymentId, 
            orderId: orderId,  
            amount: amount/100,
            creditsAllocation: allocationObject.map((allocation:Allocation) => ({
                farmerAadharNumber: allocation.aadharNumber,
                creditsBought: allocation.creditsAllocated,
            })), 
            district: district,
            creditsBought: creditsBought
        });
        await newTransaction.save();


        //2. Loop through the Allocation Object and update the Farmer Database
        for (const allocation of allocationObject) {
            const farmer = await Farmer.findOne({ aadharNumber: allocation.aadharNumber });

            if(!farmer){
                console.error(`Farmer with Aadhar Number ${allocation.aadharNumber} not found`);
                continue;
            }

            //3. Deduct the credits from the last entry in carbonCreditsHistory array

            const lastCreditEntry =  farmer.carbonCreditsHistory[farmer.carbonCreditsHistory.length - 1];

            lastCreditEntry.creditsEarned -= allocation.creditsAllocated;

            //4.Save the updated farmer data
            await farmer.save();
        }

        return NextResponse.json({ success: true, message: 'Transaction and farmer records updated successfully' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to update transaction and farmer records' });
    }
}