import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
    return (
        <Link
            href={'/'}
            className='flex items-center gap-3'>
            <Image
                src={'/nftpadala-logo.png'}
                alt='logo'
                height={40}
                width={40}
            />
            <span className='text-sm font-bold'>NFTPadala</span>
        </Link>
    );
}
