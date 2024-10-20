'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AlertCircle, ArrowLeft, Download, TrendingDown, TrendingUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Transaction {
    creditsBought: number
    _id: string
    paymentId: string
    orderId: string
    amount: number
    dateTime: string
    district: string
}

interface Emission {
    month: string
    emissions: number
}

interface MSME {
    gstin: string
    emissions: Emission[]
    // Add other MSME fields as needed
}

export default function DetailedAnalytics() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [gstin, setGstin] = useState<string | null>(null)

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [emissions, setEmissions] = useState<Emission[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [timeRange, setTimeRange] = useState('1y')

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.gstin) {
            setGstin(session.user.gstin)
        } else if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session, status, router])

    useEffect(() => {
        const fetchData = async () => {
            if (!gstin) {
                setError('GSTIN is not available. Please update your profile.')
                setLoading(false)
                return
            }

            try {
                const [msmeRes, transactionsRes] = await Promise.all([
                    fetch(`/api/msme/profile/fetchUserInfo/${gstin}`),
                    fetch('/api/msme/fetchTransactions')
                ])

                if (!msmeRes.ok) {
                    throw new Error(`Failed to fetch MSME data: ${msmeRes.statusText}`)
                }
                if (!transactionsRes.ok) {
                    throw new Error(`Failed to fetch transactions: ${transactionsRes.statusText}`)
                }

                const msmeData: MSME = await msmeRes.json()
                const transactionsData = await transactionsRes.json()

                if (!Array.isArray(msmeData.emissions)) {
                    throw new Error('Emissions data is not in the expected format')
                }
                setEmissions(msmeData.emissions)

                if (!transactionsData.success || !Array.isArray(transactionsData.transactions)) {
                    throw new Error('Transactions data is not in the expected format')
                }
                setTransactions(transactionsData.transactions)

            } catch (err) {
                console.error('Error fetching data:', err)
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }

        if (gstin) {
            fetchData()
        }
    }, [gstin])

    const filterDataByTimeRange = (data: any[], dateField: string) => {
        const now = new Date()
        const timeRanges = {
            '1m': new Date(now.setMonth(now.getMonth() - 1)),
            '3m': new Date(now.setMonth(now.getMonth() - 2)),
            '6m': new Date(now.setMonth(now.getMonth() - 3)),
            '1y': new Date(now.setFullYear(now.getFullYear() - 1))
        }
        return data.filter(item => new Date(item[dateField]) >= timeRanges[timeRange])
    }

    const filteredTransactions = filterDataByTimeRange(transactions, 'dateTime')
    const filteredEmissions = filterDataByTimeRange(emissions, 'month')

    const totalCredits = filteredTransactions.reduce((sum, t) => sum + t.creditsBought, 0)
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
    const totalEmissions = filteredEmissions.reduce((sum, e) => sum + e.emissions, 0)

    const creditsTrend = filteredTransactions.length > 1
        ? (filteredTransactions[filteredTransactions.length - 1].creditsBought - filteredTransactions[0].creditsBought) / filteredTransactions[0].creditsBought
        : 0

    const emissionsTrend = filteredEmissions.length > 1
        ? (filteredEmissions[filteredEmissions.length - 1].emissions - filteredEmissions[0].emissions) / filteredEmissions[0].emissions
        : 0

    if (status === 'loading' || loading) {
        return <div className="flex justify-center items-center h-screen">Loading data...</div>
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen p-4">
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button variant="outline" onClick={() => router.push('/msme/home')}>
                    Back to Dashboard
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <main className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" onClick={() => router.push('/msme/home')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1m">Last Month</SelectItem>
                            <SelectItem value="3m">Last 3 Months</SelectItem>
                            <SelectItem value="6m">Last 6 Months</SelectItem>
                            <SelectItem value="1y">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Credits Purchased</CardTitle>
                            {creditsTrend > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCredits}</div>
                            <p className="text-xs text-muted-foreground">
                                {creditsTrend > 0 ? '+' : ''}{(creditsTrend * 100).toFixed(2)}% from start
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Amount Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                            {emissionsTrend > 0 ? <TrendingUp className="h-4 w-4 text-red-500" /> : <TrendingDown className="h-4 w-4 text-green-500" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmissions.toFixed(2)} tons</div>
                            <p className="text-xs text-muted-foreground">
                                {emissionsTrend > 0 ? '+' : ''}{(emissionsTrend * 100).toFixed(2)}% from start
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Credits Purchased Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{
                                credits: {
                                    label: "Credits",
                                    color: "#4c9a2a",
                                },
                            }} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={filteredTransactions}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="dateTime" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line type="monotone" dataKey="creditsBought" stroke="var(--color-credits)" name="Credits" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Emissions Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{
                                emissions: {
                                    label: "Emissions",
                                    color: "#4c9a2a",
                                },
                            }} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={filteredEmissions}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Bar dataKey="emissions" fill="var(--color-emissions)" name="Emissions" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Report
                    </Button>
                </div>
            </main>
        </div>
    )
}