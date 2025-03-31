"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import CarbonCreditsChart from "./CarbonCreditsChart";
import { RecentActivity } from "./recent-activity";
import { MarketInsights } from "./market-insights";
import { AqiInsights } from "./AqiInsights";

interface ResponsiveTabsProps {
  aadharNumber: string;
}

const ResponsiveTabs = ({ aadharNumber }: ResponsiveTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="my-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Dropdown for Mobile */}
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="md:hidden p-2 border border-gray-300 rounded-lg"
        >
          <option value="overview">Credits Overview</option>
          <option value="activity">Recent Activity</option>
          <option value="market">Market Insights</option>
          <option value="aqi">AQI Insights</option>
        </select>

        {/* Tabs for Desktop */}
        <Tabs
          defaultValue="overview"
          value={selectedTab}
          onValueChange={(val) => setSelectedTab(val)}
          className="hidden md:flex"
        >
          <TabsList className="bg-green-100">
            <TabsTrigger value="overview">Credits Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="market">Market Insights</TabsTrigger>
            <TabsTrigger value="aqi">AQI Insights</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Button */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 6 Months
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {selectedTab === "overview" && (
          <div className="md:col-span-2 lg:col-span-3">
            <CarbonCreditsChart aadharNumber={aadharNumber} />
          </div>
        )}
        {selectedTab === "activity" && (
          <div className="mt-4">
            <RecentActivity />
          </div>
        )}
        {selectedTab === "market" && (
          <div className="mt-4">
            <MarketInsights />
          </div>
        )}
        {selectedTab === "aqi" && (
          <div className="mt-4">
            <AqiInsights />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveTabs;
