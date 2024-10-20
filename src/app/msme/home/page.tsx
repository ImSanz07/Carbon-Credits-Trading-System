import { auth } from '@/auth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, FileText, Settings } from "lucide-react";
import Link from 'next/link';
import CarbonEmissions from '../../../../components/CarbonEmissions';
import Hero from '../../../../components/Hero';
import Head from 'next/head';


const Dashboard = async () => {
  const session = await auth()
  const gstin = session?.user?.gstin || '';


  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        {/* Google Translate Script */}
        <script type="text/javascript">
          {`function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
          }`}
        </script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
      </Head>

      
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
              <Link href="/msme/transactions/analytics" className="flex items-center">
                <Button className="w-full justify-start text-left font-normal" variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </Link>
              <Link href="/msme/emissions-report" className="flex items-center">
                <Button className="w-full justify-start text-left font-normal" variant="outline">

                  <FileText className="mr-2 h-4 w-4" />
                  Generate Emissions Report
                </Button>
              </Link>

              <Link href="/msme/transactions" className="flex items-center">
                <Button className="w-full justify-start text-left font-normal" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage your Carbon Credits
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-green-700 text-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ready to Offset Your Emissions?</h3>
              <p className="mb-4">Explore available carbon credits from our network of verified farmers.</p>
              <Button variant="secondary" className="bg-white text-green-800 hover:bg-green-100">
                <Link className="flex items-center" href="/msme/marketplace">
                  Browse Carbon Credits <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;