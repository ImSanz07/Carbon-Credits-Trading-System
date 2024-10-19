import { auth } from '@/auth';
import CarbonCreditsChart from './components/CarbonCreditsChart';
import CarbonCreditsData from './components/CarbonCreditsData';
import { Leaf, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
    const session = await auth()
    const aadharNumber = session?.user?.aadharNumber || '';

    return (
        <div className="min-h-screen bg-green-50">
            {/* NAVBAR REMOVED FROM HERE AND PUT INTO COMPONENTS */}
            {/* <header className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Leaf className="h-8 w-8" />
                        <span className="text-2xl font-bold">Farmer Dashboard</span>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <Link href="/profile" className="hover:text-green-200 transition-colors">
                            <User className="h-5 w-5" />
                        </Link>
                        <Link href="/settings" className="hover:text-green-200 transition-colors">
                            <Settings className="h-5 w-5" />
                        </Link>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-green-600">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </header> */}

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
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Carbon Credit History</Button>
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
                            <li>How to increase soil carbon content</li>
                            <li>Best practices for sustainable farming</li>
                            <li>Understanding carbon credit markets</li>
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