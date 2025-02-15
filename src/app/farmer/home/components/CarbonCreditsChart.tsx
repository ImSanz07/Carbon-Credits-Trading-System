"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  ResponsiveContainer,
} from "recharts";
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

interface Credit {
  creditsEarned: number;
  month: string;
}

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

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const chartData = creditsArray.slice(-10).map((credit) => ({
    month: credit.month,
    Credits: credit.creditsEarned,
  }));

  return (
    <div className="mt-10 shadow-lg rounded-lg max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader className="h-auto text-center">
          <CardTitle className="text-lg sm:text-xl">
            Carbon Credits Overview
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Last 6 Months
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-4">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="Credits" fill="#15803d" radius={[8, 8, 0, 0]}>
                  <LabelList
                    position="top"
                    offset={10}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-sm pb-4">
          {percentageChange !== 0 && (
            <p
              className={`text-xs font-medium ${
                percentageChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentageChange > 0 ? "+" : ""}
              {percentageChange.toFixed(2)}% from last month
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CarbonCreditsChart;
