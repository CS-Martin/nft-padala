import { http, createConfig, createStorage, injected, cookieStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export function WagmiConfig() {
    return createConfig({
        chains: [mainnet, sepolia],
        transports: {
            [mainnet.id]: http(),
            [sepolia.id]: http(),
        },
        connectors: [injected()],
        storage: createStorage({
            storage: cookieStorage,
        }),
    });
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof WagmiConfig>;
    }
}
