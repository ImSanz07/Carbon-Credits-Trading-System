import { auth } from "@/auth";
import CarbonCreditsChart from "./components/CarbonCreditsChart";
import CarbonCreditsData from "./components/CarbonCreditsData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "./components/Hero";

const Dashboard = async () => {
  const session = await auth();
  const aadharNumber = session?.user?.aadharNumber || "";
  console.log(aadharNumber);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <main className="container mx-auto px-6 py-8 flex-grow">
        <Hero aadhar={aadharNumber} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <CarbonCreditsData aadharNumber={aadharNumber} />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <CarbonCreditsChart aadharNumber={aadharNumber} />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
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
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          </div>

          {/* Tips & Resources */}
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          </div>
        </div>
      </main>

      <footer className="bg-green-700 text-white mt-12 py-6 text-center">
        <p>&copy; 2024 Carbon Credits Trading System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
