"use client";
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Activity, CreditCard, Users } from 'lucide-react'
import { FaRupeeSign } from 'react-icons/fa';
import { fetchCarbonDataCard } from '@/actions/farmer/useCarbonCredits';
import { predictNextMonthCredits } from '../../utils/linearRegression';


interface CarbonCreditsDataProps {
    aadharNumber: string;
}

const CarbonCreditsData: React.FC<CarbonCreditsDataProps> = ({ aadharNumber }) => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCarbonCreditsIssued, setTotalCarbonCreditsIssued] = useState(0);
    const [currentCarbonCredits, setCurrentCarbonCredits] = useState(0);
    const [loading, setLoading] = useState(true);
    const [percentageChange, setPercentageChange] = useState(0);
    const [predictedCredits, setPredictedCredits] = useState(0); // State for predicted credits
    const [predictedRevenue, setPredictedRevenue] = useState(0);


    useEffect(() => {
        const getCarbonData = async () => {
            setLoading(true);
            try {
                const data = await fetchCarbonDataCard(aadharNumber);
                // Destructure the values from the fetched data
                const maxRevenue = data.totalRevenue*0.30
                // setTotalRevenue(data.totalRevenue);
                setTotalRevenue(maxRevenue);

                setTotalCarbonCreditsIssued(data.totalCreditsIssued);
                setCurrentCarbonCredits(data.currentCredits);
                setPercentageChange(data.percentageChange);

                const predictedCredits = predictNextMonthCredits(data.creditsArray); // Use your prediction function
                const predictedRevenue = predictedCredits * 720; // Assuming 1 credit = Rs 720
                console.log(predictedCredits);
                
                setPredictedCredits(predictedCredits);
                setPredictedRevenue(predictedRevenue*0.30);
            } catch (error) {
                console.error("Error fetching carbon data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCarbonData();
    }, [aadharNumber]);

    if (loading) {
        return <div>Loading...</div>; // Display a loading state
    }



    
    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full max-w-7xl px-4">
                    {/* Display Total Revenue */}
                    <Card className="shadow-lg rounded-lg" x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Predicted Income for This Month</CardTitle>
                            <FaRupeeSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg rounded-lg" x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Carbon Credits Issued </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCarbonCreditsIssued}</div>
                        </CardContent>
                    </Card>
                    {/* Current Carbon Credits */}
                    <Card className="shadow-lg rounded-lg" x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Carbon Credits</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentCarbonCredits}</div>
                            {percentageChange !== 0 && ( // Only show percentage change if it's non-zero
                                <p className="text-xs text-muted-foreground">
                                    {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}% from last month
                                </p>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg rounded-lg" x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Price Per Credit</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹ 720</div>
                            <p className="text-xs text-muted-foreground">+19% from last month</p>
                        </CardContent>
                    </Card>
                    {/* Set these two cards to span two columns */}
                    <Card className="shadow-lg rounded-lg col-span-2 md:col-span-2" x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Next Month's Projected Credits</CardTitle>
                            <FaRupeeSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{predictedCredits.toFixed(2)} Credits</div>
                            <p className="text-xs text-muted-foreground">Predicted income: Rs {predictedRevenue.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg rounded-lg col-span-2 md:col-span-2" x-chunk="dashboard-01-chunk-5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Soil Carbon Level & Other Data</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.2%</div>
                            <p className="text-xs text-muted-foreground">Measured from latest readings</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>

    )
}

export default CarbonCreditsData;
