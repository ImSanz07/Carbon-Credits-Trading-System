"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { fetchCarbonDataCard } from "@/actions/farmer/useCarbonCredits";

const chartConfig = {
  desktop: {
    label: "Carbon Credits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const description = "A bar chart with a label";

interface Credit {
  creditsEarned: number; // Update to match the model
  month: string; // Assuming you want to track the month as well
}

// Accept creditsArray as a prop
interface CarbonCreditsChartProps {
  aadharNumber: string;
}

const CarbonCreditsChart: React.FC<CarbonCreditsChartProps> = ({
  aadharNumber,
}) => {
  const [loading, setLoading] = useState(true);
  const [creditsArray, setCreditsArray] = useState<Credit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCarbonDataCard(aadharNumber);
        setCreditsArray(data.creditsArray);
        setPercentageChange(data.percentageChange);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aadharNumber]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle error state
  }

  // Map the credits array to the format required by the chart
  const chartData = creditsArray.slice(-10).map((credit) => ({
    month: credit.month,
    Credits: credit.creditsEarned,
  }));

  // console.log("Chart", chartData);

  return (
    <>
      <div className="mt-10 shadow-lg rounded-lg">
        <Card>
          {" "}
          {/* Set the card width to 75% */}
          <CardHeader className="h-10">
            <CardTitle>Bar Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:p-4">
            {" "}
            {/* Adjust padding for smaller size */}
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                width={100} // Set the width of the chart
                height={200} // Set the height of the chart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="Credits" fill="#15803d" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              {percentageChange !== 0 && ( // Only show percentage change if it's non-zero
                <p className="text-xs">
                  {percentageChange > 0 ? "+" : ""}
                  {percentageChange.toFixed(2)}% from last month
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CarbonCreditsChart;
