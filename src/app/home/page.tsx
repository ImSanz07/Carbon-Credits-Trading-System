import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, BarChart, DollarSign, Factory, Sprout } from "lucide-react"
import GetStartedButton from "./components/GetStartedButton"
import { Suspense } from "react"
import Loading from "../loading"

export default function LandingPage() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className="flex flex-col min-h-screen bg-green-50">
        <header className="px-4 lg:px-6 h-32 flex items-center bg-green-700 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link className="flex items-center justify-center" href="#">
              <Leaf className="h-8 w-8 mr-2" />
              <span className="font-bold text-3xl">
                Carbon Credits Trading System
              </span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-xl font-medium hover:underline underline-offset-4"
                href="#"
              >
                Features
              </Link>
              <Link
                className="text-xl font-medium hover:underline underline-offset-4"
                href="#"
              >
                How It Works
              </Link>
              <Link
                className="text-xl font-medium hover:underline underline-offset-4"
                href="#"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-800 text-white bg-[url('/images/homepage-bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-shadow">
                    Carbon Credits Trading System
                  </h1>
                  <p className="mx-auto max-w-[1200px] text-green-100 text-3npm xl text-shadow">
                    Empowering farmers and MSMEs to contribute to a sustainable
                    future through efficient carbon credit trading.
                  </p>
                </div>
                <div className="space-x-4">
                  <GetStartedButton />
                  <Button className="text-white border-white hover:bg-green-700">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full -mt-10 py-6 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-green-800">
                Key Features
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-green-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      For Farmers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <Sprout className="mr-2 h-4 w-4" /> List carbon credits
                        from your farm
                      </li>
                      <li className="flex items-center">
                        <BarChart className="mr-2 h-4 w-4" /> Real-time carbon
                        data from our sensors
                      </li>
                      <li className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" /> Earn by selling
                        carbon credits
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">For MSMEs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <Factory className="mr-2 h-4 w-4" /> Offset your carbon
                        emissions
                      </li>
                      <li className="flex items-center">
                        <Leaf className="mr-2 h-4 w-4" /> Contribute to
                        sustainable practices
                      </li>
                      <li className="flex items-center">
                        <BarChart className="mr-2 h-4 w-4" /> Track your
                        environmental impact
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="relative w-full py-12 md:py-24 lg:py-32 bg-green-700 text-white shadow-xl bg-[url('/images/info-section.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
            {/* Overlay */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                How It Works
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-3 shadow-md">
                    {" "}
                    {/* Added shadow */}
                    <Sprout className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-shadow">
                    1. Farm Monitoring
                  </h3>{" "}
                  {/* Added text-shadow */}
                  <p className="text-green-100">
                    Our sensors collect real-time carbon data from farms.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-3 shadow-md">
                    <BarChart className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-shadow">
                    2. Credit Generation
                  </h3>
                  <p className="text-green-100">
                    Carbon credits are calculated based on the collected data.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-3 shadow-md">
                    <ArrowRight className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-shadow">
                    3. Trading Platform
                  </h3>
                  <p className="text-green-100">
                    Farmers list credits, MSMEs purchase to offset emissions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                    Join the Green Revolution
                  </h2>
                  <p className="text-gray-500 md:text-xl dark:text-gray-400">
                    Whether you're a farmer looking to monetize your sustainable
                    practices or an MSME aiming to reduce your carbon footprint,
                    we've got you covered.
                  </p>
                  <div className="space-x-4">
                    <Button className="bg-green-700 text-white hover:bg-green-800">
                      Sign Up Now
                    </Button>
                    <Button
                      variant="outline"
                      className="text-green-700 border-green-700 hover:bg-green-50"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="/images/homepage_bg.webp"
                    alt="Sustainable farming"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="relative w-full py-12 md:py-24 lg:py-32 bg-green-100 bg-[url('/images/impact-image.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
            {/* Overlay */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
                Our Impact
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="bg-white border-green-800 border-4 shadow-md hover:border-green-200 transition-border duration-300">
                  <CardHeader>
                    <CardTitle className="text-green-800 text-center text-3xl font-bold">
                      1000+
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-xl text-green-700">
                      Farmers Empowered
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-green-800 border-4 shadow-md hover:border-green-200 transition-border duration-300">
                  <CardHeader>
                    <CardTitle className="text-green-800 text-center text-3xl font-bold">
                      500+
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-xl text-green-700">
                      MSMEs Supported
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-green-800 border-4 shadow-md hover:border-green-200 transition-border duration-300">
                  <CardHeader>
                    <CardTitle className="text-green-800 text-center text-3xl font-bold">
                      10,000+
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-xl text-green-700">
                      Tons of CO2 Offset
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-green-800 text-white">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-xs text-green-100">
                © 2024 Carbon Credits Trading System. All rights reserved.
              </p>
              <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                <Link
                  className="text-xs hover:underline underline-offset-4"
                  href="#"
                >
                  Terms of Service
                </Link>
                <Link
                  className="text-xs hover:underline underline-offset-4"
                  href="#"
                >
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </Suspense>
  );
}