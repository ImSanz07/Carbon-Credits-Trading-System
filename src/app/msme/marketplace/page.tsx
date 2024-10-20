"use client";
import React, { useEffect, useState } from 'react';
import CreditCard from './components/CreditCard';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface Credit {
    district: string;
    totalCredits: number;
}


const Marketplace: React.FC = () => {
    const [credits, setCredits] = useState<Credit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchCredits = async () => {
            if (status === "loading") return;
            if (!session?.user?.state) {
                setError("User state not found. Please ensure you're logged in.");
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/msme/marketplace/getCreditsByState/${session.user.state}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch credits');
                }
                const data: Credit[] = await response.json();
                setCredits(data);
            } catch (error: any) {
                console.error('Error fetching credits:', error);
                setError(error.message || 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCredits();
    }, [session, status]);

    const filteredAndSortedCredits = credits
        .filter(credit => credit.district.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.totalCredits - b.totalCredits;
            } else {
                return b.totalCredits - a.totalCredits;
            }
        });

    if (status === "loading") {
        return <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
            <p className="mt-4 text-lg text-green-800 font-semibold">Loading user session...</p>
        </div>;
    }

    if (status === "unauthenticated") {
        return <div className="text-center py-12">
            <p className="text-lg text-red-600 font-semibold">Please log in to access the marketplace.</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
            <div className="container mx-auto px-4">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-green-800 flex items-center">
                            <Leaf className="mr-2 h-8 w-8" />
                            Carbon Credits Marketplace
                        </CardTitle>
                        <CardDescription>
                            Browse and purchase carbon credits from various districts in {session?.user?.state}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-grow relative">
                                <Input
                                    type="text"
                                    placeholder="Search districts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                            </div>
                            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
                                <SelectTrigger className="w-full sm:w-[180px] border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm">
                                    <SelectValue placeholder="Sort by credits" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="desc">Highest credits first</SelectItem>
                                    <SelectItem value="asc">Lowest credits first</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
                        <p className="mt-4 text-lg text-green-800 font-semibold">Loading available credits...</p>
                    </div>
                ) : error ? (
                    <Card className="bg-red-50 border-red-200 shadow-md">
                        <CardContent className="text-center py-8">
                            <p className="text-red-600 font-semibold">Error: {error}</p>
                            <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                ) : filteredAndSortedCredits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedCredits.map((credit, index) => (
                            <CreditCard
                                key={index}
                                title={`${credit.district}`}
                                description={`Available Credits: ${credit.totalCredits}`}
                                content={`Invest in carbon credits from ${credit.district} and contribute to a greener future.`}
                                district={credit.district}
                                totalCredits={credit.totalCredits}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="bg-yellow-50 border-yellow-200 shadow-md">
                        <CardContent className="text-center py-8">
                            <p className="text-yellow-700 font-semibold">No credits available for the selected criteria.</p>
                            <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => setSearchTerm("")}>
                                Clear Search
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Marketplace;