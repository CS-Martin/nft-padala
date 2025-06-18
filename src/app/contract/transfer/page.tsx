'use client';

import TransferContractForm from '@/components/custom/forms/transfer-contract-form';
import { useSearchParams } from 'next/navigation';

export default function TransferContractPage() {
    const searchParams = useSearchParams();
    const realId = searchParams.get('id');

    return (
        <div className='h-dvh w-full max-w-4xl px-2 mt-10 md:px-5 mx-auto'>
            <TransferContractForm realId={realId} />
        </div>
    );
}
