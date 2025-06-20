'use client';

import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { WalletConnection } from '../custom/wallet-connection';
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletStore } from '@/stores/wallet.store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full px-2 md:px-5 flex flex-row items-center justify-between transition-all duration-500',

                isScrolled ? 'h-16 bg-black/30 border-b' : 'h-15 md:h-28',
            )}>
            <div className='flex items-center justify-between max-w-7xl w-full mx-auto'>
                <Logo />

                <WalletButton />
            </div>
        </nav>
    );
}

function WalletButton() {
    const { isConnected, address } = useAccount();
    const { connect, connectAsync } = useConnect();
    const { disconnect } = useDisconnect();
    const { walletStatus, setWalletStatus, resetWalletStatus } = useWalletStore();

    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = () => {
        setIsConnecting(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isWalletInstalled = typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';

        if (!isWalletInstalled) {
            toast.error('No wallet detected.', {
                description: `Please install MetaMask or another web3 wallet to continue.`,
                action: {
                    label: 'Install Wallet',
                    onClick: () => {
                        window.open('https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US', '_blank');
                    },
                },
            });

            setIsConnecting(false);

            return;
        }

        try {
            toast.promise(connectAsync({ connector: injected() }), {
                loading: 'Connecting to wallet...',
                success: 'Wallet connected successfully!',
                error: 'Failed to connect wallet.',
            });
            // connect({ connector: injected() });
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
