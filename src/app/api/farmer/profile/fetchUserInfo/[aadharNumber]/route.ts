import { connectToDatabase } from '@/lib/utils';
import { Farmer } from '@/models/Farmer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { aadharNumber: string } }){
    const { aadharNumber } = params;

    await connectToDatabase();

    try {
        const farmer = await Farmer.findOne({ aadharNumber: aadharNumber });
        if (!farmer) {
            return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
        }

        return NextResponse.json(farmer, { status: 200 });
        
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        
    }
;

}