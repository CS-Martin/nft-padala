import QRCode from 'react-qr-code';
import { useEffect, useRef } from 'react';

export const QRGenerator = ({ value, onGenerate }: { value: string; onGenerate?: (svgBlob: Blob) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && onGenerate) {
            const svgElement = containerRef.current.querySelector('svg');
            if (svgElement) {
                // Serialize SVG and convert to Blob
                const serializer = new XMLSerializer();
                const svgString = serializer.serializeToString(svgElement);
                const blob = new Blob([svgString], { type: 'image/svg+xml' });

                onGenerate(blob); // Pass the Blob back to parent
            }
        }
    }, [value, onGenerate]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div
                className='border p-5 rounded-lg'
                ref={containerRef}>
                <QRCode
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={value}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <p className='text-center text-white mt-4'>Scan the QR code to access the contract page</p>
        </div>
    );
};
