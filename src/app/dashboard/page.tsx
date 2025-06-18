import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import TransactionDataTable from './_components/recent-transactions/transaction-data-table';

export default function DashboardPage() {
    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Dashboard', href: '/dashboard' },
                ]}
            />
            <h1>Dashboard</h1>
            <TransactionDataTable />
        </div>
    );
}
