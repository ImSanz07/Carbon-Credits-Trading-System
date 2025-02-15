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
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center">
        Welcome, <span className="text-green-600">{farmerInfo?.name}</span>
      </h1>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <InfoCard title="Phone" value={farmerInfo?.phoneNumber} />
        <InfoCard title="Aadhar Number" value={farmerInfo?.aadharNumber} />
        <InfoCard
          title="Recent Carbon Credits"
          value={
            farmerInfo?.carbonCreditsHistory?.length
              ? farmerInfo.carbonCreditsHistory.at(-1).creditsEarned
              : 0
          }
        />
      </div>

      {/* Address Section */}
      <div className="border-t pt-6 mt-4 text-center sm:text-left">
        <h2 className="text-xl font-semibold text-green-800">Address</h2>
        <p className="text-gray-600">
          {farmerInfo?.address?.fullAddress || "N/A"}
        </p>
        <p className="text-gray-600">
          {farmerInfo?.address?.district}, {farmerInfo?.address?.state},{" "}
          {farmerInfo?.address?.zipCode}
        </p>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }: { title: string; value?: string }) => (
  <div className="p-4 border rounded-lg shadow-md bg-gray-50 text-center">
    <p className="font-semibold text-green-700">{title}</p>
    <p className="text-gray-700">{value || "N/A"}</p>
  </div>
);

const HeroSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white shadow-lg rounded-lg">
    <Skeleton className="h-10 w-3/4 mx-auto rounded-md" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  </div>
);

export default Hero;
