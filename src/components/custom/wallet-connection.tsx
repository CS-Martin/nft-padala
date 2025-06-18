'use client';

import { WalletStatus } from '@/types/wallet-status.type';
import { Button } from '../ui/button';
import NeumorphButton from '../ui/neumorph-button';
import { TextureButton } from '../ui/texture-button';
import { ChevronDown, LogOut, WalletMinimal } from 'lucide-react';
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
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>
                                {walletStatus.address?.slice(0, 6)}...
                                {walletStatus.address?.slice(-4)}
                            </span>
                            <LogOut size={10} />
                        </Button>
                    </div>

                    {/* <Button
                        onClick={disconnectWallet}
                        disabled={isLoading}
                        className='bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                        Disconnect Wallet ({walletStatus.address?.slice(0, 6)}...
                        {walletStatus.address?.slice(-4)})
                    </Button> */}
                </>
            ) : (
                <>
                    <Button
                        onClick={connectWallet}
                        disabled={isLoading}
                        variant={'ghost'}
                        className='cursor-pointer'>
                        <IoIosWallet /> Connect Wallet
                    </Button>
                </>
            )}
        </div>
    );
};
