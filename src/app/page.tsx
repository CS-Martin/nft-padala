import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <main className=''>
            <Button
                variant={'default'}
                asChild>
                <Link href={'/contract/create'}>Get Started!</Link>
            </Button>
        </main>
    );
}
