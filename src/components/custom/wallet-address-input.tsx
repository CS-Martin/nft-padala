'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input'; // adjust to your project
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface WalletAddressInputProps {
    walletAddress: string;
    label?: string;
}

export const WalletAddressInput: React.FC<WalletAddressInputProps> = ({ walletAddress, label = 'My Wallet Address' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!walletAddress) return;
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        toast.success('Wallet address copied!');
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div>
            <Label htmlFor='wallet'>{label}</Label>
            <div className='relative'>
                <Input
                    id='wallet'
                    type='text'
                    readOnly
                    value={walletAddress}
                    className='mt-2 pr-10'
                />
                <button
                    type='button'
                    onClick={handleCopy}
                    aria-label='Copy wallet address'
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors'>
                    {copied ? <Check className='w-4 h-4 text-green-400' /> : <Copy className='w-4 h-4' />}
                </button>
            </div>
        </div>
    );
};
