// models/MSME.js
import mongoose from 'mongoose';

const msmeSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    gstin: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: {
        fullAddress: { type: String, required: true }, // Full address field
        district: { type: String, required: true }, // District
        state: { type: String, required: true }, // State
        zipCode: { type: String, required: true }, // Zip Code
    },
    password: { type: String, required: true, select: true },
    carbonCreditPurchases: [{
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    }],
    emissions: [{
        amount: { type: Number, required: true }, // Emissions value
        date: { type: String, required: true }, // Date in MM-YYYY format
    }],
}, { timestamps: true });

export const MSME = mongoose.models?.MSME || mongoose.model("MSME", msmeSchema);

