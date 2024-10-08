/***
 * This route handles direct video uploads from the client to YouTube without using Supabase.
 * 
 * - The client sends a video file, title, description, and tags as FormData.
 * - The video file is streamed directly to YouTube using the Google API after being converted into a readable stream.
 * - OAuth2 authentication is handled using access and refresh tokens stored in cookies.
 * - This route avoids intermediate storage and directly streams the video from the client upload to YouTube.
 * 
 * Ensure that the OAuth credentials are valid before attempting to upload the video.
***/

import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "@/utils/oauthClient";
import { Readable } from "stream";

// Initialize the YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

export async function POST(request: NextRequest) {
  try {
    // Get form data
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const tags = (formData.get("tags")?.toString() || "").split(",");
    const videoFile = formData.get("videoFile") as File;

    if (!videoFile) {
      throw new Error("No video file provided");
    }

    // Convert File to stream
    const buffer = Buffer.from(await videoFile.arrayBuffer());
    const fileStream = Readable.from(buffer);

    // Ensure tokens are set on the oauth2Client
    const cookies = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (cookies && refreshToken) {
      oauth2Client.setCredentials({
        access_token: cookies,
        refresh_token: refreshToken,
      });
    } else {
      throw new Error("Tokens are missing");
    }

    // Upload the video to YouTube
    const response = await youtube.videos.insert({
      part: ["snippet,status"],
      requestBody: {
        snippet: {
          title,
          description,
          tags,
          categoryId: "22", // Example: category for "People & Blogs"
        },
        status: {
          privacyStatus: "private", // "public", "unlisted", or "private"
        },
      },
      media: {
        body: fileStream, // Provide a readable stream for the video file
      },
    });

    // Respond with success
    return NextResponse.json({ success: true, videoId: response.data.id });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
