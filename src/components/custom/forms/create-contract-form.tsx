'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWalletStore } from '@/stores/wallet.store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from '@/utils/abi';
import { QRGenerator } from '../qr-generator';
import Link from 'next/link';

const createContractFormSchema = z.object({
    realId: z.string().min(1, 'Real ID is required'),
    to: z.string().min(1, 'Recipient wallet address is required'),
    itemName: z.string().min(1, 'Item name is required'),
    origin: z.string().min(1, 'Owner address is required'),
    finalRecipient: z.string().min(1, `Receiver's wallet address is required`),
});

export type CreateContractFormInputs = z.infer<typeof createContractFormSchema>;

export const CreateContractForm = () => {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const { writeContractAsync, isPending } = useWriteContract();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<CreateContractFormInputs>({
        resolver: zodResolver(createContractFormSchema),
        defaultValues: {
            realId: '', // Unique identifier for the item
            to: walletAddress || '', // Wallet address of sender
            itemName: '', // Name of the item
            origin: '', // Sender's address or item origin
            finalRecipient: '', // Receiver's wallet address
        },
    });

    const [transactionDone, setTransactionDone] = useState(false);

    useEffect(() => {
        const id = crypto.randomUUID();
        setValue('realId', id);
    }, [setValue, walletAddress]);

    const handleMint = async (data: CreateContractFormInputs) => {
        console.log('Form submitted with data:', data);

        try {
            const tx = await writeContractAsync({
                abi: abi,
                address: '0xd74B3e7AD1d375cD2bd419148C03C65E8985e4c1',
                functionName: 'mint',
                args: [data],
            });

            if (tx) {
                console.log('Transaction sent:', tx);
                setTransactionDone(true);
                setValue('realId', data.realId);
            }
        } catch (error) {
            console.log('Error during minting process:', error);
        } finally {
            console.log('Minting process completed');
        }
    };

    return (
        <div className='w-full text-white flex flex-col gap-4'>
            {transactionDone && (
                <div>
                    <QRGenerator value={`http://localhost:3000/contract/transfer?id=${watch('realId')}`} />
                </div>
            )}

            <form onSubmit={handleSubmit(handleMint)}>
                <div>
                    <Label className=''>My wallet address:</Label>
                    <Input
                        readOnly
                        id='to'
                        type='text'
                        className='text-white mt-2'
                        {...register('to')}
                        value={walletAddress}
                    />
                </div>

                <div>
                    <Label className=''>Item name:</Label>
                    <Input
                        id='itemName'
                        type='text'
                        className='text-white mt-2'
                        {...register('itemName')}
                    />
                    {errors.itemName && <p className='text-red-500 text-sm mt-1'>{errors.itemName.message}</p>}
                </div>

                <div>
                    <Label className=''>Sender&apos;s address:</Label>
                    <Input
                        id='origin'
                        type='text'
                        className='text-white mt-2'
                        {...register('origin')}
                    />
                    {errors.origin && <p className='text-red-500 text-sm mt-1'>{errors.origin.message}</p>}
                </div>

                <div>
                    <Label className=''>Receiver&apos;s wallet address:</Label>
                    <Input
                        id='finalRecipient'
                        type='text'
                        className='text-white mt-2'
                        {...register('finalRecipient')}
                    />
                    {errors.finalRecipient && <p className='text-red-500 text-sm mt-1'>{errors.finalRecipient.message}</p>}
                </div>

                {!transactionDone && (
                    <Button
                        type='submit'
                        className='cursor-pointer bg-blue-400 hover:bg-blue-500 w-full mt-3'
                        disabled={isPending}>
                        Create Item
                    </Button>
                )}
            </form>

            {transactionDone && (
                <div className='mt-4'>
                    <p className='text-green-500'>Transaction successful! Your item has been created.</p>
                    <Button
                        className='w-full hover:bg-blue-500 bg-blue-400 mt-3'
                        asChild>
                        <Link href={'/contract'}>Go back</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};
