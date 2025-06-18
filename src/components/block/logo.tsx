import Link from 'next/link';
import React from 'react';

export default function Logo() {
    return (
        <Link
            href={'/'}
            className='flex items-center gap-3'>
            <div className='h-[25px] w-[25px] bg-primary rounded'></div>
            <span className='text-sm'>NFTPadala</span>
        </Link>
    );
}
