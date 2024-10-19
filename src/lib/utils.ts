"use server";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const connectToDatabase = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log(`Connected to Database: ${connection.host}`);

  } catch (error) {
    throw new Error("Error connecting to Database")

  }

}




