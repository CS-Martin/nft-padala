'use client';

import { WalletStatus } from '@/types/wallet-status.type';
import { Button } from '../ui/button';

import { Check, Copy, LogOut, User } from 'lucide-react';
import { IoIosWallet } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useWalletStore } from '@/stores/wallet.store';
import { muchShortenedItemId, shortenedItemId } from '@/lib/utils';

interface WalletConnectionProps {
    walletStatus: WalletStatus;
    connectWallet: () => void;
    disconnectWallet: () => void;
    isLoading: boolean;
}

export const WalletConnection = ({ walletStatus, connectWallet, disconnectWallet, isLoading }: WalletConnectionProps) => {
    return (
        <div>
            {walletStatus.isConnected ? (
                <AvatarButton
                    walletStatus={walletStatus}
                    connectWallet={connectWallet}
                    disconnectWallet={disconnectWallet}
                    isLoading={isLoading}
                />
            ) : (
                <Button
                    onClick={connectWallet}
                    disabled={isLoading}
                    variant={'outline'}
                    className='cursor-pointer'>
                    <IoIosWallet /> <span>Connect Wallet</span>
                </Button>
            )}
        </div>
    );
};

function AvatarButton({ walletStatus, disconnectWallet, isLoading }: WalletConnectionProps) {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(walletStatus.address || '');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='relative gap-3 border rounded-full p-1.5 flex items-center justify-between cursor-pointer'>
                <div className='relative'>
                    <Avatar className='w-7 h-7'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>

                    {/* Green active circle */}
                    <span className='absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-neutral-950'></span>
                </div>
                <small className='text-neutral-300'>{muchShortenedItemId(walletAddress)}</small>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-[200px]'>
                <DropdownMenuLabel>
                    <div className='flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-2'>
                            <Avatar className='w-[20px] h-[20px]'>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>
                                {walletStatus.address?.slice(0, 6)}...
                                {walletStatus.address?.slice(-4)}
                            </span>
                        </div>

                        <button
                            onClick={handleCopy}
                            className='p-1 hover:bg-white/15 cursor-pointer rounded'
                            title={copied ? 'Copied!' : 'Copy to Wallet Address'}>
                            {copied ? <Check className='w-4 h-4 text-green-500' /> : <Copy className='w-4 h-4' />}
                        </button>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={disconnectWallet}
                    disabled={isLoading}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
