import { auth } from "@/auth";
import CarbonCreditsData from "./components/CarbonCreditsData";
import { Button } from "@/components/ui/button";
import Hero from "./components/Hero";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Clock, FileText, Leaf, Sprout, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Chatbot from "./components/ChatBot";

import ResponsiveTabs from "./components/Tabs";

const Dashboard = async () => {
  const session = await auth();
  const aadharNumber = session?.user?.aadharNumber || "";
  console.log(aadharNumber);


  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <main className="container mx-auto px-6 py-8 flex-grow">
        <Chatbot></Chatbot>
        <Hero aadhar={aadharNumber} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <CarbonCreditsData aadharNumber={aadharNumber} />
          </div>
        </div>
        <div className="my-8">
          <ResponsiveTabs aadharNumber={aadharNumber} />
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>
                Steps to increase your carbon credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Sprout className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Implement Cover Crops</h4>
                    <p className="text-sm text-muted-foreground">
                      Potential +5% carbon sequestration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Reduce Tillage</h4>
                    <p className="text-sm text-muted-foreground">
                      Potential +3% soil carbon
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Complete Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for next verification
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-700 hover:bg-green-800">
                View All Actions
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Training and verification schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Field Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      May 25, 2024 • 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Sustainable Farming Workshop
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      June 10, 2024 • 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <BarChart className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quarterly Review</h4>
                    <p className="text-sm text-muted-foreground">
                      June 30, 2024 • 11:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Program Progress</CardTitle>
              <CardDescription>Your sustainability journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      Carbon Sequestration
                    </span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      Sustainable Practices
                    </span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Documentation</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      Verification Readiness
                    </span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardFooter>
          </Card>
          {/* </div> */}
        </div>
      </main>

      <footer className="bg-green-700 text-white mt-12 py-6 text-center">
        <p>&copy; 2024 Carbon Credits Trading System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
