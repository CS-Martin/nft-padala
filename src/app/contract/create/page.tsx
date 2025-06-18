import { CreateContractForm } from '@/components/custom/forms/create-contract-form';

export default function ContractPage() {
    return (
        <>
            <main className='h-dvh flex items-center justify-center'>
                <div className='border p-10 rounded-xl w-[350px]'>
                    <CreateContractForm />
                </div>
            </main>
        </>
    );
}
