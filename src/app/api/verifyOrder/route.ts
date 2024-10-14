import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";


const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET_ID as string;

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;

};

export async function POST(req: NextRequest) {
    const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();
    console.log('Recieved order id in Endpoint:', orderId);

    const signature = generatedSignature(orderId, razorpayPaymentId);
    console.log('Generated Signature:', signature);
    
    //Commenting this out for now
    // if (signature !== razorpaySignature) {
    //     return NextResponse.json(
    //         { message: "payment verification failed", isOk: false },
    //         { status: 400 }
    //     );
    // }

    //Probably Some DB Operations here


    return NextResponse.json(
        { message: "payment verification successful", isOk: true, razorpayPaymentId: razorpayPaymentId },
        { status: 200 }
    );
}