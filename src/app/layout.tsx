import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { cookieToInitialState } from 'wagmi';
import { WagmiConfig } from '@/lib/config';
import { headers } from 'next/headers';
import { CustomWagmiProvider } from '@/providers/wagmi-provider';
import NavBar from '@/components/block/nav';

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
    description: 'Edit here your description',
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
            <body className={`${soraFont.variable} ${interFont.className}`}>
                <CustomWagmiProvider initialState={initalState}>
                    <NavBar />
                    {children}
                </CustomWagmiProvider>
            </body>
        </html>
    );
}
