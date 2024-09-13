import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { cookies } from 'next/headers';
import "./globals.css";
import Header from "@/components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Video Uploader by Prince Kwesi",
  description: "Uploading to Youtube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  // Determine authentication status
  const isAuthenticated = !!token;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header isAuthenticated={isAuthenticated} />
        <main className="container min-h-96 m-5">
          {children}
        </main>
        <footer className="relative bg-gray-300 py-1.5 row-start-3 flex gap-10 flex-wrap items-center justify-center bottom-0">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/genthegreat/video-uploader"
            target="_blank"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Github
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://princekwesi.website"
            target="_blank"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Meet the Developer
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/privacy"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Privacy Policy
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/terms"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Terms & Conditions
          </a>
        </footer>
      </body>
    </html>
  );
}
