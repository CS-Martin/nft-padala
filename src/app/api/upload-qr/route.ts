import s3Service from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Verify content type
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
        return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
    }

    try {
        const { svg, key } = await req.json();

        if (!svg || !key) {
            return NextResponse.json({ error: 'Missing svg or key in request' }, { status: 400 });
        }

        const buffer = Buffer.from(svg, 'utf-8');
        const url = await s3Service.uploadBuffer(buffer, key, 'image/svg+xml');

        return NextResponse.json({ url }, { status: 200 });
    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json({ error: 'Failed to upload QR code', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
