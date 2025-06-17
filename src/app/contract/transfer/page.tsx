'use client';

import TransferContractForm from '@/components/custom/forms/transfer-contract-form';
import { useSearchParams } from 'next/navigation';

export default function TransferContractPage() {
    const searchParams = useSearchParams();
    const realId = searchParams.get('id');

    return (
        <div className='bg-neutral-950 min-h-screen pt-20 px-5'>
            <TransferContractForm realId={realId} />
        </div>
    );
}
