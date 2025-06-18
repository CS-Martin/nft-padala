'use client';

import { WalletStatus } from '@/types/wallet-status.type';
import { Button } from '../ui/button';

import { LogOut, User } from 'lucide-react';
import { IoIosWallet } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
                <>
                    <div className='flex items-center gap-3'>
                        <Button
                            onClick={disconnectWallet}
                            disabled={isLoading}
                            className='cursor-pointer'
                            variant={'ghost'}>
                            <Avatar className='w-[25px] h-[25px]'>
                                <AvatarImage src='https://github.com/shadcn.png' />

                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <span className='text-zinc-300'>
                                {walletStatus.address?.slice(0, 6)}...
                                {walletStatus.address?.slice(-4)}
                            </span>
                            <LogOut className='text-red-400' />
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <Button
                        onClick={connectWallet}
                        disabled={isLoading}
                        variant={'ghost'}
                        className='cursor-pointer'>
                        <IoIosWallet /> <span>Connect Wallet</span>
                    </Button>
                </>
            )}
        </div>
    );
};
