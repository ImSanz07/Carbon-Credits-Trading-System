import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/utils";
import { MSME } from "@/models/MSME";



export async function GET(req: NextRequest, { params }: { params: { gstin: string } }) {
    const { gstin } = params;

    await connectToDatabase();

    try {
        const msme = await MSME.findOne({ gstin: gstin });
        if (!msme) {
            return NextResponse.json({ error: 'MSME not found' }, { status: 404 });
        }

        return NextResponse.json(msme, { status: 200 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }
    ;

}