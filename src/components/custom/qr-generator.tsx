import QRCode from 'react-qr-code';

export const QRGenerator = ({ value }: { value: string }) => {
    return (
        <div className=''>
            <div className='flex justify-center items-center '>
                <div className='border p-5 rounded-lg '>
                    <QRCode
                        size={256}
                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                        value={value}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
            <p className='text-center text-white mt-4'>Scan the QR code to access the contract page</p>
        </div>
    );
};
