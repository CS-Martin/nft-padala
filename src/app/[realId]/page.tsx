'use client';

import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import { ItemDetailsResponse } from '@/types/item-details.type';
import { abi } from '@/utils/abi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useReadContract } from 'wagmi';

export default function ItemDetailsPage() {
    const searchParams = useSearchParams();
    const realId = searchParams.get('id');

    const { data, isLoading } = useReadContract({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'getItemDetailsByRealId',
        args: realId ? [realId] : undefined,
    }) as {
        data: ItemDetailsResponse;
        isLoading: boolean;
        error: Error | null;
    };

    if (isLoading) {
        return <div>Loading..</div>;
    }

    return realId ? (
        <div>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: `${data.s_itemName}`, href: '#' },
                ]}
            />

            <div className='border w-fit p-5 rounded-lg'>
                <Image
                    src={`${(process.env.NEXT_PUBLIC_R2_BUCKET_PUBLIC_URL ?? '') + '/qrcodes/' + realId}.svg`}
                    alt='QR Code Image'
                    height={100}
                    width={100}
                    className='w-50 h-auto'
                />
            </div>
            <h1>Item Details Page</h1>
            <p>This page will display details for a specific item.</p>
            <p>Item ID: {data.s_itemIdentifier}</p>
            <p>Item Name: {data.s_itemName}</p>
            <p>Item Address: {data.s_locationOrigin}</p>
            <p>Final Recipient: {data.s_finalRecipient}</p>
            <p>Recipient Reached? {data.s_recipientReached ? 'Yes' : 'No'}</p>
            {/* Additional components and logic to fetch and display item details can be added here */}
        </div>
    ) : (
        <div>test</div>
    );
}
