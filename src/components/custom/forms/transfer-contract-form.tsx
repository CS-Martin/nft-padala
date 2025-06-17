import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWalletStore } from '@/stores/wallet.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const transferContractFormSchema = z.object({
    to: z.string().min(1, 'Recipient wallet address is required'),
});

type TransferContractFormInputs = z.infer<typeof transferContractFormSchema>;

export default function TransferContractForm() {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<TransferContractFormInputs>({
        resolver: zodResolver(transferContractFormSchema),
        defaultValues: {
            to: walletAddress || '', // Wallet address of sender
        },
    });

    return (
        <div className='w-full text-white flex flex-col gap-4'>
            <form onSubmit={}>
                <div>
                    <Input
                        readOnly
                        id='to'
                        className='text-white'
                        value={walletAddress}
                        {...register('to')}
                    />
                </div>
                <Button>Create Transfer Contract</Button>
            </form>
        </div>
    );
}
