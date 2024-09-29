
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import { MSME } from '@/models/MSME';
import { error, log } from 'console';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json()
        const { businessName, gstin, contactPerson, email, phoneNumber, password, businessAddress } = reqBody;

        await connectToDatabase();
        const msme = await MSME.findOne({ businessName })
        if(msme){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const hashedPassword = await bcryptjs.hash(password,10)

        const newMSME = new MSME({
            businessName,
            gstin,
            contactPerson,
            email,
            phoneNumber,
            businessAddress,
            password: hashedPassword,
        })

        const savedMSME = await newMSME.save()
        console.log(savedMSME);

        return NextResponse.json({message:"Signup Successful"},{status:201})
              
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }       
}
    
