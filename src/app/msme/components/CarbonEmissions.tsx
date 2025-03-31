"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { fetchCarbonEmissions } from "@/actions/msme/fetchCarbonEmissions";
import type { Emission } from "@/actions/msme/fetchCarbonEmissions";
import { Skeleton } from "@/components/ui/skeleton";

interface CarbonEmissionsProps {
  gstin: string;
  className?: string;
}

const chartConfig: ChartConfig = {
  emissions: {
    label: "Carbon Emissions",
    color: "hsl(142, 76%, 36%)", // Default Green
  },
};

const CarbonEmissions: React.FC<CarbonEmissionsProps> = ({
  gstin,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [percentageChange, setPercentageChange] = useState(0);
  const [emissionsArray, setEmissionsArray] = useState<Emission[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCarbonEmissions(gstin);
        if (mounted && data.emissionsArray) {
          const sortedEmissions = [...data.emissionsArray].sort(
            (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
          );
          setEmissionsArray(sortedEmissions);
          setPercentageChange(data.percentageChange || 0);
        }
      } catch (error) {
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to fetch emissions data"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [gstin]);

  const totalEmissions = useMemo(() => {
    return emissionsArray.reduce(
      (total, { emissions }) => total + emissions,
      0
    );
  }, [emissionsArray]);

  if (loading) {
    return (
      <div
        className="h-64 w-full space-y-4"
        role="status"
        aria-label="Loading emissions data"
      >
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-8 w-40" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-red-500 p-4 border border-red-200 rounded-md"
        role="alert"
      >
        Error: {error}
      </div>
    );
  }

  // Custom dot component for the line chart
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const color =
      payload.emissions > 80
        ? "#ef4444" // red-500
        : payload.emissions > 50
        ? "#eab308" // yellow-500
        : chartConfig.emissions.color;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={color}
        stroke="white"
        strokeWidth={1}
      />
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-white shadow-md p-3 rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Month:</span> {data.month}
          </p>
          <p className="text-sm text-green-700">
            <span className="font-bold">Emissions:</span> {data.emissions} tons
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full h-full flex flex-col px-4 sm:px-6 ${className || ""}`}
    >
      <div
        className="w-full max-w-full flex-grow min-w-0 overflow-x-auto"
        role="region"
        aria-label="Carbon emissions chart"
      >
        <ChartContainer config={chartConfig} className="h-[280px] sm:h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="w-full min-w-0"
          >
            <LineChart
              data={emissionsArray}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickMargin={5}
                aria-label="Months"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}t`}
                width={40}
                aria-label="Emissions in tons"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke="#eab308" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke="url(#colorGradient)"
                strokeWidth={4}
                dot={<CustomDot />}
                connectNulls
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Summary Section */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <span className="font-medium text-green-800">
          Total Emissions: {totalEmissions.toFixed(2)} tons
        </span>
        <div className="flex items-center mt-3 sm:mt-0">
          {percentageChange > 0 ? (
            <TrendingUp
              className="h-5 w-5 text-red-500 mr-1"
              aria-label="Increasing trend"
            />
          ) : (
            <TrendingDown
              className="h-5 w-5 text-green-500 mr-1"
              aria-label="Decreasing trend"
            />
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
