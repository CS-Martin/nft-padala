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

                <section className='h-[750px] flex flex-col justify-center items-center gap-8'>
                    <div className='flex flex-col items-center gap-8'>
                        <small className='border-b-2 border-blue-400 pb-1 '>WHY NFTPADALA</small>
                        <h3>The Smarter Way to Send NFTs</h3>
                        <p className='text-zinc-300'>Think LBC, but for NFTs. Secure, traceable, and ownership-verified.</p>
                    </div>

                    <div className='flex gap-8'>
                        {/* Card */}
                        <div className='h-[600px] w-[450px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-8'>
                            <div className='flex flex-col gap-8'>
                                <Package />
                                <h5>Trustless Delivery</h5>
                                <p>Send without relying on third parties blockchain handles everything.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='w-[450px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8'>
                            <div className='flex flex-col gap-8'>
                                <Package />
                                <h5>Real-Time Tracking</h5>
                                <p>Know when it&apos;s sent, received, and claimed — in one dashboard.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='w-[450px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8'>
                            <div className='flex flex-col gap-8'>
                                <Package />
                                <h5>Multi-Chain Support</h5>
                                <p>Works with Ethereum, Polygon, Solana, and more.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='w-[450px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8'>
                            <div className='flex flex-col gap-8'>
                                <Package />
                                <h5>Built-in Proof of Ownership</h5>
                                <p>Every item sent is wrapped in an NFT, ensuring verified transfer.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='w-[450px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-8'>
                            <div className='flex flex-col gap-8'>
                                <Package />
                                <h5>Send Anything</h5>
                                <p>From NFT art, collectibles, access tokens, documents, or encrypted files.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='h-[750px] flex flex-col justify-center items-center gap-8'>
                    <div className='flex flex-col items-center gap-8'>
                        <small className='border-b-2 border-blue-400 pb-1 uppercase'>How It Works</small>
                        <h3>3 Steps to Send a Padala</h3>
                        <p className='text-zinc-300'>Your NFT. Your rules. Fully on-chain.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function Footer() {
    return (
        <>
            {/* CTA */}
            <div className='flex flex-col items-center gap-8'>
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

function Hero() {
    return (
        <section className='h-[750px] flex items-center justify-center'>
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
