'use client';

import { cn } from '@/lib/utils';
import { WalletConnection } from './wallet-connection';
import { useWalletStore } from '@/stores/wallet.store';
import { useEffect, useState } from 'react';
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';

export const CustomNav = () => {
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { walletStatus, setWalletStatus, resetWalletStatus } = useWalletStore();

    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = () => {
        setIsConnecting(true);

        try {
            connect({ connector: injected() });
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setIsConnecting(true);
        console.log('Disconnecting wallet...');
        try {
            disconnect();
            resetWalletStatus();
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            setWalletStatus({ isConnected: true, address });
        } else {
            resetWalletStatus();
        }
    }, [isConnected, address, setWalletStatus, resetWalletStatus]);

    return (
        <nav className={cn('fixed top-0 z-50 sm:w-[500px] px-2 md:px-5 flex flex-row items-center justify-between transition-all duration-200 h-20')}>
            <div>
                <h1 className=' font-bold text-white'>NFT Padala</h1>
            </div>
            <WalletConnection
                walletStatus={walletStatus}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
                isLoading={isConnecting}
            />
        </nav>
    );
};
