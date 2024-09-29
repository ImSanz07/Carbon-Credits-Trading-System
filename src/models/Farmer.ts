// models/Farmer.js
import mongoose, { mongo } from 'mongoose';

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aadharNumber: { type: String, required: true }, // Ensure the field name matches
    password: { type: String, required: true },
    carbonCredits: { type: Number, required: true, default: 0 }, 
    // Optional, set default value
});

export const Farmer = mongoose.models?.Farmer || mongoose.model("Farmer",farmerSchema)


