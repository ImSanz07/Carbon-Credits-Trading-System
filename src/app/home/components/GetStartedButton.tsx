"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const GetStartedButton = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/login')
    }
  return (
    <>
          <Button
              className="bg-white text-green-800 hover:bg-green-100"
              onClick={handleClick}
          >
              Get Started
          </Button>
    </>
  )
}

export default GetStartedButton