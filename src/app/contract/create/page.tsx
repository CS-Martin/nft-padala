import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import { CreateContractForm } from '@/components/custom/forms/create-contract-form';

export default function ContractPage() {
    return (
        <main className='h-dvh w-full max-w-4xl px-2 mt-10 md:px-5 mx-auto'>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Contract', href: '#' },
                    { label: 'Create', href: '/contract/create' },
                ]}
            />
            <CreateContractForm />
        </main>
    );
}
