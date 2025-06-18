import { Breadcrumbs } from '@/components/custom/breadcrumbs';

export default function DashboardPage() {
    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Dashboard', href: '/dashboard' },
                ]}
            />
        </div>
    );
}
