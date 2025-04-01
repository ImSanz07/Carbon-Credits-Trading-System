import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/utils";
import { Farmer } from "@/models/Farmer";
import { MSME } from "@/models/MSME";

export async function POST(req: NextRequest) {
    try {
        console.log("[AUTH] Incoming Request");

        const { userType, identifier, password } = await req.json();
        console.log("[AUTH] Request Data:", { userType, identifier });

        if (!userType || !identifier || !password) {
            console.warn("[AUTH] Missing required fields");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectToDatabase();
        console.log("✅ [DB] Connected to MongoDB");

        let user;
        if (userType === "farmer") {
            user = await Farmer.findOne({ aadharNumber: identifier })
                .select("+password") // Explicitly include password 
                .lean(); // Convert to plain JavaScript object
            console.log("[DB] Farmer Found:", user);
        } else if (userType === "msme") {
            user = await MSME.findOne({ gstin: identifier })
                .select("+password")
                .lean();
            console.log("[DB] MSME Found:", user);
        } else {
            console.warn("[AUTH] Invalid user type");
            return NextResponse.json(
                { error: "Invalid user type" },
                { status: 400 }
            );
        }


        if (!user) {
            console.warn("[AUTH] User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
        }

        // Password Check
        const isPasswordValid = await compare(password, user.password);
        console.log("[AUTH] Password Valid:", isPasswordValid);

        if (!isPasswordValid) {
            console.warn("[AUTH] Invalid credentials");
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Preparing safe user data
        const { password: _, ...safeUser } = user;
        console.log("[AUTH] Authenticated User:", safeUser);

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
        console.error("[AUTH] Authentication error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
