import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { handleSignOut } from '@/actions/login';

const FarmerNavbar = () => {
    return (
        <div className='bg-white shadow-xl py-10 m-2 rounded-md flex justify-between items-center'>
            <Link href={"/farmer/home"}>
                <h1 className='text-2xl ml-10 cursor-pointer'>
                    Carbon Credits Trading System (Farmer)
                </h1>
            </Link>
            <div className='mr-10 flex flex-row gap-4'>
                <Link href={"/farmer/home"}>
                    <Button>Farmer Dashboard</Button>
                </Link>
                <Link href={"/farmer/transactions"}>
                    <Button>Credits History</Button>
                </Link>
                <Link href={"/farmer/profile"}>
                    <Button>Profile</Button>
                </Link>
                <form action={handleSignOut}>
                    <Button type='submit'>Sign Out</Button>
                </form>
            </div>
        </div>
    );
};

export default FarmerNavbar;
