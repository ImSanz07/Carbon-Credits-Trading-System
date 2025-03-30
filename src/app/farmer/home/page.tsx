import { auth } from "@/auth";
import CarbonCreditsChart from "./components/CarbonCreditsChart";
import CarbonCreditsData from "./components/CarbonCreditsData";
import { Button } from "@/components/ui/button";
import Hero from "./components/Hero";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketInsights } from "./components/market-insights";
import { RecentActivity } from "./components/recent-activity";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Clock, FileText, Leaf, Sprout, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AqiInsights } from "./components/AqiInsights";
import Chatbot from "./components/ChatBot";

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
          <Tabs defaultValue="overview">
            <div className="flex items-center justify-between">
              <TabsList className="bg-green-100">
                <TabsTrigger value="overview">Credits Overview</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="market">Market Insights</TabsTrigger>
                <TabsTrigger value="aqi">AQI Insights</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Last 6 Months
                </Button>
              </div>
            </div>

            <TabsContent value="overview">
              <div className="md:col-span-2 lg:col-span-3">
                <CarbonCreditsChart aadharNumber={aadharNumber} />
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest transactions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>
                    Current market trends and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketInsights />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aqi" className="mt-4">
              <AqiInsights></AqiInsights>

            </TabsContent>
          </Tabs>

          
        </div>

        {/* <div className="md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-5">
            <ul className="divide-y divide-gray-200 text-gray-700">
              <li className="py-3">
                🌿 Carbon credits issued: <strong>50 credits</strong> on{" "}
                <em>15th May 2024</em>
              </li>
              <li className="py-3">
                📈 Soil carbon level increased by <strong>0.2%</strong> this
                month
              </li>
              <li className="py-3">
                🛠️ New sensor installed in <strong>Field B</strong> on{" "}
                <em>10th May 2024</em>
              </li>
            </ul>
          </div>
        </div> */}

        {/* <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
        {/* Quick Actions */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link href="/farmer/transactions" passHref>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View Carbon Credit History
                </Button>
              </Link>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Request Sensor Maintenance
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Update Farm Profile
              </Button>
            </div>
          </div> */}

        {/* Upcoming Events */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Upcoming Events
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                📅 <strong>Carbon Credit Auction</strong> -{" "}
                <em>June 1st, 2024</em>
              </li>
              <li>
                🌾 <strong>Farmer Workshop</strong> on Sustainable Practices -{" "}
                <em>June 15th, 2024</em>
              </li>
              <li>
                🧪 <strong>Quarterly Soil Health Assessment</strong> -{" "}
                <em>July 1st, 2024</em>
              </li>
            </ul>
          </div> */}

        {/* Tips & Resources */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Tips & Resources
            </h3>
            <ul className="space-y-2 list-disc list-inside text-blue-700">
              <li>
                <a
                  href="https://www.newindianexpress.com/lifestyle/spirituality/2022/Apr/30/how-to-raise-soil-organic-content-2447603.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  How to increase soil carbon content
                </a>
              </li>
              <li>
                <a
                  href="https://www.drishtiias.com/hindi/daily-updates/daily-news-analysis/sustainable-agriculture-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Best practices for sustainable farming
                </a>
              </li>
              <li>
                <a
                  href="https://climatepromise-undp-org.translate.goog/news-and-stories/what-are-carbon-markets-and-why-are-they-important?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi&_x_tr_pto=wa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Understanding carbon credit markets
                </a>
              </li>
            </ul>
          </div> */}

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
