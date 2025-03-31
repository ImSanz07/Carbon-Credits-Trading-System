"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "./Avatar";
import ContactCard from "./ContactCard";
import QuickActions from "./QuickActions";
import UpdateInfoCard from "./UpdateInfoCard";
import SellCreditsCard from "./SellCreditsCard";

interface UserInfoProps {
  aadharNumber: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ aadharNumber }) => {
  const [farmerInfo, setFarmerInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmerInfo = async () => {
      try {
        const response = await axios.get(
          `/api/farmer/profile/fetchUserInfo/${aadharNumber}`
        );
        setFarmerInfo(response.data.data);
      } catch (err) {
        setError("Failed to fetch farmer data");
      } finally {
        setLoading(false);
      }
    };

    if (aadharNumber) {
      fetchFarmerInfo();
    }
  }, [aadharNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-lg font-medium text-green-800 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto px-4 py-8">
        {/* Farmer Information Card */}
        <Card className="col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="flex items-center bg-green-100 px-6 py-4">
            <Avatar name={farmerInfo.name} />
            <span className="ml-4 text-2xl font-semibold text-green-800">
              {farmerInfo.name}
            </span>
          </CardHeader>
          <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Aadhar Number
              </h3>
              <p className="text-gray-600 mt-1">{farmerInfo.aadharNumber}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Email Address
              </h3>
              <p className="text-gray-600 mt-1">{farmerInfo.email || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              <p className="text-gray-600 mt-1">
                {farmerInfo.location || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cards Grid */}
        <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* QuickActions Card */}
          <div className="col-span-1 order-1">
            <QuickActions />
          </div>

          {/* ContactCard should go below QuickActions */}
          <div className="col-span-1 order-2 sm:order-2">
            <ContactCard
              phoneNumber={farmerInfo.phoneNumber}
              address={farmerInfo.address}
            />
          </div>

          {/* UpdateInfoCard & SellCreditsCard on larger screens */}
          <div className="col-span-1 order-3 sm:order-3">
            <UpdateInfoCard />
          </div>
          <div className="col-span-1 order-4 sm:order-4">
            <SellCreditsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserInfo;
