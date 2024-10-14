import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { auth } from '@/auth'
import { handleSignOut } from '@/actions/login';


const Navbar = async () => {
    const session = await auth()
    return (
        <div className='bg-[#467750] shadow-xl py-10 m-2 rounded-md flex justify-between items-center'>
            <div>
                {/* Conditional redirection based on user type */}
                <Link href={session ? (session.user.type === "farmer" ? "/farmer/home" : "/msme/home") : "/home"}>
                    <h1 className='text-2xl text-white ml-10 cursor-pointer'>
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
                                <Button className='bg-darkGreenButton hover:bg-lightGreenButton'>Login</Button>
                        </Link>
                        <Link href={"/signup/farmer"}>
                            <Button className='bg-darkGreenButton hover:bg-lightGreenButton'>Sign Up (Farmer)</Button>
                        </Link>
                        <Link href={"/signup/msme"}>
                                <Button className='bg-darkGreenButton hover:bg-lightGreenButton'>Sign Up (MSME)</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;