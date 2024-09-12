import { cookies } from 'next/headers'
import UploadForm from './form';

export default function UploadPage() {
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

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <UploadForm />
        </div>
    );
}