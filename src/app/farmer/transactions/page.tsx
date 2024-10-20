"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, DollarSign, CreditCard, Calendar, IndianRupee } from "lucide-react";
import CompanyDetailsDialog from "./components/CompanyDetailsDialog";

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

export default function OrderHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGstin, setSelectedGstin] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleGstinClick = (transaction: Transaction) => {
        setSelectedGstin(transaction.buyer_gstin);
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
                if (!res.ok) throw new Error('Failed to fetch transactions');
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

    const totalEarnings = transactions.reduce((acc, transaction) => acc + transaction.creditsSold * 300, 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center pt-10 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <Card className="w-3/4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">My Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center pt-10 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <Card className="w-3/4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">My Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-red-500">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center pt-10 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <Card className="w-3/4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">My Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <IndianRupee className="h-12 w-12 text-green-500 mb-2" />
                                    <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">Total Earnings</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <CreditCard className="h-12 w-12 text-blue-500 mb-2" />
                                    <p className="text-2xl font-bold">{transactions.length}</p>
                                    <p className="text-sm text-gray-500">Total Transactions</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <Calendar className="h-12 w-12 text-purple-500 mb-2" />
                                    <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                </CardContent>
                            </Card>
                        </div>
                        <Table>
                            <TableCaption>A list of your recent carbon credits sold.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Buyer's GSTIN</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Credits Sold</TableHead>
                                    <TableHead className="text-right">Earning</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction._id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <TableCell className="font-medium">{transaction.orderId}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="link"
                                                onClick={() => handleGstinClick(transaction)}
                                                className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                                            >
                                                {transaction.buyer_gstin}
                                                <ArrowUpRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.dateTime).toLocaleString('en-US', { dateStyle: 'medium' })}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.dateTime).toLocaleString('en-US', { timeStyle: 'short' })}
                                        </TableCell>
                                        <TableCell>{transaction.creditsSold}</TableCell>
                                        <TableCell className="text-right font-semibold">₹{(transaction.creditsSold * 300).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={5}>Total Earnings</TableCell>
                                    <TableCell className="text-right font-bold text-lg">₹{totalEarnings.toLocaleString()}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <CompanyDetailsDialog
                isOpen={isOpen}
                onClose={closeDialog}
                gstin={selectedGstin}
            />
        </>
    );
}