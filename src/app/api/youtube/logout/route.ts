import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
    // Create a new response object
    const response = NextResponse.redirect(new URL('/', request.url).toString());
    
    // Set cookies with expired date to delete them
    response.cookies.delete('token');
    response.cookies.delete('refreshToken');
    
    return response;
}
