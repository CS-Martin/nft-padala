'use client';

import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import { ItemDetailsResponse } from '@/types/item-details.type';
import { abi } from '@/utils/abi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useReadContract } from 'wagmi';
import HistoryDataTable from './_components/history-data-table';
import { Package } from 'lucide-react';
import { ShineBorder } from '@/components/magicui/shine-border';

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
        <main className='px-[20px] lg:px-[100px] 2xl:px-[200px]'>
            <div className='mt-8'>
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: `${data.s_itemName}`, href: '#' },
                    ]}
                />
            </div>

            <div className='mt-8 relative w-[800px] rounded-2xl border p-7 shadow-xl'>
                <ShineBorder shineColor={['#45e670', '#00ff99', '#62ff00']} />

                <div className='flex justify-between items-center'>
                    <span className='text-xs text-zinc-400 flex gap-2 items-center'>item_{data.s_itemIdentifier}</span>
                    <div className='flex items-center justify-center'>
                        <div className={`absolute animate-ping flex items-center justify-center h-3 w-3 rounded-full 'bg-green-500`}></div>
                        <div className={`absolute h-3 w-3 rounded-full bg-green-500`}></div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='mt-10 mb-1 flex items-center gap-2'>
                            <Package size={24} /> {data.s_itemName}
                        </h3>
                        <p className='text-sm pb-8 text-zinc-200 mb-4'>{data.s_locationOrigin}</p>
                    </div>
                    <Image
                        src={`${(process.env.NEXT_PUBLIC_R2_BUCKET_PUBLIC_URL ?? '') + '/qrcodes/' + realId}.svg`}
                        alt='QR Code Image'
                        height={100}
                        width={100}
                        className='w-50 h-auto'
                    />
                </div>

                <span className='text-sm text-zinc-400 font-medium mb-1'>Recipient Reached? {data.s_recipientReached ? 'Yes' : 'No'}</span>
                <hr className='mt-2' />
                <div className='mt-2 text-[11px] text-zinc-700 flex justify-between'>
                    <span>finalrecipient_{data.s_finalRecipient}</span>
                    <span>recipient </span>
                </div>
            </div>

            {/* Table */}
            <HistoryDataTable realId={realId} />
        </main>
    ) : (
        <div>test</div>
    );
}
