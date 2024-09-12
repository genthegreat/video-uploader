# Video Uploader: Next.js + YouTube API

This app demonstrates how to upload videos to YouTube from a Next.js app. It leverages the YouTube Data API v3 for video uploads and integrates OAuth 2.0 for authentication. Additionally, it shows two methods of video handling:
- Direct upload from a file stream.
- Temporary storage and streaming via Supabase.

## Features

- OAuth 2.0 integration for secure video uploads to YouTube.
- Support for file uploads via form data.
- Two methods: Direct stream from the client or via Supabase for temporary storage.
- Error handling and cleanup after successful uploads.

## Prerequisites

Before running the project, make sure you have the following:

- [Node.js](https://nodejs.org/) installed (v16+ recommended).
- A [Google Cloud Project](https://console.cloud.google.com/) with YouTube Data API enabled.
- OAuth 2.0 credentials (client ID, client secret) for authenticating YouTube API requests.
- A [Supabase](https://supabase.com/) project (optional for temporary storage approach).
- A valid Supabase bucket for video storage (optional).

## Installation

1. Clone the repository:
```bash
       git clone https://github.com/yourusername/video-uploader-nextjs.git
       cd video-uploader-nextjs
```
2. Install
       
```bash=
npm install
# or
yarn install
```

3.  Set up environment variables:
    
    Create a `.env.local` file in the root of the project and add the following variables:
    
```bash
# Google API credentials
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth callback URL (replace localhost with your production URL if necessary)
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Supabase credentials (optional)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key 
```
   
##### Environment Variables

-   `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: The client ID for Google OAuth 2.0.
-   `GOOGLE_CLIENT_SECRET`: The client secret for Google OAuth 2.0.
-   `GOOGLE_REDIRECT_URI`: The OAuth redirect URI that points to your app's callback route.
-   `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (optional, for Supabase-based video uploads).
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key (optional, for Supabase-based video uploads).
-   `SUPABASE_SERVICE_KEY`: Supabase service role key (optional, only if you want to bypass rls. Otherwise use anon key).

## Running the App

After setting up environment variables and installing dependencies, start the development server:

```bash
`npm run dev` 
# Or
`yarn dev` 
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Routes

The app includes two routes for video uploads:

1. **Auth**: Handles user authentication through OAuth 2.0. 
2.  **Callback**: (`/api/auth/callback`): Handles the OAuth 2.0 callback after user authentication. It retrieves the authorization code, exchanges it for access and refresh tokens, and stores them in cookies. Finally, it redirects the user to the upload page.
3. **Logout** (`/api/auth/logout`): Logs the user out by clearing the authentication cookies (access token and refresh token).
4. **Direct video upload**: Streams the video file directly from the client to YouTube.
5.  **Supabase-based video upload**: Temporarily stores the video file on Supabase before streaming it to YouTube.

## Usage

1.  Open the app in your browser and log in with your Google account.
2.  Use the form to upload a video by providing a file, title, description, and tags.
3.  Choose either direct upload or upload via Supabase.
4.  Upon successful upload, the video will be available on your YouTube channel as a private video.

## Key Technologies

-   [Next.js](https://nextjs.org/)
-   [YouTube Data API](https://developers.google.com/youtube/v3)
-   [Supabase](https://supabase.com/)
-   [Axios](https://axios-http.com/) for handling HTTP requests.
-   [React Drag and Drop Files](https://github.com/KarimMokhtar/react-drag-drop-files)

## OAuth Setup

1.  In your Google Cloud project, create OAuth 2.0 credentials for Web applications.
2.  Set the redirect URI to `http://localhost:3000/api/auth/callback`.
3.  Add the client ID and client secret to your `.env.local` file.

## Error Handling

-   The app includes error handling for the following scenarios:
    -   Missing or invalid video files.
    -   Issues with Supabase upload or URL generation.
    -   Missing OAuth tokens or authentication failure.
    -   YouTube upload errors.

## Cleanup

If the video upload to YouTube is successful, the app will automatically delete the video from Supabase (if using the Supabase method). Otherwise, errors will be logged, and the video will remain in Supabase for troubleshooting.

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue for bug fixes or feature requests.

## License

This project is licensed under the MIT License.