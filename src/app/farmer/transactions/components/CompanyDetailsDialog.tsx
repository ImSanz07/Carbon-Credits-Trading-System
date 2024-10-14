// components/CompanyDetailsDialog.tsx
"use client"; // Ensure this file is client-side

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Adjust based on your UI library
import React, { useEffect, useState } from "react";

interface Transaction {
    buyer_gstin: string;
    orderId: string;
    creditsSold: number;
    dateTime: string; // Change to Date if necessary
    // Add other fields as necessary
}

interface CompanyDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    gstin: string | null; // Pass the GSTIN instead of the entire transaction
}

const CompanyDetailsDialog: React.FC<CompanyDetailsDialogProps> = ({ isOpen, onClose, gstin }) => {
    const [companyDetails, setCompanyDetails] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            if (gstin) {
                setLoading(true);
                setError(null); // Reset error state

                try {
                    const response = await fetch('/api/farmer/fetchCompanyDetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ gstin }),
                    }); // Adjust the API endpoint
                    if (!response.ok) {
                        throw new Error("Failed to fetch company details");
                    }
                    const data = await response.json();

                    console.log(data);
                    
                    

                    if (data.success) {
                        setCompanyDetails(data.msmeDetails); // Assuming your API response structure
                    } else {
                        setError("No company details found");
                    }
                } catch (err) {
                    console.error(err);
                    setError("An error occurred while fetching company details");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (isOpen) {
            fetchCompanyDetails();
        } else {
            setCompanyDetails(null); // Reset when dialog closes
        }
    }, [isOpen, gstin]);

    if (loading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Company Details</DialogTitle>
                    </DialogHeader>
                    <p>Loading company details...</p>
                </DialogContent>
            </Dialog>
        );
    }

    if (error) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Company Details</DialogTitle>
                    </DialogHeader>
                    <p>{error}</p>
                    <button onClick={onClose} className="mt-4">Close</button>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-gray-800">MSME Details</DialogTitle>
                </DialogHeader>
                {loading && <p className="text-center text-gray-500">Loading company details...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {companyDetails && (
                    <div className="mt-4">
                        <p ><strong>Name:</strong> {companyDetails.businessName}</p>
                        <p ><strong>Current Emissions:</strong> {companyDetails.currentEmissions}</p>
                        <div>
                            <p><strong>Business Address:</strong></p>
                            <p>{companyDetails.address.fullAddress}</p>
                            <p>{companyDetails.address.district}, {companyDetails.address.state}</p>
                        </div>
                        <p ><strong>GSTIN:</strong> {companyDetails.gstin}</p>

                        <DialogHeader>
                            <DialogTitle className="text-xl mt-4">Contact Information</DialogTitle>
                        </DialogHeader>
                        <p ><strong>Contact Person:</strong> {companyDetails.contactPerson}</p>
                        <p ><strong>Phone Number:</strong> {companyDetails.phoneNumber}</p>

                        {/* Add more details as necessary */}
                    </div>
                )}
                <button onClick={onClose} className="mt-6 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200">Close</button>
            </DialogContent>
        </Dialog>
    );
};

export default CompanyDetailsDialog;
