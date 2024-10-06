"use client";

import React from 'react'
import {
    Card
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { Toggle } from '@radix-ui/react-toggle';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserInfoProps {
    gstin: string;
}


const UserInfo:React.FC<UserInfoProps> = ({ gstin }) => {
    const [msmeInfo, setMsmeInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmerInfo = async () => {
            try {
                const response = await axios.get(`/api/msme/profile/fetchUserInfo/${gstin}`);
                setMsmeInfo(response.data);
            } catch (err) {
                setError('Failed to fetch farmer data');
            } finally {
                setLoading(false);
            }
        };

        if (gstin) {
            fetchFarmerInfo();
        }
    }, [gstin]);


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

  return (
    <>
        <h2>
            This will be the MSME info
        </h2>
          <div className="flex items-center justify-center h-auto mt-20">
              <Card className="w-[60%] p-6 shadow-md">
                  <div className="mb-4">
                      <h2 className="text-2xl font-semibold">Account Information</h2>
                      <h3 className="text-xl">Business Name: {msmeInfo.businessName} </h3>

                      <p className="text-gray-500">
                          GSTIN : {msmeInfo.gstin} 
                      </p>

                  </div>

                  <div className="mt-4">
                      <h3 className="text-lg font-semibold">Contact Details:</h3>
                      <div className="mt-2 bg-gray-100 p-2 rounded flex items-center justify-between">
                          <div>
                              <p className="font-medium text-gray-800">Contact Person:</p>
                              <p className="text-gray-500"> {msmeInfo.contactPerson}</p>
                          </div>
                          <Button className="ml-2">Edit</Button>
                      </div>

                      <div className="mt-2 bg-gray-100 p-2 rounded">
                          <p className="font-medium text-gray-800">Email:</p>
                          <p className="text-gray-500">{msmeInfo.email}</p>
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded">
                          <p className="font-medium text-gray-800">Contact Number:</p>
                          <p className="text-gray-500">{msmeInfo.phoneNumber}</p>
                      </div>
                  </div>

                  <div className="mt-4">
                      <h3 className="text-lg font-semibold">Location Details:</h3>
                      <div className="mt-2 bg-gray-100 p-2 rounded flex items-center justify-between">
                          <div>
                              <p className="font-medium text-gray-800">Full Address:</p>
                              <p className="text-gray-500">{msmeInfo.address.fullAddress}</p>
                          </div>
                          <Button className="ml-2">Edit</Button>
                      </div>

                      <div className="mt-2 bg-gray-100 p-2 rounded">
                          <p className="font-medium text-gray-800">District:</p>
                          <p className="text-gray-500">{msmeInfo.address.district}</p>
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded">
                          <p className="font-medium text-gray-800">State:</p>
                          <p className="text-gray-500">{msmeInfo.address.state}</p>
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded">
                          <p className="font-medium text-gray-800">Zip Code:</p>
                          <p className="text-gray-500">{msmeInfo.address.zipCode}</p>
                      </div>
                  </div>
              </Card>
          </div> 
    </>
  )
}

export default UserInfo