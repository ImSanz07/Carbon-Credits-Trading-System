import { auth } from '@/auth';
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster as Toaster } from "@/components/ui/toaster"
import { Toaster as ToasterSonner } from "@/components/ui/sonner"
import '../app/globals.css'

export const metadata: Metadata = {
  title: "EcoCredits",
  description: "A Carbon Credits Trading Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();  // Fetch session information

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Wrap your app with SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
        <ToasterSonner />
      </body>
    </html>
  );
}
