"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  ArrowUpRight,
  DollarSign,
  CreditCard,
  Calendar,
  IndianRupee,
  FileText,
  Clock,
  TrendingUp,
} from "lucide-react";
import CompanyDetailsDialog from "./components/CompanyDetailsDialog";
import { FaRubleSign, FaRupeeSign } from "react-icons/fa";

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
        const res = await fetch("/api/farmer/fetchTransactions");
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        if (data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          setError("No transactions found");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("An error occurred while fetching transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const totalEarnings = transactions.reduce(
    (acc, transaction) => acc + transaction.creditsSold * 300,
    0
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center pt-10 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              My Earnings
            </CardTitle>
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
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              My Earnings
            </CardTitle>
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
        <Card className="w-full max-w-4xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-green-800">
              My Earnings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Stats Grid */}
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="w-full sm:w-1/2 lg:w-full bg-gradient-to-r from-green-100 to-green-50 shadow-md hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <IndianRupee className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold">
                    ₹{totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Total Earnings
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-1/2 lg:w-full bg-gradient-to-r from-blue-100 to-blue-50 shadow-md hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <CreditCard className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold">
                    {transactions.length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Total Transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-1/2 lg:w-full bg-gradient-to-r from-purple-100 to-purple-50 shadow-md hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold">
                    {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Last Updated
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Table for Larger Screens */}
            <div className="hidden sm:block">
              <Table className="w-full border rounded-lg overflow-hidden">
                <TableCaption>
                  A list of your recent carbon credits sold.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-green-100">
                    <TableHead className="text-green-800">Order ID</TableHead>
                    <TableHead className="text-green-800">
                      Buyer's GSTIN
                    </TableHead>
                    <TableHead className="text-green-800">Date</TableHead>
                    <TableHead className="text-green-800">Time</TableHead>
                    <TableHead className="text-green-800">
                      Credits Sold
                    </TableHead>
                    <TableHead className="text-right text-green-800">
                      Earning
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow
                      key={transaction._id}
                      className={`hover:bg-green-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <TableCell>{transaction.orderId}</TableCell>
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
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.dateTime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="font-semibold text-green-700">
                        {transaction.creditsSold}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-700">
                        ₹{(transaction.creditsSold * 300).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-green-100">
                  <TableRow>
                    <TableCell colSpan={5} className="font-semibold">
                      Total Earnings
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-700">
                      ₹{totalEarnings.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* Card/List View for Mobile */}
            <div className="sm:hidden space-y-4">
              {transactions.map((transaction) => (
                <Card
                  key={transaction._id}
                  className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        <p className="text-sm font-semibold">Order ID:</p>
                      </div>
                      <p>{transaction.orderId}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <p className="text-sm font-semibold">Buyer's GSTIN:</p>
                      </div>
                      <Button
                        variant="link"
                        onClick={() => handleGstinClick(transaction)}
                        className="p-0 text-blue-600 hover:text-blue-800"
                      >
                        {transaction.buyer_gstin}
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <p className="text-sm font-semibold">Date:</p>
                      </div>
                      <p>
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <p className="text-sm font-semibold">Time:</p>
                      </div>
                      <p>
                        {new Date(transaction.dateTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <p className="text-sm font-semibold">Credits Sold:</p>
                      </div>
                      <p className="font-semibold text-green-700">
                        {transaction.creditsSold}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-5 w-5 text-yellow-600" />
                        <p className="text-sm font-semibold">Earning:</p>
                      </div>
                      <p className="font-bold text-green-700">
                        ₹{(transaction.creditsSold * 300).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GSTIN Dialog */}
      <CompanyDetailsDialog
        isOpen={isOpen}
        onClose={closeDialog}
        gstin={selectedGstin}
      />
    </>
  );
}
