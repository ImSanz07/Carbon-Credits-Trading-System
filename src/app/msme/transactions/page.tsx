'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowRight, BarChart2, Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { generatePDF } from '../utils/generateInvoice'

interface Transaction {
    creditsBought: number
    _id: string
    paymentId: string
    orderId: string
    amount: number
    dateTime: string
    district: string
}

export default function Transactions() {
    const { data: session } = useSession()
    const router = useRouter()
    const gstin = session?.user?.gstin || ''

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [totalCreditsBought, setTotalCreditsBought] = useState(0)
    const [totalAmountSpent, setTotalAmountSpent] = useState(0)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('/api/msme/fetchTransactions')
                if (!res.ok) {
                    throw new Error('Failed to fetch transactions')
                }
                const data = await res.json()
                if (data.success && Array.isArray(data.transactions)) {
                    setTransactions(data.transactions)
                    const total = data.transactions.reduce((acc: number, transaction: Transaction) => acc + transaction.creditsBought, 0)
                    setTotalCreditsBought(total)
                    const totalAmount = data.transactions.reduce((acc: number, transaction: Transaction) => acc + transaction.amount, 0)
                    setTotalAmountSpent(totalAmount)
                } else {
                    setError('No transactions found')
                }
            } catch (err) {
                console.error('Error fetching transactions:', err)
                setError('An error occurred while fetching transactions')
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading transactions...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    }

    const handleAnalyticsRedirect = () => {
        router.push('/msme/transactions/analytics');
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <main className="container mx-auto">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-2 bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-green-800">Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableCaption>A list of your recent carbon credit purchases.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>District</TableHead>
                                        <TableHead>Credits</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
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
                                            <TableCell>{decodeURIComponent(transaction.district)}</TableCell>
                                            <TableCell>{transaction.creditsBought}</TableCell>
                                            <TableCell className="text-right">₹{transaction.amount.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => generatePDF(transaction, gstin)}
                                                >
                                                    <Printer className="h-4 w-4 mr-2" />
                                                    Invoice
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4}>Total</TableCell>
                                        <TableCell>{totalCreditsBought}</TableCell>
                                        <TableCell className="text-right">₹{totalAmountSpent.toFixed(2)}</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-800">Transaction Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Total Credits Purchased</p>
                                <p className="text-2xl font-bold text-green-600">{totalCreditsBought}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Amount Spent</p>
                                <p className="text-2xl font-bold text-green-600">₹{totalAmountSpent.toFixed(2)}</p>
                            </div>
                            <Button onClick={handleAnalyticsRedirect} className="w-full justify-start text-left font-normal" variant="outline">
                                <BarChart2 className="mr-2 h-4 w-4" />
                                View Detailed Analytics
                            </Button>
                            <Button className="w-full justify-start text-left font-normal" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download Transaction Report
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-800">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                className="w-full justify-start text-left font-normal"
                                variant="outline"
                                onClick={() => router.push('/msme/home')}
                            >
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                            <Button
                                className="w-full justify-start text-left font-normal"
                                variant="outline"
                                onClick={() => router.push('/msme/marketplace')}
                            >
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Purchase More Credits
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2 bg-green-700 text-white shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Need Help Understanding Your Transactions?</h3>
                            <p className="mb-4">Our support team is here to assist you with any questions about your carbon credit purchases.</p>
                            <Button variant="secondary" className="bg-white text-green-800 hover:bg-green-100">
                                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}