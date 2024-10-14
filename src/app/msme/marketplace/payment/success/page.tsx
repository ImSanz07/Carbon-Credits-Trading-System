"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Success = () => {
  const router = useRouter()
  return (
    <>
      <h1>Transaction went through successfully</h1>
      <Button onClick={(e) => router.push("/msme/marketplace")}>
  Go Back
</Button>
    </>
  )
}

export default Success