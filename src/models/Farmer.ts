// models/Farmer.js
import mongoose, { mongo } from 'mongoose';

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    carbonCreditsHistory: [{
        month: { type: String, required: true }, // e.g. "2024-09" (year-month format)
        creditsEarned: { type: Number, required: true, default: 0 }
    }], 
    address: {
        fullAddress: { type: String, required: true }, // Full address field
        district: { type: String, required: true }, // District
        state: { type: String, required: true }, // State
        zipCode: { type: String, required: true }, // Zip Code
    },
});

export const Farmer = mongoose.models?.Farmer || mongoose.model("Farmer",farmerSchema)


