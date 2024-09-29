"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { auth } from '@/auth'
import { handleSignOut } from '@/actions/login';


const Navbar = async () => {
    const session = await auth()  
    return (
        <div className='bg-white shadow-xl py-10 m-2 rounded-md flex justify-between items-center'>
            <div>
                <Link href={"/home"}>
                    <h1 className='text-2xl ml-10'>
                        Carbon Credits Trading System
                    </h1>
                </Link>
            </div>

            <div className='mr-10 flex flex-row gap-4'>
                {session ? (
                    <>
                        {session.user.type === "farmer" && (
                            <>
                                <Link href={"/farmer/home"}>
                                    <Button>Farmer Dashboard</Button>
                                </Link>
                                <Link href={"/farmer/profile"}>
                                    <Button>Profile</Button>
                                </Link>
                            </>
                        )}
                        {session.user.type === "msme" && (
                            <>
                                <Link href={"/msme/home"}>
                                    <Button>MSME Dashboard</Button>
                                </Link>
                                <Link href={"/msme/profile"}>
                                    <Button>Profile</Button>
                                </Link>
                            </>
                        )}
                        <form action={handleSignOut}>
                            <Button type='submit'>
                                Sign Out
                            </Button>

                        </form>
                    </>
                ) : (
                    <>
                        <Link href={"/login"}>
                            <Button>Login</Button>
                        </Link>
                        <Link href={"/farmer/signup"}>
                            <Button>Sign Up (Farmer)</Button>
                        </Link>
                        <Link href={"/msme/signup"}>
                            <Button>Sign Up (MSME)</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;