'use client';

import { Copy, Check } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { shortenedItemId } from '@/lib/utils';

interface CopyableAddressCellProps {
    address: string;
}

export const CopyableAddressCell = ({ address }: CopyableAddressCellProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className='flex items-center justify-between w-full gap-2'>
            <span>{shortenedItemId(address)}</span>
            <Button
                variant='ghost'
                onClick={handleCopy}
                className='p-1 hover:bg-white/15 rounded cursor-pointer'
                title={copied ? 'Copied!' : 'Copy to clipboard'}>
                {copied ? <Check className='w-4 h-4 text-green-500' /> : <Copy className='w-4 h-4' />}
            </Button>
        </div>
    );
};
