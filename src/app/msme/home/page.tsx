import { auth } from '@/auth';
import CarbonEmissions from '../../../../components/CarbonEmissions';
import Hero from '../../../../components/Hero';
import MSMENavbar from '../components/MSMENavbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, FileText, Settings } from "lucide-react";

const Dashboard = async () => {
  const session = await auth()
  const gstin = session?.user?.gstin || '';

  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 bg-white shadow-lg">
            <CardContent className="p-6">
              <Hero gstin={gstin} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">Carbon Emissions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <CarbonEmissions gstin={gstin} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start text-left font-normal" variant="outline">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
              <Button className="w-full justify-start text-left font-normal" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Emissions Report
              </Button>
              <Button className="w-full justify-start text-left font-normal" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Manage Carbon Credit Purchases
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-green-700 text-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ready to Offset Your Emissions?</h3>
              <p className="mb-4">Explore available carbon credits from our network of verified farmers.</p>
              <Button variant="secondary" className="bg-white text-green-800 hover:bg-green-100">
                Browse Carbon Credits <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;