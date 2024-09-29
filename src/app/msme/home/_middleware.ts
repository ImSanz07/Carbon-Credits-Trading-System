// pages/msme/_middleware.js
import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Your authentication logic

export async function middleware() {
    const session = await auth();

    if (!session) {
        return NextResponse.redirect('/login'); // Redirect if not authenticated
    }

    return NextResponse.next(); // Allow the request to proceed if authenticated
}
