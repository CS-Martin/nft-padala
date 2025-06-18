'use client';

import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import TransactionDataTable from './_components/recent-transactions/transaction-data-table';
import { Footer } from '@/components/block/footer';
import { Input } from '@/components/ui/input';
import NeumorphButton from '@/components/ui/neumorph-button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateContractForm } from '@/components/custom/forms/create-contract-form';
import { DiamondPlus } from 'lucide-react';

export default function DashboardPage() {
    return (
        <>
            <main className='px-[20px] lg:px-[100px] 2xl:px-[200px]'>
                <div className='mt-8'>
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Dashboard', href: '/dashboard' },
                        ]}
                    />
                </div>

                <div className='mt-8 flex items-center justify-between'>
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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <NeumorphButton
                    className='cursor-pointer'
                    intent='primary'
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
                <div>
                    <CreateContractForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
