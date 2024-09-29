import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { Farmer } from "./models/Farmer";
import { connectToDatabase } from "./lib/utils";
import { compare } from "bcryptjs";
import { MSME } from "./models/MSME";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "farmer-credentials",
            name:"Credentials",
            credentials:{
                aadharNumber:{
                    label: "Aadhar Number",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async(credentials)=>{
                const aadharNumber = credentials.aadharNumber as string|undefined;
                const password = credentials.password as string|undefined;
                console.log("User Details:", aadharNumber, password);

                if(!aadharNumber||!password) throw new CredentialsSignin("Please Enter Both Details")

                await connectToDatabase()
                const user = await Farmer.findOne({ aadharNumber })

                if (!user) throw new CredentialsSignin({ cause: "Invalid Email or Password" })
                    
                const isMatch = await compare(password, user.password);

                if (!isMatch)
                    throw new CredentialsSignin({ cause: "Invalid Email or Password" })
                console.log("User Details:", user);
                user.type='farmer'


                return user

            }

        }),
        Credentials({
            id: "msme-credentials",
            name: "CredentialsMSME",
            credentials: {
                gstin: {
                    label: "GSTIN",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                const gstin = credentials.gstin as string | undefined;
                const password = credentials.password as string | undefined;
                console.log("User Details:", gstin,password);

                if (!gstin || !password) throw new CredentialsSignin("Please Enter Both Details")

                await connectToDatabase()
                const user = await MSME.findOne({ gstin })

                if (!user) throw new CredentialsSignin({ cause: "User not exists" })

                const isMatch = await compare(password, user.password);

                if (!isMatch)
                    throw new CredentialsSignin({ cause: "Invalid GSTIN or Password" })
                
                console.log("User Details:", user);
                user.type='msme'


                return user

            }

        }),


    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id=user._id?.toString()
                token.businessName=user.businessName;
                token.contactPerson=user.contactPerson; 
                token.phoneNumber = user.phoneNumber;
                token.businessAddress = user.businessAddress; 
                token.currentEmissions = user.currentEmissions;
                token.type=user.type; 
                token.aadharNumber=user.aadharNumber;


            }
            
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id?.toString();
                session.user.businessName = token.businessName?.toString();
                session.user.contactPerson = token.contactPerson?.toString();
                session.user.phoneNumber = token.phoneNumber?.toString();
                session.user.businessAddress = token.businessAddress?.toString();
                session.user.currentEmissions = token.currentEmissions;
                session.user.type = token.type?.toString();
                session.user.aadharNumber=token.aadharNumber?.toString();

            }
            
            return session
        }
    },
    
    
    session:{
        strategy:'jwt',
    },
    pages:{
        signIn:"/login"
    }
})