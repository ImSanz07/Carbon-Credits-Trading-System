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
        Loading...
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
        <div className="grid gap-6 md:grid-cols-2">
          {/* Farmer Information Card */}
          <Card className="col-span-2 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800 flex items-center">
                <Avatar name={farmerInfo.name} />
                <span className="ml-4">{farmerInfo.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Aadhar Number
                </h3>
                <p className="text-gray-600 mt-1">{farmerInfo.aadharNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <ContactCard
            phoneNumber={farmerInfo.phoneNumber}
            address={farmerInfo.address}
          />
          <QuickActions />
          <UpdateInfoCard />
          <SellCreditsCard />
        </div>
      </main>
    </div>
  );
};

export default UserInfo;
