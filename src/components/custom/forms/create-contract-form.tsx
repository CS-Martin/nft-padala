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
import NeumorphButton from '@/components/ui/neumorph-button';

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
            const result = await writeContractAsync({
                abi: abi,
                address: '0x8ac822062cD4A86b9654a819566fb0C7C50f29BA',
                functionName: 'mint',
                args: [data],
            });

            if (result) {
                console.log('Transaction sent:', result);
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
        <div className='w-full flex flex-col gap-5'>
            {transactionDone && (
                <div>
                    <QRGenerator value={`http://localhost:3000/contract/transfer?id=${watch('realId')}`} />
                </div>
            )}

            <form
                onSubmit={handleSubmit(handleMint)}
                className='flex flex-col gap-5'>
                <div>
                    <Label className=''>My wallet address:</Label>
                    <Input
                        readOnly
                        id='to'
                        type='text'
                        className='mt-2'
                        {...register('to')}
                        value={walletAddress}
                    />
                </div>

                <div>
                    <Label className=''>Item name:</Label>
                    <Input
                        id='itemName'
                        type='text'
                        className='mt-2'
                        placeholder='Gold'
                        {...register('itemName')}
                    />
                    {errors.itemName && <small className='text-red-500 mt-1'>{errors.itemName.message}</small>}
                </div>

                <div>
                    <Label className=''>Sender&apos;s address:</Label>
                    <Input
                        id='origin'
                        type='text'
                        className='mt-2'
                        placeholder='0x...'
                        {...register('origin')}
                    />
                    {errors.origin && <small className='text-red-500 mt-1'>{errors.origin.message}</small>}
                </div>

                <div>
                    <Label className=''>Receiver&apos;s wallet address:</Label>
                    <Input
                        id='finalRecipient'
                        type='text'
                        className='mt-2'
                        placeholder='0x...'
                        {...register('finalRecipient')}
                    />
                    {errors.finalRecipient && <small className='text-red-500 mt-1'>{errors.finalRecipient.message}</small>}
                </div>

                {!transactionDone && (
                    <NeumorphButton
                        type='submit'
                        intent='primary'
                        disabled={isPending}>
                        <div className='flex items-center gap-2'>Create Item</div>
                    </NeumorphButton>
                )}
            </form>

            {transactionDone && (
                <div className='mt-4'>
                    <p className='text-green-500'>Transaction successful! Your item has been created.</p>
                    <Button
                        className='w-full hover:bg-blue-500 bg-blue-400 mt-3'
                        asChild>
                        <Link href={'/'}>Go back</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};
