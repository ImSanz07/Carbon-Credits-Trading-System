"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroProps {
    gstin: string;
}

const Hero: React.FC<HeroProps> = ({ gstin }) => {
    const [msmeInfo, setMsmeInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMsmeInfo = async () => {
            try {
                const response = await axios.get(`/api/msme/profile/fetchUserInfo/${gstin}`);
                setMsmeInfo(response.data);
            } catch (err) {
                setError("Failed to fetch MSME data");
            } finally {
                setLoading(false);
            }
        };

        if (gstin) {
            fetchMsmeInfo();
        }
    }, [gstin]);

    if (loading) return <HeroSkeleton />;
    if (error) return <div className="text-red-500">Error fetching user info: {error}</div>;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-800">
                Welcome, <span className="text-green-600">{msmeInfo.businessName}</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="font-semibold text-green-700">Contact Person</p>
                    <p>{msmeInfo.contactPerson}</p>
                </div>
                <div>
                    <p className="font-semibold text-green-700">Phone</p>
                    <p>{msmeInfo.phoneNumber}</p>
                </div>
                <div>
                    <p className="font-semibold text-green-700">Email</p>
                    <p>{msmeInfo.email}</p>
                </div>
            </div>
        </div>
    );
};

const HeroSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
    </div>
);

export default Hero;