import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Allow requests from all origins by setting CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests for OPTIONS method
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: response.headers
        });
    }

    return response;
}

// Define paths where this middleware should be applied (here, it's for all paths)
export const config = {
    matcher: '/:path*',
};
