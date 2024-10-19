import { handleSignOut } from '@/actions/login';
import { Button } from '@/components/ui/button'
import { Leaf, LogOut, Settings,ScrollTextIcon, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const UpdatedNavbar = () => {
    return (
        <header className="bg-green-700 text-white shadow-md">
            <div className="container h-28 mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Leaf className="h-8 w-8" />

                    <span className="text-2xl font-bold">
                        <Link href="/farmer/home">
                            Carbon Credits Trading System (Farmer)
                        </Link>
                    </span>
                </div>
                <nav className="flex items-center space-x-14">
                    <Link href="/farmer/profile" className="hover:text-green-200 transition-colors">
                        <User className="h-6 w-6" />
                        
                    </Link>
                    <Link href="/farmer/transactions" className="hover:text-green-200 transition-colors">
                        <ScrollTextIcon className="h-6 w-6" />
                        
                    </Link>
                    <form action={handleSignOut}>
                        <Button variant="outline" size="sm" className="text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition:hover duration-75">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>

                    </form>
                    
                </nav>
            </div>
        </header>
    )
}

export default UpdatedNavbar