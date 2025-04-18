import { NextResponse } from "next/server";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_ID,
});


export async function POST(req: Request) {
    const { amount } = await req.json();
    console.log(amount);


    const order = await razorpay.orders.create({
        amount: amount * 30000,
        currency: "INR",
    });
    return NextResponse.json(order);
}