// app/msme/marketplace/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import CreditCard from './components/CreditCard';

// Define the types for the credit data
interface Credit {
    district: string;
    totalCredits: number;
}

const Marketplace: React.FC = () => {
    const [credits, setCredits] = useState<Credit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const state = "Maharashtra"; // Example state

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await fetch(`/api/msme/marketplace/getCreditsByState/${state}`);
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
    }, [state]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="flex justify-center p-4">
            <div className="w-11/12 md:w-4/5 lg:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-center">Marketplace</h2>
                {credits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {credits.map((credit, index) => (
                            <CreditCard
                                key={index}
                                title={`District: ${credit.district}`}
                                description={`Available Credits: ${credit.totalCredits}`}
                                content={`Invest in carbon credits from ${credit.district}.`}
                                district={credit.district}
                                totalCredits={credit.totalCredits} // Pass totalCredits to CreditCard
                            />
                        ))}
                    </div>
                ) : (
                    <p>No credits available for the selected state.</p>
                )}
            </div>
        </div>
    );
}

export default Marketplace;
