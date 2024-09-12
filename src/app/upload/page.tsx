import { cookies } from 'next/headers'
import UploadForm from './form';
import { oauth2Client } from '@/utils/oauthClient';
import { google } from 'googleapis';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Upload Page | Video Uploader by Prince Kwesi",
    description: "Uploading to Youtube",
};  

export default async function UploadPage() {
    const cookieStore = cookies()
    const authed = cookieStore.get('token')

    if (!authed) return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8'>
            <p>You must be logged in to access this page.</p>
            <a
                href="/api/youtube/auth"
                className="w-full flex justify-center my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Login
            </a>
        </div>
    );

    oauth2Client.setCredentials({ access_token: authed.value });

    // Fetch the user's info from Google OAuth
    let userName;

    try {
        const user = google.oauth2({
            version: "v2",
            auth: oauth2Client,
        });
        const { data } = await user.userinfo.get();
        userName = data.name || 'User';  // Set a default if no name
    } catch (error) {
        console.error('Failed to fetch user info', error);
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
            {userName && <h1 className='w-full text-2xl text-center'>Hello {userName}</h1>}
            <UploadForm />
        </div>
    );
}