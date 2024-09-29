// models/MSME.js
import mongoose from 'mongoose';

const msmeSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    gstin: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    businessAddress: { type: String, required: true },
    password: { type: String, required: true },
    carbonCreditPurchases: [{
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    }],
    currentEmissions: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const MSME = mongoose.models?.MSME || mongoose.model("MSME", msmeSchema);

