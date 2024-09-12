import { oauth2Client } from "@/utils/oauthClient";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({
      success: false,
      message: "Authorization code missing",
    });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("token", tokens);

    if (!tokens || !tokens.access_token || !tokens.refresh_token) {
      throw new Error("Failed to retrieve tokens");
    }

    oauth2Client.setCredentials(tokens);

    const token = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    // Create a NextResponse instance
    // Redirect to the upload page and set the tokens in cookies
    const response = NextResponse.redirect(`${baseUrl}/upload`);

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600, // 1 hour
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 2592000, // 30 days
    });

    return response;
  } catch (err) {
    console.error("Failed to authenticate", err);
    return NextResponse.json({
      success: false,
      message: "Authorization failed",
    });
  }
}
