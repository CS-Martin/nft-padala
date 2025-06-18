import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import TransactionDataTable from './_components/recent-transactions/transaction-data-table';
import { Footer } from '@/components/block/footer';

export default function DashboardPage() {
    return (
        <>
            <main className='px-[20px] lg:px-[100px] 2xl:px-[200px]'>
                <section>
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Dashboard', href: '/dashboard' },
                        ]}
                    />
                    <TransactionDataTable />
                </section>
            </main>

            <Footer />
        </>
    );
}
