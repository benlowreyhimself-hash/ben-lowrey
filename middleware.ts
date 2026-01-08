import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // Protect admin routes
    if (isAdminRoute(req)) {
        const { userId, sessionClaims } = await auth();

        // Not signed in - redirect to sign-in
        if (!userId) {
            const signInUrl = new URL('/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            return NextResponse.redirect(signInUrl);
        }

        // Check if user email matches admin
        const userEmail = sessionClaims?.email as string | undefined;
        const adminEmail = process.env.ADMIN_EMAIL;

        if (adminEmail && userEmail !== adminEmail) {
            // Not authorized - redirect to home
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
