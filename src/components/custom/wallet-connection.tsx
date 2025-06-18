'use client';

import { WalletStatus } from '@/types/wallet-status.type';
import { Button } from '../ui/button';

import { LogOut, User } from 'lucide-react';
import { IoIosWallet } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex'>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />

                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[200px]'>
                <DropdownMenuLabel>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-[20px] h-[20px]'>
                            <AvatarImage src='https://github.com/shadcn.png' />

                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        {walletStatus.address?.slice(0, 6)}...
                        {walletStatus.address?.slice(-4)}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={disconnectWallet}
                    disabled={isLoading}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
