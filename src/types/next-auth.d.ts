import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        type: "farmer" | "msme"; // or you can use any other type that you are expecting
        _id?:string;
        businessName?:string;
        gstin?: string;
        contactPerson?: string;
        businessAddress?:string;
        phoneNumber?:string;
        currentEmissions?:Number;
        aadharNumber?: string;


    }

    interface Session {
        user: User;
        user:{
            _id?: string;
            businessName?: string;
            gstin?: string;
            contactPerson?: string;
            businessAddress?: string;
            phoneNumber?: string;
            currentEmissions?: Number;
            type: "farmer" | "msme";
            aadharNumber?: string;


        } & DefaultSession['user']
        
    }
}
