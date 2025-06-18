'use client';

import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { WalletConnection } from '../custom/wallet-connection';
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletStore } from '@/stores/wallet.store';
import { Github } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className='h-[60px] w-full border-b flex items-center justify-between px-[20px] lg:px-[100px] 2xl:px-[200px]'>
            <Logo />

            <div className='flex items-center gap-2'>
                <WalletButton />
                <Button
                    size='icon'
                    variant={'outline'}
                    asChild>
                    <Link href=''>
                        <Github />
                    </Link>
                </Button>
            </div>
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
