import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/utils";
import { Farmer } from "@/models/Farmer";
import { MSME } from "@/models/MSME";
import { log } from "node:console";

export async function POST(req: NextRequest) {
    try {
        const { userType, identifier, password } = await req.json();

        // Validate input
        if (!userType || !identifier || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        console.log("Connected to MongoDB");


        let user;
        if (userType === "farmer") {
            user = await Farmer.findOne({ aadharNumber: identifier })
                .select("+password")  // Explicitly include password field if it's excluded by default
                .lean();  // Convert to plain JavaScript object
        } else if (userType === "msme") {
            user = await MSME.findOne({ gstin: identifier })
                .select("+password")
                .lean();
        } else {
            return NextResponse.json(
                { error: "Invalid user type" },
                { status: 400 }
            );
        }

        console.log("User from DB:", user);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        console.log("User",user);
        
        

        // Remove sensitive data before sending response
        const { password: _, ...safeUser } = user;

        return NextResponse.json({
            _id: safeUser._id.toString(),
            farmerName: safeUser.farmerName || null,
            businessName: safeUser.businessName || null,
            contactPerson: safeUser.contactPerson || null,
            phoneNumber: safeUser.phoneNumber || null,
            currentEmissions: safeUser.currentEmissions || null,
            aadharNumber: safeUser.aadharNumber || null,
            gstin: safeUser.gstin || null,
            state: safeUser.address?.state || null,
            type: userType,
        });

    } catch (error) {
        console.error("Authentication error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';