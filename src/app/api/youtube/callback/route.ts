import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ success: false, message: 'Authorization failed' });
  }

  // Redirect to a client page for uploading after OAuth is successful
  return NextResponse.redirect(`/upload?code=${code}`);
}
