import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWalletStore } from '@/stores/wallet.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useWriteContract } from 'wagmi';
import { abi } from '@/utils/abi';
import { useState } from 'react';
import Link from 'next/link';
import { parseGwei } from 'viem';

const transferContractFormSchema = z.object({
    realId: z.string().min(1, 'Item ID is required'),
    to: z.string().min(1, 'Recipient wallet address is required'),
});

type TransferContractFormInputs = z.infer<typeof transferContractFormSchema>;

export default function TransferContractForm({ realId }: { realId: string | null }) {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const { writeContractAsync } = useWriteContract();

    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
        // setValue,
    } = useForm<TransferContractFormInputs>({
        resolver: zodResolver(transferContractFormSchema),
        defaultValues: {
            realId: realId || '', // Unique identifier for the item
            to: walletAddress || '', // Wallet address of sender
        },
    });

    const [transferContractDone, setTransferContractDone] = useState(false);

    const handleTransfer = async (data: TransferContractFormInputs) => {
        console.log('Transfer form submitted with data:', data);

        try {
            const result = await writeContractAsync({
                abi: abi,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                functionName: 'transferItem',
                args: [data.realId, data.to],
                gas: 3000000n,
                maxFeePerGas: parseGwei('2'),
                maxPriorityFeePerGas: parseGwei('1'),
            });

            if (result) {
                console.log('Transfer contract created successfully:', result);
                setTransferContractDone(true);
            }
        } catch (error) {
            console.error('Error creating transfer contract:', error);
        } finally {
            console.log('Transfer contract creation process completed.');
        }
    };

    return (
        <>
            {realId ? (
                <div className='w-full flex flex-col gap-4'>
                    <form onSubmit={handleSubmit(handleTransfer)}>
                        <div>
                            <Label>Item ID:</Label>
                            <Input
                                id='realId'
                                value={realId}
                                readOnly
                            />
                        </div>

                        <div>
                            <Label>Your Wallet Address:</Label>
                            <Input
                                id='to'
                                {...register('to')}
                            />
                        </div>

                        {!transferContractDone && (
                            <Button
                                type='submit'
                                className='cursor-pointer bg-blue-400 hover:bg-blue-500 w-full mt-3'>
                                Create Transfer Contract
                            </Button>
                        )}
                    </form>
                    {transferContractDone && (
                        <Button
                            asChild
                            variant={'default'}>
                            <Link href={'/'}>Go back</Link>
                        </Button>
                    )}
                </div>
            ) : (
                <div className='text-red-500'>Real ID is required to create a transfer contract.</div>
            )}
        </>
    );
}
