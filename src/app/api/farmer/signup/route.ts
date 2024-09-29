import { connectToDatabase } from "@/lib/utils";
import { Farmer } from "@/models/Farmer";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';



export async function POST(request:NextRequest) {


    try {
        const reqBody = await request.json();
        const { name, aadharNumber, password } = reqBody;
        console.log("request body",reqBody);


        //Database Connecttion
        await connectToDatabase();
        console.log("Connected to ds");
        
        const farmer = await Farmer.findOne({ aadharNumber });
        if(farmer){
            return NextResponse.json({error:"User Already exists"},{status:400});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        const newFarmer = new Farmer({
            name,
            aadharNumber,
            password:hashedPassword,
        })
        const savedFarmer = await newFarmer.save();
        console.log("Saved user",savedFarmer);

        return NextResponse.json({message:"Signup Successful"},{status:201})

        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } 
    
}