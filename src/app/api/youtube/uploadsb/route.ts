/***
 * This route handles video uploads to YouTube using Supabase for temporary storage.
 * 
 * - The client sends a video file, title, description, and tags as FormData.
 * - The video file is first uploaded to Supabase storage to avoid large direct uploads from the client.
 * - A signed URL is generated to securely access the uploaded video from Supabase.
 * - The video is then streamed from Supabase to YouTube using the Google API.
 * - OAuth2 authentication is handled using access and refresh tokens stored in cookies.
 * - After a successful upload to YouTube, the video is removed from Supabase.
 * 
 * Ensure that the OAuth credentials are valid and Supabase is correctly configured for video storage.
***/

import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "@/utils/oauthClient";
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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

    const { data, error } = await supabase.storage
      .from("videos")
      .upload(`${videoFile.name}`, videoFile);

    if (error) {
      console.log("supabase error", error);
      throw new Error("Error uploading video");
    }

    console.log("Supabase upload data:", data);

    // // Read video file as stream
    const { data: signedURL, error: urlError } = await supabase.storage
      .from("videos")
      .createSignedUrl(data.path, 60); // URL valid for 60 seconds;

    if (urlError) {
      console.error("Error generating signed URL:", urlError);
      throw new Error("Error generating signed URL");
    }

    // // Stream the video from the signed URL
    console.log("Supabase file url:", signedURL.signedUrl)
    
    const fileStream = await axios({
      method: 'get',
      url: signedURL.signedUrl,
      responseType: 'stream'
    });

    // Ensure tokens are set on the oauth2Client
    const cookies = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // console.log("Token from cookies:", cookies);
    // console.log("Refresh token from cookies:", refreshToken);

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

    // Clean up the uploaded file
    await supabase.storage.from("videos").remove([`${data.path}`]);

    // Respond with success
    return NextResponse.json({ success: true, videoId: response.data.id });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
