'use client';

import Link from 'next/link';
import NeumorphButton from '../ui/neumorph-button';
import { Package } from 'lucide-react';

export function Footer() {
    return (
        <>
            {/* CTA */}
            <div className='mt-50 flex flex-col items-center gap-8'>
                <small className='border-b-2 border-blue-400 pb-1 uppercase'>NFT PADALA</small>
                <h3>Ready to Send Your First NFT Padala?</h3>
                <p className='text-zinc-300'>Don’t just own — deliver. Experience digital delivery reimagined.</p>
                <Link href='/contract/create'>
                    <NeumorphButton intent='primary'>
                        <div className='flex items-center gap-2'>
                            <Package size={18} />
                            Send your first padala
                        </div>
                    </NeumorphButton>
                </Link>
            </div>
            <footer className='p-4 mt-50 mb-5 bg-zinc-800 flex flex-col gap-8 mx-[20px] lg:mx-[100px] 2xl:mx-[200px] rounded-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <small className='text-zinc-300'>© 2025 NFT Padala. All rights reserved.</small>
                    </div>

                    {/*  */}
                    <div>
                        <ul className='text-zinc-300 flex gap-5'>
                            <small>Home</small>
                            <small>Sitemap</small>
                            <small>Developers</small>
                            <small>Terms</small>
                            <small>Privacy</small>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}
