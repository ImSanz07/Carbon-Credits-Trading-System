import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import { MSME } from '@/models/MSME';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json()
        const { businessName, gstin, contactPerson, email, phoneNumber, password, businessAddress,zipCode,state,district,fullAddress } = reqBody;

        console.log(gstin);
        

        await connectToDatabase();
        const msme = await MSME.findOne({ gstin })
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
            address:{
                fullAddress,
                district,
                state,
                zipCode,
            },
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
    
