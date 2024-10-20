"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const Success = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4"
          >
            <Leaf className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center text-green-800">Transaction Successful!</CardTitle>
          <CardDescription className="text-center text-green-600">
            Your purchase of carbon credits has been completed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your contribution to a sustainable future. Your purchase helps reduce carbon emissions and supports eco-friendly practices.
          </p>
          <blockquote className="italic text-green-700 border-l-4 border-green-500 pl-4 py-2">
            "The greatest threat to our planet is the belief that someone else will save it." - Robert Swan
          </blockquote>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-100 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-green-800 mb-2">Your Impact</h3>
            <p className="text-green-700">
              By purchasing carbon credits, you've potentially offset the equivalent of planting several trees or reducing multiple car trips. Every credit counts towards a cleaner, greener planet.
            </p>
          </motion.div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            onClick={() => router.push("/msme/marketplace")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Marketplace
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Success