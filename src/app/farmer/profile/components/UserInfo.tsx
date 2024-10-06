"use client";
import {
    Card
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import React, { useEffect, useState } from 'react';



import { Button } from '@/components/ui/button';
import { Toggle } from '@radix-ui/react-toggle';
import { Eye, EyeOff } from 'lucide-react';


// Define the props type for UserInfo
interface UserInfoProps {
    aadharNumber: string; // Explicitly define aadharNumber as a string
}

const UserInfo: React.FC<UserInfoProps> = ({ aadharNumber }) => {
    const [farmerInfo, setFarmerInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAadharVisible, setIsAadharVisible] = useState<boolean>(false);
    // State for Aadhar visibility


    useEffect(() => {
        const fetchFarmerInfo = async () => {
            try {
                const response = await axios.get(`/api/farmer/profile/fetchUserInfo/${aadharNumber}`);
                setFarmerInfo(response.data);
            } catch (err) {
                setError('Failed to fetch farmer data');
            } finally {
                setLoading(false);
            }
        };

        if (aadharNumber) {
            fetchFarmerInfo();
        }
    }, [aadharNumber]);

    if (loading) {
        // Render Skeleton while loading
        return (
            <div className="flex flex-col items-center justify-center h-auto mt-20">
                <Skeleton className="h-[125px] w-[60%] rounded-xl" />
                <div className="space-y-7">
                    <Skeleton className="mt-5 h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>
        );
    }


    if (error) return <div>{error}</div>;
    // Get the last 4 digits of the Aadhar number and format it
    const lastFourDigits = farmerInfo?.aadharNumber.slice(-4);
    const hiddenAadhar = `XXXXXXXX${lastFourDigits}`;
    const fullAadharNumber = farmerInfo?.aadharNumber;


    return (
        <>  
            <div className="flex items-center justify-center h-auto mt-20">
                <Card className="w-[60%] p-6 shadow-md">
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Account Information</h2>
                        <h3 className="text-xl">Name: {farmerInfo?.name}</h3>

                        <p className="text-gray-500">
                            Aadhar Number: {isAadharVisible ? fullAadharNumber : hiddenAadhar}
                        </p>
                        <Toggle
                            aria-label="Toggle Aadhar visibility"
                            onClick={() => setIsAadharVisible(!isAadharVisible)} // Toggle the visibility on click
                        >
                            {isAadharVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Toggle>



                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Details:</h3>
                        <div className="mt-2 bg-gray-100 p-2 rounded flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Full Address:</p>
                                <p className="text-gray-500">{farmerInfo?.address.fullAddress}</p>
                            </div>
                            <Button className="ml-2">Edit</Button>
                        </div>

                        <div className="mt-2 bg-gray-100 p-2 rounded">
                            <p className="font-medium text-gray-800">District:</p>
                            <p className="text-gray-500">{farmerInfo?.address.district}</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-2 rounded">
                            <p className="font-medium text-gray-800">State:</p>
                            <p className="text-gray-500">{farmerInfo?.address.state}</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-2 rounded">
                            <p className="font-medium text-gray-800">Zip Code:</p>
                            <p className="text-gray-500">{farmerInfo?.address.zipCode}</p>
                        </div>
                    </div>
                </Card>
            </div>           
        </>
    )
}

export default UserInfo