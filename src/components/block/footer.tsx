'use client';

import Link from 'next/link';
import NeumorphButton from '../ui/neumorph-button';
import { Package, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    return (
        <>
            {/* CTA */}
            <div className='mt-50 flex flex-col items-center gap-8'>
                <div className='relative'>
                    <small className='border-b-2 border-blue-400 pb-1 tracking-wider uppercase text-blue-400 font-medium'>NFT Padala</small>
                    <motion.div
                        className='absolute -top-2 -right-2'
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: 'reverse',
                        }}>
                        <Sparkles className='w-4 h-4 text-blue-400' />
                    </motion.div>
                </div>
                <h3>Ready to Send Your First NFT Padala?</h3>
                <p className='text-zinc-300'>Don’t just own — deliver. Experience digital delivery reimagined.</p>
                <Link href='/contract/create'>
                    <NeumorphButton
                        intent='primary'
                        className='cursor-pointer'>
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
