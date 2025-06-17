'use client';

import { ReactNode, useState } from 'react';
import { WagmiProvider, State } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from '@/lib/config';

export function CustomWagmiProvider(props: { children: ReactNode; initialState?: State }) {
    const [config] = useState(() => WagmiConfig());
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider
            config={config}
            initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
        </WagmiProvider>
    );
}
