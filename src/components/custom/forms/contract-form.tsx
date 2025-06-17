import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWalletStore } from '@/stores/wallet.store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const contractFormSchema = z.object({
    realId: z.string().min(1, 'Real ID is required'),
    to: z.string().min(1, 'Recipient wallet address is required'),
    itemName: z.string().min(1, 'Item name is required'),
    origin: z.string().min(1, 'Owner address is required'),
    finalRecipient: z.string().min(1, `Receiver's wallet address is required`),
});

type ContractFormInputs = z.infer<typeof contractFormSchema>;

export const ContractForm = () => {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ContractFormInputs>({
        resolver: zodResolver(contractFormSchema),
        defaultValues: {
            realId: '', // Unique identifier for the item
            to: walletAddress || '', // Wallet address of sender
            itemName: '', // Name of the item
            origin: '', // Sender's address or item origin
            finalRecipient: '', // Receiver's wallet address
        },
    });

    useEffect(() => {
        const id = crypto.randomUUID();
        setValue('realId', id);
    }, [setValue, walletAddress]);

    const handleCreate = (data: ContractFormInputs) => {
        console.log('Form submitted with data:', data);
    };

    return (
        <div className='w-full text-white flex flex-col gap-4'>
            <div>Item ID:</div>

            <form onSubmit={handleSubmit(handleCreate)}>
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

                <Button
                    type='submit'
                    className='cursor-pointer'>
                    Create Item
                </Button>
            </form>
        </div>
    );
};
