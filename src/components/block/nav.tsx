'use client';

import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { WalletConnection } from '../custom/wallet-connection';
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletStore } from '@/stores/wallet.store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();
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
                'fixed top-0 z-50 w-full px-2 md:px-0 flex flex-row items-center justify-between transition-all duration-500',
                isScrolled ? 'h-16 !bg-black/50 border-b' : 'h-15 md:h-28',
                pathname === '/' ? '' : '!h-20 border-b',
            )}>
            <div className={cn('flex items-center justify-between transition-all duration-500 w-full mx-auto', pathname === '/' ? 'max-w-7xl' : 'max-w-[90rem]')}>
                <Logo />

                <WalletButton />
            </div>
        </nav>
    );
}

function WalletButton() {
    const router = useRouter();
    const { isConnected, address } = useAccount();
    const { connectAsync } = useConnect();
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
        } catch (error) {
            console.error('Failed to connect wallet:', error);

            toast.error('Failed to connect wallet.', {
                description: error instanceof Error ? error.message : 'An unknown error occurred.',
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setIsConnecting(true);

        try {
            disconnect();
            resetWalletStatus();
            toast.success('Wallet disconnected successfully!');

            router.push('/');
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
            toast.error('Failed to disconnect wallet.', {
                description: error instanceof Error ? error.message : 'An unknown error occurred.',
            });
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
