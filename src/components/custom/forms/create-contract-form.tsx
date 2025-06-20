'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWalletStore } from '@/stores/wallet.store';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from '@/utils/abi';
import { QRGenerator } from '../qr-generator';
import { generateUID } from '@/lib/utils';
import { Check, Copy, DiamondPlus, Info } from 'lucide-react';
import { toast } from 'sonner';
import { parseGwei } from 'viem';
import NeumorphButton from '@/components/ui/neumorph-button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePublicClient } from 'wagmi';
import { DialogClose } from '@radix-ui/react-dialog';

const createContractFormSchema = z.object({
    realId: z.string().min(1, 'Real ID is required'),
    to: z.string().min(1, 'Recipient wallet address is required'),
    itemName: z.string().min(1, 'Item name is required'),
    locationOrigin: z.string().min(1, 'Owner address is required'),
    finalRecipient: z.string().min(1, `Receiver's wallet address is required`),
});

export type CreateContractFormInputs = z.infer<typeof createContractFormSchema>;

export const CreateContractForm = () => {
    const publicClient = usePublicClient();

    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const { writeContractAsync } = useWriteContract();

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
            locationOrigin: '', // Sender's address or item origin
            finalRecipient: '', // Receiver's wallet address
        },
    });

    const [showAlert, setShowAlert] = useState(true);
    const [transactionDone, setTransactionDone] = useState(false);
    const [isTransactionLoading, setIsTransactionLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!walletAddress) return;

        const uid = generateUID();

        setValue('realId', uid);
    }, [setValue, walletAddress]);

    const handleCopy = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleMint = async (data: CreateContractFormInputs) => {
        setIsTransactionLoading(true);

        try {
            const tx = await writeContractAsync({
                abi: abi,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                functionName: 'mint',
                args: [data],
                gas: 3000000n,
                maxFeePerGas: parseGwei('2'),
                maxPriorityFeePerGas: parseGwei('1'),
            });

            if (tx) {
                const loadingToastId = toast.loading('Your transaction is being processed...');

                const receipt = await publicClient.waitForTransactionReceipt({
                    hash: tx,
                    confirmations: 1,
                });

                if (receipt.status === 'success') {
                    toast.dismiss(loadingToastId);
                    setTransactionDone(true);
                    setValue('realId', data.realId);

                    toast.success('✅ Transaction confirmed!', {
                        description: `Your item has been successfully minted.`,
                    });

                    setIsTransactionLoading(false);
                } else {
                    console.error('Transaction failed:', receipt);
                    toast.error('⚠️ Transaction failed.');

                    setIsTransactionLoading(false);
                    setTransactionDone(false);

                    throw new Error('Transaction failed', { cause: receipt });
                }
            }
        } catch (error) {
            setIsTransactionLoading(false);
            setTransactionDone(false);

            console.error('Error during minting process:', error);
            toast.error('❌ Minting failed. Please check your wallet and network.');
        } finally {
            console.log('Minting process completed');
        }
    };

    return (
        <div>
            {showAlert && (
                <Alert
                    variant='informative'
                    closable
                    onClose={() => setShowAlert(false)}>
                    <Info className='w-4 h-4 stroke-blue-500' />
                    <AlertDescription className='text-blue-500'>
                        You&apos;re about to mint a new item tied to your wallet. Once minted, this item becomes unique and immutable on the blockchain. Please ensure all details
                        are accurate—especially the recipient&apos;s wallet address—as this action cannot be undone.
                    </AlertDescription>
                </Alert>
            )}
            <div className='w-full mt-5 flex flex-col md:flex-row gap-5 md:gap-10'>
                {transactionDone && (
                    <div className='md:hidden block'>
                        <QRGenerator value={`${watch('realId')}`} />
                    </div>
                )}

                <div className='md:w-1/2'>
                    <h4>Transaction Details</h4>
                    <form
                        onSubmit={handleSubmit(handleMint)}
                        className='flex flex-col gap-5 mt-5'>
                        <div>
                            <Label htmlFor='to'>My wallet address</Label>
                            <div className='relative'>
                                <Input
                                    readOnly
                                    id='to'
                                    type='text'
                                    className='mt-2 pr-8'
                                    {...register('to')}
                                    value={walletAddress}
                                />
                                <button
                                    type='button'
                                    onClick={handleCopy}
                                    aria-label='Copy wallet address'
                                    className='absolute right-3.5 top-1/2 transition-all duration-300 cursor-pointer -translate-y-1/2 text-neutral-400 hover:text-white'>
                                    {copied ? <Check className='w-4 h-4 text-green-400' /> : <Copy className='w-4 h-4' />}
                                </button>
                            </div>
                            {errors.to && <small className='text-red-500 mt-1'>{errors.to.message}</small>}
                        </div>

                        <div>
                            <Label className=''>Item name</Label>
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
                            <Label className=''>Sender&apos;s address</Label>
                            <Input
                                id='origin'
                                type='text'
                                className='mt-2'
                                placeholder='Naga City, Philippines'
                                {...register('locationOrigin')}
                            />
                            {errors.locationOrigin && <small className='text-red-500 mt-1'>{errors.locationOrigin.message}</small>}
                        </div>

                        <div>
                            <Label className=''>Receiver&apos;s wallet address</Label>
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
                                loading={isTransactionLoading}
                                disabled={isTransactionLoading}
                                className='cursor-pointer w-full'
                                intent='primary'
                                size={'small'}>
                                <span className='flex items-center gap-1'>
                                    <DiamondPlus size={18} />
                                    CREATE PADALA
                                </span>
                            </NeumorphButton>
                        )}
                    </form>

                    {transactionDone && (
                        <div className='mt-4'>
                            <DialogClose asChild>
                                <NeumorphButton
                                    className='cursor-pointer w-full'
                                    intent='primary'
                                    size={'small'}>
                                    <span className='flex items-center gap-1'>Go back</span>
                                </NeumorphButton>
                            </DialogClose>
                        </div>
                    )}
                </div>

                {transactionDone ? (
                    <div className='w-1/2 hidden md:block'>
                        <QRGenerator value={`${watch('realId')}`} />
                    </div>
                ) : (
                    <div className='hidden md:block w-1/2 h-auto rounded-lg border-2 border-dashed'>
                        <div className='flex items-center justify-center h-full w-full p-6'>
                            <div className='text-center px-3 bg-neutral-200 h-full w-full flex items-center justify-center rounded-lg'>
                                <p className='text-gray-500'>Create padala to generate QR code.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
