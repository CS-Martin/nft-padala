'use client';
import QRCode from 'react-qr-code';
import { useEffect, useRef } from 'react';

export const QRGenerator = ({ value }: { value: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const uploadQrCode = async () => {
            const svgElement = containerRef.current?.querySelector('svg');
            if (!svgElement) return;

            try {
                const svgString = new XMLSerializer().serializeToString(svgElement);
                const key = `qrcodes/${crypto.randomUUID()}.svg`;

                const response = await fetch('/api/upload-qr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json', // Explicitly ask for JSON
                    },
                    body: JSON.stringify({ svg: svgString, key }),
                });

                // Check if response is JSON
                const contentType = response.headers.get('content-type');

                if (!contentType?.includes('application/json')) {
                    const text = await response.text();
                    throw new Error(`Unexpected response: ${text.substring(0, 100)}`);
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Upload failed');
                }

                console.log('QR uploaded:', data.url);
            } catch (error) {
                console.error('Upload error:', error);
                // Add your error handling UI here
            }
        };

        uploadQrCode();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div
                className='border p-5 rounded-lg'
                ref={containerRef}>
                <QRCode
                    size={256}
                    value={value}
                    viewBox={`0 0 256 256`}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                />
            </div>
            <small>{value}</small>
            <p className='text-center text-white mt-4'>Scan the QR code to access the contract page</p>
        </div>
    );
};
