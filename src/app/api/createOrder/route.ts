import { NextResponse } from "next/server";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_SECRET_ID || "",
});


export async function POST(req: Request) {
    try {
        const { amount } = await req.json();
        console.log(amount);

        const order = await razorpay.orders.create({
            amount: amount * 30000,  // Razorpay expects amount in paise
            currency: "INR",
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Razorpay order creation failed:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}