import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { DefaultSession } from "next-auth";
import type { User as DefaultUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Define custom user properties
interface IUser {
    _id: string;
    businessName?: string;
    contactPerson?: string;
    phoneNumber?: string;
    currentEmissions?: number;
    type: "farmer" | "msme";
    aadharNumber?: string;
    gstin?: string;
    state?: string;
}

// Extend next-auth types
declare module "next-auth" {
    interface Session {
        user: IUser & DefaultSession["user"];
    }
    interface User extends IUser { }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser { }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            id: "farmer-credentials",
            name: "Farmer Credentials",
            credentials: {
                aadharNumber: {
                    label: "Aadhar Number",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.aadharNumber || !credentials?.password) {
                        throw new Error("Missing credentials");
                    }

                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authenticate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userType: "farmer",
                            identifier: credentials.aadharNumber,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.error || "Authentication failed");
                    }

                    const user = await res.json();
                    return user as IUser;

                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
        CredentialsProvider({
            id: "msme-credentials",
            name: "MSME Credentials",
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
            async authorize(credentials) {
                try {
                    if (!credentials?.gstin || !credentials?.password) {
                        throw new Error("Missing credentials");
                    }

                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authenticate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userType: "msme",
                            identifier: credentials.gstin,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.error || "Authentication failed");
                    }

                    const user = await res.json();
                    return user as IUser;

                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                // Initial sign in
                if (user._id) {
                    token._id = user._id;
                }
                token.businessName = user.businessName;
                token.contactPerson = user.contactPerson;
                token.phoneNumber = user.phoneNumber;
                token.currentEmissions = user.currentEmissions;
                token.aadharNumber = user.aadharNumber;
                token.gstin = user.gstin;
                token.state = user.state;
                token.type = user.type;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.user = {
                ...session.user,
                _id: token._id,
                businessName: token.businessName,
                contactPerson: token.contactPerson,
                phoneNumber: token.phoneNumber,
                currentEmissions: token.currentEmissions,
                type: token.type as "farmer" | "msme",
                aadharNumber: token.aadharNumber,
                gstin: token.gstin,
                state: token.state,
            };
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === "development",
});