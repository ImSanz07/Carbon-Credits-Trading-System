import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        type: "farmer" | "msme"; // or you can use any other type that you are expecting
        _id?:string;
        businessName?:string;
        gstin?: string;
        contactPerson?: string;
        phoneNumber?:string;
        currentEmissions?:Number;
        aadharNumber?: string;
        state?:string;
        address?: {
            fullAddress?: string;
            state?: string;
            district?: string;
            zipCode?: string;
        };


    }

    interface Session {
        user:{
            _id?: string;
            businessName?: string;
            gstin?: string;
            contactPerson?: string;
            address?: {
                fullAddress?: string;
                state?: string;
                district?: string;
                zipCode?: string;
            };
            phoneNumber?: string;
            currentEmissions?: Number;
            type: "farmer" | "msme";
            aadharNumber?: string;
            state?:string;
        } & DefaultSession['user']
        
    }
}
