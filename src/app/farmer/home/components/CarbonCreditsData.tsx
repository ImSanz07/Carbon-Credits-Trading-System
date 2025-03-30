"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, TrendingUp, Users } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { fetchCarbonDataCard } from "@/actions/farmer/useCarbonCredits";
import { predictNextMonthCredits } from "../../utils/linearRegression";

interface CarbonCreditsDataProps {
  aadharNumber: string;
}

const CarbonCreditsData: React.FC<CarbonCreditsDataProps> = ({
  aadharNumber,
}) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCarbonCreditsIssued, setTotalCarbonCreditsIssued] = useState(0);
  const [currentCarbonCredits, setCurrentCarbonCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [percentageChange, setPercentageChange] = useState(0);
  const [predictedCredits, setPredictedCredits] = useState(0);
  const [predictedRevenue, setPredictedRevenue] = useState(0);

  useEffect(() => {
    const getCarbonData = async () => {
      setLoading(true);
      try {
        const data = await fetchCarbonDataCard(aadharNumber);
        const maxRevenue = data.totalRevenue * 0.3;
        setTotalRevenue(maxRevenue);
        setTotalCarbonCreditsIssued(data.totalCreditsIssued);
        setCurrentCarbonCredits(data.currentCredits);
        setPercentageChange(data.percentageChange);

        const predictedCredits = predictNextMonthCredits(data.creditsArray);
        const predictedRevenue = predictedCredits * 720;
        setPredictedCredits(predictedCredits);
        setPredictedRevenue(predictedRevenue * 0.3);
      } catch (error) {
        console.error("Error fetching carbon data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCarbonData();
  }, [aadharNumber]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center ">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {/* Predicted Income */}
        <Card className="shadow-md hover:shadow-xl transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Income for This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              for{" "}
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        {/* Total Carbon Credits Issued */}
        <Card className="shadow-md hover:shadow-xl transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Carbon Credits Issued
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCarbonCreditsIssued}</div>
            <p className="text-xs text-muted-foreground">Lifetime issued</p>
          </CardContent>
        </Card>

        {/* Current Carbon Credits */}
        <Card className="shadow-md hover:shadow-xl transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Current Carbon Credits
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCarbonCredits}</div>
            {percentageChange !== 0 && (
              <p
                className={`text-xs ${
                  percentageChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {percentageChange > 0 ? "+" : ""}
                {percentageChange.toFixed(2)}% from last month
              </p>
            )}
          </CardContent>
        </Card>

        {/* Price Per Credit */}
        <Card className="shadow-md hover:shadow-xl transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Price Per Credit
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 720</div>
            <p className="text-xs text-green-600">+19% from last month</p>
          </CardContent>
        </Card>

        {/* Next Month's Projected Credits */}
        <Card className="shadow-md hover:shadow-xl transition col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Next Month's Projected Credits
            </CardTitle>
            <FaRupeeSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictedCredits.toFixed(2)} Credits
            </div>
            <p className="text-xs text-muted-foreground">
              Predicted income: ₹{predictedRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Current Soil Carbon Level */}
        <Card className="shadow-md hover:shadow-xl transition col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Current Soil Carbon Level & Other Data
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <p className="text-xs text-muted-foreground">
              Measured from latest readings
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonCreditsData;
