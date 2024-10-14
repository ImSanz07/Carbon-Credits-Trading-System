"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from 'moment';

// Define the Transaction interface
interface Transaction {
    creditsBought: number;
    _id: string;
    paymentId: string;
    orderId: string;
    amount: number;
    dateTime: string;
    district: string;
}

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCreditsBought, setTotalCreditsBought] = useState(0);
    const router = useRouter();

    // Calculate the total credits bought
    useEffect(() => {
        const total = transactions.reduce((acc, transaction) => acc + transaction.creditsBought, 0);
        setTotalCreditsBought(total);
    }, [transactions]);

    // Fetch transactions from the API when the component mounts
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('/api/msme/fetchTransactions');

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
        <div className="flex flex-col items-center pt-10 min-h-screen bg-gray-100">
            <h1 className='text-2xl'>My Transactions</h1>
            <Table className='w-3/4 mx-auto'>
                <TableCaption>A list of your recent carbon credit purchases.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>District</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction._id}>
                            <TableCell className="font-medium">{transaction.orderId}</TableCell>
                            <TableCell>
                                {new Date(transaction.dateTime).toLocaleString('en-US', { dateStyle: 'short' })}
                            </TableCell>
                            <TableCell>
                                {new Date(transaction.dateTime).toLocaleString('en-US', { timeStyle: 'short' })}
                            </TableCell>
                            <TableCell>
                                {decodeURIComponent(transaction.district)}
                            </TableCell>
                            <TableCell>
                                {transaction.creditsBought}
                            </TableCell>
                            <TableCell className="text-right">₹{transaction.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className='text-xl' colSpan={1}>Total Credits Bought</TableCell>
                        <TableCell className="text-xl">{totalCreditsBought}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default Transactions;
