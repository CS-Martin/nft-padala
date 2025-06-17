'use client';

import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/kibo-ui/announcement';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <main className=''>
                <section className='h-[600px] flex items-center justify-center'>
                    <div className='flex flex-col gap-5 justify-center items-center text-center'>
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
                        <h1>Headline</h1>
                        <p>Paragraph</p>

                        <ShimmerButton
                            type='button'
                            className='h-[40px]'
                            onClick={() => console.log('Get Started button clicked')}>
                            <Link href={'/contract/create'}>Get Started</Link>
                        </ShimmerButton>
                    </div>
                </section>
            </main>
        </>
    );
}
