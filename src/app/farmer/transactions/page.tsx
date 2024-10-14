// OrderHistory.tsx
"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CompanyDetailsDialog from "./components/CompanyDetailsDialog"; // Adjust the import path

interface Transaction {
    totalCreditsPurchased: number;
    _id: string;
    paymentId: string;
    buyer_gstin: string;
    orderId: string;
    amount: number;
    dateTime: string;
    district: string;
    creditsSold: number;
}

const OrderHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [selectedGstin, setSelectedGstin] = useState<string | null>(null); // State to hold selected GSTIN
    const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

    const handleGstinClick = (transaction: Transaction) => {
        setSelectedGstin(transaction.buyer_gstin); // Set selected GSTIN
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setSelectedGstin(null);
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('/api/farmer/fetchTransactions');

                if (!res.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const data = await res.json();

                if (data.success && Array.isArray(data.transactions)) {
                    setTransactions(data.transactions);
                } else {
                    setError('No transactions found');
                }

            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('An error occurred while fetching transactions');

            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) {
        return <p>Loading transactions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="flex flex-col items-center pt-10 min-h-screen bg-gray-100">
                <h1 className='text-2xl'>My Earnings</h1>
                <Table className='w-3/4 mx-auto'>
                    <TableCaption>A list of your recent carbon credits sold.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Buyer' GSTIN</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Credits Sold</TableHead>
                            <TableHead className="text-right">Earning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell className="font-medium">{transaction.orderId}</TableCell>
                                <TableCell className="font-medium">
                                    <p className="cursor-pointer" onClick={() => handleGstinClick(transaction)}>
                                        {transaction.buyer_gstin}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    {new Date(transaction.dateTime).toLocaleString('en-US', { dateStyle: 'short' })}
                                </TableCell>
                                <TableCell>
                                    {new Date(transaction.dateTime).toLocaleString('en-US', { timeStyle: 'short' })}
                                </TableCell>
                                <TableCell>
                                    {transaction.creditsSold}
                                </TableCell>
                                <TableCell className="text-right">₹{(transaction.creditsSold) * 300}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className='text-xl' colSpan={1}>Total Earnings ₹{transactions.reduce((acc, transaction) => acc + transaction.creditsSold, 0) * 300}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {/* Render the dialog component */}
            <CompanyDetailsDialog
                isOpen={isOpen}
                onClose={closeDialog}
                gstin={selectedGstin} // Pass the GSTIN here
            />
        </>
    );
}

export default OrderHistory;
