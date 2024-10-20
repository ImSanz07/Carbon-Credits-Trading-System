"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import React, { useState, useEffect } from 'react';
import BuyingLogic from './actions/BuyingLogic';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Info, AlertTriangle, IndianRupee } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react";

const ProductPage: React.FC = () => {
    const { toast } = useToast()
    const router = useRouter();
    const params = useParams();
    const { data: session } = useSession();
    const district = Array.isArray(params.district) ? params.district[0] : params.district;
    const decodedDistrict = decodeURIComponent(district);
    const searchParams = useSearchParams();
    const totalCredits = Number(searchParams.get('totalCredits'));
    const [creditsToBuy, setCreditsToBuy] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentEmissions, setCurrentEmissions] = useState<number | null>(null);
    const [gstin, setGstin] = useState<string>('');

    useEffect(() => {
        if (session?.user?.gstin) {
            setGstin(session.user.gstin);
        } else {
            toast({
                title: "Error",
                description: "Unable to retrieve GSTIN. Please log in again.",
                variant: "destructive",
            });
            router.push('/login');
        }
    }, [session, toast, router]);

    useEffect(() => {
        const fetchEmissions = async () => {
            if (gstin) {
                try {
                    const response = await fetch(`/api/msme/profile/fetchUserInfo/${gstin}`);
                    const data = await response.json();
                    
                    if (data.emissions && data.emissions.length > 0) {
                        const latestEmission = data.emissions[data.emissions.length - 1];
                        setCurrentEmissions(latestEmission.emissions);
                    }
                } catch (error) {
                    console.error('Error fetching emissions:', error);
                    toast({
                        title: "Error",
                        description: "Failed to fetch emission data. Please try again.",
                        variant: "destructive",
                    });
                }
            }
        };

        if (gstin) {
            fetchEmissions();
        }
    }, [gstin, toast]);

    useEffect(() => {
        if (isNaN(totalCredits) || totalCredits <= 0) {
            toast({
                title: "Error",
                description: "Invalid total credits. Redirecting to marketplace...",
                variant: "destructive",
            });
            setTimeout(() => router.push('/msme/marketplace'), 3000);
        }
    }, [totalCredits, router, toast]);

    const createOrder = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: creditsToBuy }),
            });
            if (!res.ok) throw new Error('Failed to create order');
            const data = await res.json();
            const amount = creditsToBuy * 30000;
            console.log(amount);
            
            const paymentData = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                orderId: data.id,
                amount,
                handler: async function (response: any) {
                    await handlePaymentSuccess(data.id, response);
                },
                modal: {
                    ondismiss: function () {
                        toast({
                            title: "Payment Cancelled",
                            description: "You have cancelled the payment process.",
                            variant: "default",
                        });
                    }
                }
            };
            const payment = new (window as any).Razorpay(paymentData);
            payment.open();
        } catch (error) {
            console.error('Error creating order:', error);
            toast({
                title: "Error",
                description: "Failed to initiate payment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentSuccess = async (orderId: string, response: any) => {
        try {
            const verificationRes = await fetch('/api/verifyOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature
                }),
            });
            const verificationData = await verificationRes.json();
            if (verificationData.isOk) {
                await updateDatabase(orderId, response.razorpay_payment_id);
                router.push('/msme/marketplace/payment/success');
            } else {
                throw new Error('Payment verification failed');
            }
        } catch (error) {
            console.error('Error in payment process:', error);
            toast({
                title: "Payment Error",
                description: "There was an issue with your payment. Please contact support.",
                variant: "destructive",
            });
            router.push('/msme/marketplace/payment/failure');
        }
    };

    const updateDatabase = async (orderId: string, paymentId: string) => {
        const allocationObject = await BuyingLogic(creditsToBuy, district);
        const currentDateTime = new Date();

        const response = await fetch('/api/updateTransaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                paymentId,
                allocationObject,
                creditsBought: creditsToBuy,
                amount: creditsToBuy * 30000,
                district: district,
                dateTime: currentDateTime,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update the transaction');
        }
    };

    const handleSubmit = async () => {
        if (creditsToBuy <= 0) {
            toast({
                title: "Invalid Input",
                description: "Please enter a valid amount of credits to purchase.",
                variant: "destructive",
            });
            return;
        }
        if (currentEmissions !== null && creditsToBuy > currentEmissions) {
            toast({
                title: "Exceeds Current Emissions",
                description: "You cannot offset more than your current emissions.",
                variant: "destructive",
            });
            return;
        }
        if (creditsToBuy > totalCredits) {
            toast({
                title: "Exceeds Available Credits",
                description: "You cannot buy more credits than available in this district.",
                variant: "destructive",
            });
            return;
        }
        await createOrder();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setCreditsToBuy(Math.min(value, currentEmissions !== null ? currentEmissions : Infinity, totalCredits));
        }
    };

    const percentageSelected = currentEmissions !== null ? (creditsToBuy / currentEmissions) * 100 : 0;

    if (isNaN(totalCredits) || totalCredits <= 0 || currentEmissions === null) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
            <Script
                type="text/javascript"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="container mx-auto px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-green-800 flex items-center">
                            <Leaf className="mr-2 h-8 w-8" />
                            Purchase Carbon Credits
                        </CardTitle>
                        <CardDescription>
                            From farmers in {decodedDistrict}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-green-700">Your Current Emissions:</span>
                            <span className="text-2xl font-bold text-green-800">{currentEmissions} tons CO2e</span>
                        </div>
                        <Progress value={percentageSelected} className="w-full h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>0</span>
                            <span>{currentEmissions} tons CO2e</span>
                        </div>
                        <Input
                            className="text-lg"
                            placeholder="Enter the amount of credits to purchase"
                            type="number"
                            min="0"
                            max={Math.min(currentEmissions, totalCredits)}
                            value={creditsToBuy || ''}
                            onChange={handleInputChange}
                        />
                        {creditsToBuy > 0 && (
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Purchase Summary</AlertTitle>
                                <AlertDescription>
                                    You are about to purchase {creditsToBuy} credits for ₹{creditsToBuy * 300}, offsetting {((creditsToBuy / currentEmissions) * 100).toFixed(2)}% of your emissions.
                                </AlertDescription>
                            </Alert>
                        )}
                        {creditsToBuy > currentEmissions && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    You cannot offset more than your current emissions.
                                </AlertDescription>
                            </Alert>
                        )}
                        {creditsToBuy > totalCredits && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    You cannot purchase more credits than available in this district.
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            <IndianRupee className="inline h-4 w-4 mr-1" />
                            Price per credit: ₹300
                        </div>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || creditsToBuy <= 0 || creditsToBuy > Math.min(currentEmissions, totalCredits)}
                        >
                            {isLoading ? 'Processing...' : 'Buy Credits'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ProductPage;