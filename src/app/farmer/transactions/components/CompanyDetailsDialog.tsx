"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, MapPin, Phone, Mail, BarChart2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompanyDetails {
    businessName: string;
    currentEmissions: number;
    address: {
        fullAddress: string;
        district: string;
        state: string;
    };
    gstin: string;
    contactPerson: string;
    phoneNumber: string;
    email: string;
}

interface CompanyDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    gstin: string | null;
}

export default function CompanyDetailsDialog({ isOpen, onClose, gstin }: CompanyDetailsDialogProps) {
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            if (gstin) {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch('/api/farmer/fetchCompanyDetails', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ gstin }),
                    });
                    if (!response.ok) throw new Error("Failed to fetch company details");
                    const data = await response.json();
                    if (data.success) {
                        setCompanyDetails(data.msmeDetails);
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
            setCompanyDetails(null);
        }
    }, [isOpen, gstin]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">MSME Details</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : companyDetails ? (
                    <div className="mt-4 space-y-4">
                        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                            <CardContent className="flex items-center space-x-4 p-4">
                                <Building className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="font-semibold text-lg">{companyDetails.businessName}</p>
                                    <Badge variant="secondary" className="mt-1">{companyDetails.gstin}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center space-x-4 p-4">
                                <MapPin className="h-6 w-6 text-green-600" />
                                <div>
                                    <p className="font-semibold">Business Address</p>
                                    <p className="text-sm text-gray-600">{companyDetails.address.fullAddress}</p>
                                    <p className="text-sm text-gray-600">{companyDetails.address.district}, {companyDetails.address.state}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-r from-red-50 to-orange-50">
                            <CardContent className="flex items-center space-x-4 p-4">
                                <BarChart2 className="h-6 w-6 text-red-600" />
                                <div>
                                    <p className="font-semibold">Current Emissions</p>
                                    <p className="text-lg font-bold text-red-600">{companyDetails.currentEmissions} tons CO2e</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="space-y-3 p-4">
                                <p className="font-semibold text-lg">Contact Information</p>
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-gray-600" />
                                    <p className="text-sm font-medium">{companyDetails.contactPerson}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                    <p className="text-sm">{companyDetails.phoneNumber}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-gray-600" />
                                    <p className="text-sm">{companyDetails.email}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : null}
                <Button onClick={onClose} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Close</Button>
            </DialogContent>
        </Dialog>
    );
}