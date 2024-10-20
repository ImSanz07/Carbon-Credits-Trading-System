import { auth } from '@/auth';
import CarbonCreditsChart from './components/CarbonCreditsChart';
import CarbonCreditsData from './components/CarbonCreditsData';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
    const session = await auth()
    const aadharNumber = session?.user?.aadharNumber || '';

    return (
        <div className="min-h-screen bg-green-50">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Welcome, {session?.user?.name}!</h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="md:col-span-2 lg:col-span-3">
                        <CarbonCreditsData aadharNumber={aadharNumber} />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                        <CarbonCreditsChart aadharNumber={aadharNumber} />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">Recent Activity</h2>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <ul className="divide-y divide-green-100">
                                <li className="py-3">Carbon credits issued: 50 credits on 15th May 2024</li>
                                <li className="py-3">Soil carbon level increased by 0.2% this month</li>
                                <li className="py-3">New sensor installed in Field B on 10th May 2024</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link href="/farmer/transactions">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Carbon Credit History</Button>
                            </Link>
                            
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Request Sensor Maintenance</Button>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Update Farm Profile</Button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Upcoming Events</h3>
                        <ul className="space-y-2">
                            <li>Carbon Credit Auction - June 1st, 2024</li>
                            <li>Farmer Workshop on Sustainable Practices - June 15th, 2024</li>
                            <li>Quarterly Soil Health Assessment - July 1st, 2024</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Tips & Resources</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            <a href='https://www.newindianexpress.com/lifestyle/spirituality/2022/Apr/30/how-to-raise-soil-organic-content-2447603.html' target="_blank" ><li>How to increase soil carbon content</li></a>
                            <a href='https://www.drishtiias.com/hindi/daily-updates/daily-news-analysis/sustainable-agriculture-2' target="_blank">
                                <li>Best practices for sustainable farming</li>
                            </a>
                            <a href='https://climatepromise-undp-org.translate.goog/news-and-stories/what-are-carbon-markets-and-why-are-they-important?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi&_x_tr_pto=wa' target='_blank'>
                                <li>Understanding carbon credit markets</li>
                                </a>
                            
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="bg-green-700 text-white mt-12">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p>&copy; 2024 Carbon Credits Trading System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Dashboard;