"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface HeroProps {
    gstin: string;
}

const Hero: React.FC<HeroProps> = ({ gstin }) => {
    const [msmeInfo, setMsmeInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchFarmerInfo = async () => {
            try {
                const response = await axios.get(
                    `/api/msme/profile/fetchUserInfo/${gstin}`
                );
                setMsmeInfo(response.data);
            } catch (err) {
                setError("Failed to fetch farmer data");
            } finally {
                setLoading(false);
            }
        };

        if (gstin) {
            fetchFarmerInfo();
        }
    }, [gstin]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching user info: {error.message}</div>;

    return (
        <div className=" py-8 px-4 ">
            <div className="container mx-auto">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-5">
                    Welcome, <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold  first:mt-0">{msmeInfo.businessName} </h1>
                </h1>

                <p className="text-lg leading-7 [&:not(:first-child)]:mt-2">
                    <span className="text-muted-foreground">Contact Person: </span>
                    {msmeInfo.contactPerson}
                </p>

                <p className="text-lg leading-7 [&:not(:first-child)]:mt-2">
                    <span className="text-muted-foreground">Phone: </span> {msmeInfo.phoneNumber}
                </p>
                <p className="text-lg leading-7 [&:not(:first-child)]:mt-2">
                    <span className="text-muted-foreground">Email:</span> {msmeInfo.email}
                </p>

            </div>
        </div>
    );
};

export default Hero;
