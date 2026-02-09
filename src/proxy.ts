import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
    '/',
    '/login(.*)',
    '/cadastro(.*)',
    '/api/webhooks(.*)',
    '/carrinho(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // 1. Check for public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // 2. Check for admin routes
    if (isAdminRoute(req)) {
        const session = await auth();

        // Protect the route - redirects to sign-in if not authenticated
        if (!session.userId) {
            return session.redirectToSignIn();
        }

        // Check for admin role in session claims or metadata
        const role = (session.sessionClaims?.metadata as { role?: string })?.role;

        if (role !== "admin") {
            // Redirect to home if not an admin
            const url = new URL("/", req.url);
            return NextResponse.redirect(url);
        }
    }

    // 3. Protect all other non-public routes
    await auth.protect();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
