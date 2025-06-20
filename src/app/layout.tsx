import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { cookieToInitialState } from 'wagmi';
import { WagmiConfig } from '@/lib/config';
import { headers } from 'next/headers';
import { CustomWagmiProvider } from '@/providers/wagmi-provider';
import NavBar from '@/components/block/nav';
import { Toaster } from '@/components/ui/sonner';
import { ReactLenis } from 'lenis/react';

const soraFont = Sora({
    variable: '--font-sora',
    subsets: ['latin'],
});

const interFont = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'NFT Padala',
    description: 'Send your items in a smart and secure way.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headerList = await headers();
    const cookieHeader = headerList.get('cookie');
    const initalState = cookieToInitialState(WagmiConfig(), cookieHeader);

    return (
        <html
            lang='en'
            suppressHydrationWarning>
            <ReactLenis root />
            <body className={`${soraFont.variable} ${interFont.className} bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-x-hidden antialiased`}>
                <CustomWagmiProvider initialState={initalState}>
                    <NavBar />
                    {children}
                    <Toaster
                        position='bottom-right'
                        richColors
                    />
                </CustomWagmiProvider>
            </body>
        </html>
    );
}
