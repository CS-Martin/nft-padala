'use client';
import QRCode from 'react-qr-code';
import { useEffect, useRef } from 'react';
import { getBaseUrl } from '@/lib/utils';

export const QRGenerator = ({ value }: { value: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const baseUrl = getBaseUrl();

    useEffect(() => {
        const uploadQrCode = async () => {
            const svgElement = containerRef.current?.querySelector('svg');
            if (!svgElement) return;

            try {
                const svgString = new XMLSerializer().serializeToString(svgElement);
                const key = `qrcodes/${value}.svg`;

                const response = await fetch('/api/upload-qr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
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
    }, [value]);

    return (
        <div className='flex text-center flex-col justify-center items-center'>
            <div
                className='border p-5 rounded-lg text-center'
                ref={containerRef}>
                <QRCode
                    size={256}
                    value={`${baseUrl}/contract/transfer?id=${value}`}
                    viewBox={`0 0 256 256`}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                />
                <span className='text-center text-[10px]'>{`${baseUrl}/contract/transfer?id=${value}`}</span>
            </div>

            <span className='text-[12px] mt-2 text-neutral-400'>
                You can scan it using a mobile wallet or share it with someone else to let them initiate the transfer contract.
            </span>
            <div className='border-b w-full my-5 md:hidden'></div>
        </div>
    );
};
