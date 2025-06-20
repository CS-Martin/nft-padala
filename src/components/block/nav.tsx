'use client';

import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { WalletConnection } from '../custom/wallet-connection';
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletStore } from '@/stores/wallet.store';

export default function NavBar() {
    return (
        <nav className='h-[60px] w-full border-b flex items-center justify-between px-[20px] lg:px-[100px] 2xl:px-[200px]'>
            <Logo />

            <WalletButton />
        </nav>
    );
}

function WalletButton() {
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { walletStatus, setWalletStatus, resetWalletStatus } = useWalletStore();

    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = () => {
        setIsConnecting(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isWalletInstalled = typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';

        if (!isWalletInstalled) {
            console.warn('No wallet detected. Please install MetaMask or another web3 wallet extension.');
            alert('⚠️ No wallet detected. Please install MetaMask or another web3 wallet extension to continue.');
            setIsConnecting(false);
            return;
        }

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
        <WalletConnection
            walletStatus={walletStatus}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            isLoading={isConnecting}
        />
    );
}
