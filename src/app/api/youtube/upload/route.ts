import { oauth2Client } from '@/utils/oauthClient';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client,
});

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
  });
  return NextResponse.redirect(url);
}

// Once authenticated, Google redirects back to the callback route with a code
export async function POST(request: NextRequest) {
  const { code, videoDetails } = await request.json();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const res = await youtube.videos.insert({
      part: ['snippet,status'],
      requestBody: {
        snippet: {
          title: videoDetails.title,
          description: videoDetails.description,
          tags: videoDetails.tags,
          categoryId: '22', // Example: category for "People & Blogs"
        },
        status: {
          privacyStatus: 'public', // "public", "unlisted", or "private"
        },
      },
      media: {
        body: videoDetails.videoFile, // This should be a readable stream for the video
      },
    });

    return NextResponse.json({ success: true, videoId: res.data.id });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ success: false, error });
  }
}
