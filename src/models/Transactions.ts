import mongoose from 'mongoose';
import moment from 'moment-timezone';


const transactionSchema = new mongoose.Schema({
    buyer_gstin: { type: String, required: true },
    paymentId: { type: String, required: true },
    orderId: { type: String },
    amount: { type: Number },
    dateTime: {  // Updated to store both date and time
        type: Date,
        required: true, 
        default: Date.now, 
    },
    creditsAllocation: [
        {
            farmerAadharNumber: { type: String },
            creditsBought: { type: Number },
        }
    ],
    district: { type: String },
    creditsBought: { type: Number },

});

export const Transaction = mongoose.models?.Transaction || mongoose.model("Transaction", transactionSchema);