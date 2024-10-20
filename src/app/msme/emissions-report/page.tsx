'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft, Download, TrendingDown, TrendingUp, Building, Users, MapPin, Mail, Phone, Factory, CircleDivide, FileDigit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartConfig } from '@/components/ui/chart'

interface Transaction {
    creditsBought: number
    _id: string
    paymentId: string
    orderId: string
    amount: number
    dateTime: string
    district: string
}

const chartConfig = {
    desktop: {
        label: "Carbon Credits",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

interface Emission {
    month: string
    emissions: number
}

interface CompanyDetails {
    address: {
        fullAddress: string,
        district: string,
        state: string,
        zipCode: string,
    }
    businessName: string
    employeeCount: number
    industry: string
    gstin:string,
    emissions: Emission[],
    phoneNumber:string,
    email:string
}

export default function EmissionsReport() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [gstin, setGstin] = useState<string | null>(null)

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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
                const [transactionsRes, companyRes] = await Promise.all([
                    fetch('/api/msme/fetchTransactions'),
                    fetch(`/api/msme/profile/fetchUserInfo/${gstin}`)
                ])

                if (!transactionsRes.ok || !companyRes.ok) {
                    throw new Error('Failed to fetch data')
                }

                const transactionsData = await transactionsRes.json()
                const companyData = await companyRes.json()

                if (!transactionsData.success || !Array.isArray(transactionsData.transactions)) {
                    throw new Error('Transactions data is not in the expected format')
                }

                setTransactions(transactionsData.transactions)
                setCompanyDetails(companyData)

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

    const processTransactions = (transactions: Transaction[]) => {
        const creditsByMonth: { [key: string]: number } = {}
        transactions.forEach(t => {
            const month = new Date(t.dateTime).toISOString().slice(0, 7) // YYYY-MM format
            creditsByMonth[month] = (creditsByMonth[month] || 0) + t.creditsBought
        })
        return Object.entries(creditsByMonth).map(([month, credits]) => ({ month, credits }))
    }

    const carbonCredits = processTransactions(transactions)
    const emissions = companyDetails?.emissions || []

    const totalEmissions = emissions.reduce((sum, e) => sum + e.emissions, 0)
    const totalCredits = carbonCredits.reduce((sum, c) => sum + c.credits, 0)
    const netEmissions = totalEmissions - totalCredits

    const emissionsTrend = emissions.length > 1
        ? (emissions[emissions.length - 1].emissions - emissions[0].emissions) / emissions[0].emissions
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
                <Button variant="outline" onClick={() => router.push('/msme/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-green-50 p-4 sm:p-8">
            <main className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" onClick={() => router.push('/msme/home')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-green-800">Company Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-green-600" />
                            <span className="font-medium">{companyDetails?.businessName}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-green-600" />
                            <span>{companyDetails?.address
                                ? `${companyDetails.address.fullAddress}, ${companyDetails.address.district}, ${companyDetails.address.state}, ${companyDetails.address.zipCode}`
                                : 'Address not available'}</span>
                        </div>

                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-green-600" />
                            <span>300 Employees</span>
                        </div>
                        <div className="flex items-center">
                            <Factory className="h-5 w-5 mr-2 text-green-600" />
                            <span>Dairy Products</span>
                        </div>
                        <div className="flex items-center">
                            <FileDigit className="h-5 w-5 mr-2 text-green-600" />
                            <span>GSTIN: {companyDetails?.gstin}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-green-600" />
                            <span>Email: {companyDetails?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-green-600" />
                            <span>Contact Number: {companyDetails?.phoneNumber}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-3 mb-6">
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
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Carbon Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCredits}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Emissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{netEmissions.toFixed(2)} tons</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Emissions Over Time</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={emissions} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="emissions"
                                        stroke="#82ca9d" // Set line color
                                        name="Emissions"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Carbon Credits Purchased</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={carbonCredits} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        angle={0}
                                        height={30}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="credits"
                                        fill="#82ca9d" // Set bar color
                                        name="Carbon Credits"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
                <p className="font-bold">{label}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ color: pld.color }}>
                        {pld.name}: {pld.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};