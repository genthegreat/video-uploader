import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
    request.cookies.delete('token')
    request.cookies.delete('refreshToken')

    return NextResponse.redirect(new URL('/', request.url).toString());
}