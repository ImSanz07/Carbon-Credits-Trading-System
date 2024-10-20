"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Settings, Edit, MapPin, Phone, Mail, User, Tractor, Leaf } from "lucide-react"
import Link from 'next/link'

interface UserInfoProps {
    aadharNumber: string
}

export default function Component({ aadharNumber }: UserInfoProps) {
    const [farmerInfo, setFarmerInfo] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFarmerInfo = async () => {
            try {
                const response = await axios.get(`/api/farmer/profile/fetchUserInfo/${aadharNumber}`)
                setFarmerInfo(response.data)
            } catch (err) {
                setError('Failed to fetch farmer data')
            } finally {
                setLoading(false)
            }
        }

        if (aadharNumber) {
            fetchFarmerInfo()
        }
    }, [aadharNumber])

    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <Card className="w-full max-w-4xl">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <p className="text-red-500 text-center">{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-green-50">
            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-2 bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-green-800">Farmer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <User className="mr-2 h-5 w-5 text-green-600" />
                                        Full Name
                                    </h3>
                                    <p className="text-gray-600 mt-1">{farmerInfo.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <FileText className="mr-2 h-5 w-5 text-green-600" />
                                        Aadhar Number
                                    </h3>
                                    <p className="text-gray-600 mt-1">{farmerInfo.aadharNumber}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-800">Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="mr-2 h-5 w-5 text-green-600" />
                                <p className="text-gray-600">{farmerInfo.phoneNumber}</p>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                                <p className="text-gray-600">{farmerInfo.address.fullAddress} , {farmerInfo.address.district} , {farmerInfo.address.state} , {farmerInfo.address.zipCode}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-800">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/farmer/transactions" className="flex items-center">
                                <Button className="w-full justify-start text-left font-normal" variant="outline">
                                    <Leaf className="mr-2 h-4 w-4" />
                                    View Carbon Credits
                                </Button>
                            </Link>
                            <Link href="" className="flex items-center">
                                <Button className="w-full justify-start text-left font-normal" variant="outline">
                                    <Tractor className="mr-2 h-4 w-4" />
                                    Manage Land & Crops
                                </Button>
                            </Link>
                            <Link href="" className="flex items-center">
                                <Button className="w-full justify-start text-left font-normal" variant="outline">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Account Settings
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2 bg-green-700 text-white shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Ready to Update Your Information?</h3>
                            <p className="mb-4">Keep your account details up-to-date for better service and accurate reporting.</p>
                            <Button variant="secondary" className="bg-white text-green-800 hover:bg-green-100">
                                <Link className="flex items-center" href="">
                                    Edit Profile <Edit className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2 bg-green-700 text-white shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Ready to Sell Your Carbon Credits?</h3>
                            <p className="mb-4">List your available carbon credits on our marketplace and connect with potential buyers.</p>
                            <Button variant="secondary" className="bg-white text-green-800 hover:bg-green-100">
                                <Link className="flex items-center" href="">
                                    List Carbon Credits <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}