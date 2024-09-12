import { oauth2Client } from "@/utils/oauthClient";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const user = google.oauth2({
  version: "v2",
  auth: oauth2Client,
});

const scopes = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export async function GET(request: NextRequest) {
  const cookies = request.cookies.get("token")?.value;

  if (!cookies) {
    //user not  authenticated
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });

    return NextResponse.redirect(url);
  } else {
    //user authenticated
    oauth2Client.setCredentials({ access_token: cookies });

    try {
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;
      const { data } = await user.userinfo.get();
      console.log(data)
      return NextResponse.redirect(`${baseUrl}/upload`);
    } catch (err) {
      console.error("Failed to fetch user info", err);
      return NextResponse.json({
        success: false,
        message: "Failed to fetch user info",
      });
    }
  }
}
