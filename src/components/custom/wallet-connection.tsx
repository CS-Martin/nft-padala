'use client';

import { WalletStatus } from '@/types/wallet-status.type';
import { Button } from '../ui/button';

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
                <Button
                    onClick={disconnectWallet}
                    disabled={isLoading}
                    className='bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Disconnect Wallet ({walletStatus.address?.slice(0, 6)}...
                    {walletStatus.address?.slice(-4)})
                </Button>
            ) : (
                <Button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className='cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Connect Wallet
                </Button>
            )}
        </div>
    );
};
