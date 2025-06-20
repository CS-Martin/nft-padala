'use client';

import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import TransactionDataTable from './_components/recent-transactions/transaction-data-table';
import { Footer } from '@/components/block/footer';
import { Input } from '@/components/ui/input';
import NeumorphButton from '@/components/ui/neumorph-button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateContractForm } from '@/components/custom/forms/create-contract-form';
import { DiamondPlus } from 'lucide-react';
import { useWalletStore } from '@/stores/wallet.store';

export default function DashboardPage() {
    return (
        <>
            <main className='max-w-[90rem] px-3 md:px-0 mx-auto mt-30'>
                <div className='mt-8'>
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Dashboard', href: '/dashboard' },
                        ]}
                    />
                </div>

                <div className='mt-8 flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between'>
                    <Input
                        placeholder='Search by item or trait'
                        className='w-[350px]'
                    />

                    <CreatePadalaModal />
                </div>
                <div className='mt-8'>
                    <TransactionDataTable />
                </div>
            </main>

            <Footer />
        </>
    );
}

function CreatePadalaModal() {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <NeumorphButton
                    className='cursor-pointer w-full md:w-[15rem]'
                    intent='primary'
                    disabled={!walletAddress}
                    size={'small'}>
                    <span className='flex items-center gap-1'>
                        <DiamondPlus size={18} />
                        CREATE PADALA
                    </span>
                </NeumorphButton>
            </DialogTrigger>
            <DialogContent className='p-10'>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className='overflow-y-auto max-h-[80vh]'>
                    <CreateContractForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
