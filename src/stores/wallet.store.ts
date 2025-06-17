// A global store for managing wallet status

import { WalletStatus } from '@/types/wallet-status.type';
import { create } from 'zustand';

interface WalletStore {
    walletStatus: WalletStatus;
    setWalletStatus: (status: WalletStatus) => void;
    resetWalletStatus: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
    walletStatus: {
        isConnected: false,
        address: '',
    },

    setWalletStatus: (status) => set({ walletStatus: status }),
    resetWalletStatus: () => set({ walletStatus: { isConnected: false, address: '' } }),
}));
