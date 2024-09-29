"use server";

import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const FarmerLogin = async (aadharNumber:string, password:string)=>{
    try {
        await signIn('farmer-credentials', {
            aadharNumber,
            password,
            redirectTo:"/farmer/home"
        });
        console.log("Auth Funcyion Called");

    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
    }

}

const MSMELogin = async (gstin: string, password: string)=>{
    try {
        await signIn('msme-credentials',{
            gstin,
            password,
        });
        
        
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
        
    }

}

const handleSignOut = async () => {
    await signOut({ redirectTo: '/' }); 
};



export {FarmerLogin,MSMELogin,handleSignOut}