import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server"
import { PUBLIC_ROUTES,LOGIN,ROOT } from "@/lib/routes"

export async function middleware(request:NextRequest){
    const { nextUrl } = request;
    const session = await auth();
    console.log(session);
    
    // return NextResponse.redirect(new URL("/home",request.url))

    // Check if the user is authenticated
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated,nextUrl.pathname);

    // Define restricted routes for authenticated users
    const restrictedRoutes = [LOGIN, "/signup", "/home"];


    const isPublicRoute=(PUBLIC_ROUTES.find(route=>nextUrl.pathname.startsWith(route)) );
    console.log(isPublicRoute);

    if(!isAuthenticated && !isPublicRoute){
        return NextResponse.redirect(new URL(LOGIN,request.url));
    }

    // If the user is authenticated and tries to access login/signup/home, redirect to their respective dashboard
    if (isAuthenticated && restrictedRoutes.includes(nextUrl.pathname)) {
        const redirectUrl = session.user.type === "farmer" ? "/farmer/home" : "/msme/home";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Proceed normally for all other requests
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}



