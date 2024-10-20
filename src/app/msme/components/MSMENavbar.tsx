"use client"
import { handleSignOut } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Leaf, User, ScrollTextIcon, LogOut, Store, StoreIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'

const MSMENavbar = () => {
    const handleSignOutWithToast = async () => {
    try {
      await handleSignOut()
      toast.success('You have successfully signed out.')
    } catch (error) {
      toast.error('Failed to sign out. Please try again.')
    }
  }
  return (
      <header className="bg-green-700 text-white shadow-md">
          <div className="container h-28 mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                  <Leaf className="h-8 w-8" />

                  <span className="text-2xl font-bold">
                      <Link href="/msme/home">
                          Carbon Credits Trading System (MSME)
                      </Link>
                  </span>
              </div>
              <nav className="flex items-center space-x-14">
                  <Link href="/msme/profile" className="hover:text-green-200 transition-colors">
                      <User className="h-6 w-6" />

                  </Link>
                  <Link href="/msme/marketplace" className="hover:text-green-200 transition-colors">
                      <StoreIcon className="h-6 w-6" />

                  </Link>
                  <Link href="/msme/transactions" className="hover:text-green-200 transition-colors">
                      <ScrollTextIcon className="h-6 w-6" />

                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition:hover duration-75"
                    onClick={handleSignOutWithToast}
                  >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                  </Button>

              </nav>
          </div>
      </header>
  )
}

export default MSMENavbar