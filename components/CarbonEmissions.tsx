"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { fetchCarbonEmissions } from "@/actions/msme/fetchCarbonEmissions";
import type { Emission } from "@/actions/msme/fetchCarbonEmissions";



interface CarbonEmissionsProps {
  gstin: string;
}

const chartConfig: ChartConfig = {
  emissions: {
    label: "Carbon Emissions",
    color: "hsl(142, 76%, 36%)", // A green color matching the theme
  },
};

const CarbonEmissions: React.FC<CarbonEmissionsProps> = ({ gstin }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [percentageChange, setPercentageChange] = useState(0);
  const [emissionsArray, setEmissionsArray] = useState<Emission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCarbonEmissions(gstin);
        setEmissionsArray(data.emissionsArray);
        setPercentageChange(data.percentageChange || 0);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gstin]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const chartData = emissionsArray.map((emission) => ({
    month: emission.month,
    emissions: emission.emission,
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow">
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickMargin={5} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}t`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #cccccc",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke={chartConfig.emissions.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.emissions.color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="font-medium text-green-800">
          Total:{" "}
          {emissionsArray
            .reduce((sum, emission) => sum + emission.emission, 0)
            .toFixed(2)}{" "}
          tons
        </span>
        <div className="flex items-center">
          {percentageChange > 0 ? (
            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
          )}
          <span
            className={percentageChange > 0 ? "text-red-500" : "text-green-500"}
          >
            {Math.abs(percentageChange).toFixed(2)}% from last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissions;
