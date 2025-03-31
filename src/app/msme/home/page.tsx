import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, FileText, Settings } from "lucide-react";
import Link from "next/link";
import CarbonEmissions from "../components/CarbonEmissions";
import Hero from "../../../../components/Hero";
import Head from "next/head";

const Dashboard = async () => {
  const session = await auth();
  const gstin = session?.user?.gstin || "";

  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
        {/* Main Grid Layout */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Hero Section */}
          <Card className="col-span-1 md:col-span-2 bg-white shadow-lg">
            <CardContent className="p-6">
              <Hero gstin={gstin} />
            </CardContent>
          </Card>

          {/* Carbon Emissions Overview */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">
                Carbon Emissions Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CarbonEmissions gstin={gstin} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/msme/transactions/analytics"
                className="flex items-center w-full"
              >
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </Link>

              <Link
                href="/msme/emissions-report"
                className="flex items-center w-full"
              >
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Emissions Report
                </Button>
              </Link>

              <Link
                href="/msme/transactions"
                className="flex items-center w-full"
              >
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Manage your Carbon Credits
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ready to Offset Section */}
          <Card className="col-span-1 md:col-span-2 bg-green-700 text-white shadow-lg">
            <CardContent className="p-6 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Ready to Offset Your Emissions?
              </h3>
              <p className="mb-4">
                Explore available carbon credits from our network of verified
                farmers.
              </p>
              <Link href="/msme/marketplace">
                <Button
                  variant="secondary"
                  className="bg-white text-green-800 hover:bg-green-100 flex items-center"
                >
                  Browse Carbon Credits <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
