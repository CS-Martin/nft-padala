'use client';

import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/kibo-ui/announcement';
import NeumorphButton from '@/components/ui/neumorph-button';
import { ArrowUpRightIcon, CircleCheck, Gift, Package, PackageCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <main className='px-[20px] lg:px-[100px] 2xl:px-[200px]'>
                <Hero />

                <section className='border h-[600px]'></section>
            </main>
        </>
    );
}

function Hero() {
    return (
        <section className='h-[600px] flex items-center justify-center'>
            {/* Left */}
            <div className='flex flex-col gap-8 justify-center items-center text-center'>
                <Announcement>
                    <AnnouncementTag>Latest update</AnnouncementTag>
                    <AnnouncementTitle>
                        New feature added
                        <ArrowUpRightIcon
                            size={16}
                            className='shrink-0 text-muted-foreground'
                        />
                    </AnnouncementTitle>
                </Announcement>
                <h1>Send Digital Goods the Smart Way</h1>
                <p className='text-zinc-300'>Blockchain-powered NFT delivery fast, secure, and trackable.</p>
                <div className='flex items-center gap-2'>
                    <Link href='/contract/create'>
                        <NeumorphButton intent='primary'>
                            <div className='flex items-center gap-2'>
                                <Package size={18} />
                                Send your first padala
                            </div>
                        </NeumorphButton>
                    </Link>
                </div>

                <div className='flex flex-row gap-8'>
                    <div className='flex items-center gap-2'>
                        <Gift size={14} />
                        <small className='text-zinc-300'>Gift an NFT artwork</small>
                    </div>
                    <div className='flex items-center gap-2'>
                        <CircleCheck size={14} />
                        <small className='text-zinc-300'>Send token-gated access</small>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PackageCheck size={14} />
                        <small className='text-zinc-300'>Deliver digital contracts securely</small>
                    </div>
                </div>
            </div>
        </section>
    );
}
