import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { oauth2Client } from "@/utils/oauthClient";

// type MulterError = multer.MulterError | null;

// // Configure multer with disk storage
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(process.cwd(), "public", "videos")); // Point to public/videos
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

// Initialize the YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

export async function POST(request: NextRequest) {
  //   const { code } = await request.json();
  console.log("Token from cookies:", request.cookies.get("token")?.value);
  console.log(
    "Refresh token from cookies:",
    request.cookies.get("refreshToken")?.value
  );

  try {
    // const { tokens } = await oauth2Client.getToken(code);
    // oauth2Client.setCredentials(tokens);

    // Get form data
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const tags = (formData.get("tags")?.toString() || "").split(",");
    const videoFile = formData.get("videoFile") as File;

    if (!videoFile) {
      throw new Error("No video file provided");
    }

    const videoFilePath = path.join(
      process.cwd(),
      "public",
      "videos",
      videoFile.name
    );

    // Upload file
    fs.writeFileSync(videoFilePath, Buffer.from(await videoFile.arrayBuffer()));

    // Read video file as stream
    const videoFileStream = fs.createReadStream(videoFilePath);

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
        body: videoFileStream, // Provide a readable stream for the video file
      },
    });

    // Clean up the uploaded file
    fs.unlinkSync(videoFilePath);

    // Respond with success
    return NextResponse.json({ success: true, videoId: response.data.id });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
