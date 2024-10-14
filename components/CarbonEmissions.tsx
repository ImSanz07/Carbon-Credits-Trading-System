"use client"
import React, { useEffect, useState } from 'react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchCarbonEmissions } from '@/actions/msme/fetchCarbonEmissions'
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface Emission{
    amount:number;
    month:string;
    emissions: number;
}
interface CarbonEmissionsProps{
    gstin:string
}

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
                // setPercentageChange(data.percentageChange);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gstin]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    // Map the credits array to the format required by the chart
    const chartData = emissionsArray.map(emission => ({
        month: emission.month,
        amount: emission.emissions,
    }));

    console.log("Chart", chartData);


    
    


  return (
    <>
          <Card>
              <CardHeader>
                  <CardTitle>Carbon Emissions</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                  <ChartContainer config={chartConfig}>
                      <LineChart
                          accessibilityLayer
                          data={chartData}
                          margin={{
                              top: 20,
                              left: 12,
                              right: 12,
                          }}
                      >
                          <CartesianGrid vertical={false} />
                          <XAxis
                              dataKey="month"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                          />
                          <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="line" />}
                          />
                          <Line
                              dataKey="amount"
                              type="natural"
                              stroke="var(--color-desktop)"
                              strokeWidth={2}
                              dot={{
                                  fill: "var(--color-desktop)",
                              }}
                              activeDot={{
                                  r: 6,
                              }}
                          >
                              <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                              />
                          </Line>
                      </LineChart>
                  </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                  </div>
              </CardFooter>
          </Card>
    </>
  )
}

export default CarbonEmissions