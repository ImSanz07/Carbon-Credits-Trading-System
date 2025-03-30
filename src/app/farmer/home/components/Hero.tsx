"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroProps {
  aadhar: string;
}

const Hero: React.FC<HeroProps> = ({ aadhar }) => {
  const [farmerInfo, setFarmerInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmerInfo = async () => {
      try {
        const response = await axios.get(
          `/api/farmer/profile/fetchUserInfo/${aadhar}`
        );
        setFarmerInfo(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch farmer data");
      } finally {
        setLoading(false);
      }
    };

    if (aadhar) {
      fetchFarmerInfo();
    }
  }, [aadhar]);

  if (loading) return <HeroSkeleton />;
  if (error)
    return (
      <div className="text-red-500 bg-red-100 p-3 rounded-md text-center">
        Error fetching user info: {error}
      </div>
    );

  return (
    <div className="container mx-auto py-3">
      {/* Farmer Info Section */}
      <div className="mb-8 bg-white rounded-xl p-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome,{" "}
              <span className="text-green-700">
                {farmerInfo?.name || "Farmer"}
              </span>
            </h2>
            <p className="text-muted-foreground">
              Here's your carbon credits summary for today
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            <InfoCard title="Phone" value={farmerInfo?.phoneNumber} />
            <InfoCard title="Aadhaar Number" value={farmerInfo?.aadharNumber} />
            <InfoCard
              title="Recent Carbon Credits"
              value={
                farmerInfo?.carbonCreditsHistory?.length
                  ? farmerInfo.carbonCreditsHistory.at(-1).creditsEarned
                  : 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }: { title: string; value?: string }) => (
  <div className="flex flex-col p-3 bg-green-50 rounded-lg w-full">
    <span className="text-xs text-muted-foreground">{title}</span>
    <span className="font-medium text-green-700 ">{value || "N/A"}</span>
  </div>
);

const HeroSkeleton = () => (
  <div className="container mx-auto p-6">
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <Skeleton className="h-8 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

export default Hero;
