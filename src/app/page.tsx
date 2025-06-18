'use client';

import { Footer } from '@/components/block/footer';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/kibo-ui/announcement';
import NeumorphButton from '@/components/ui/neumorph-button';
import { Spotlight } from '@/components/ui/spotlight-new';
import { ArrowUpRightIcon, CircleCheck, Gift, Package, PackageCheck } from 'lucide-react';

export default function Home() {
    return (
        <>
            <main className='px-[20px] lg:px-[100px] 2xl:px-[200px]'>
                <Hero />

                <section className='flex flex-col justify-center items-center gap-8'>
                    <div className='flex flex-col items-center gap-8'>
                        <small className='border-b-2 border-blue-400 pb-1 '>WHY NFTPADALA</small>
                        <h3>The Smarter Way to Send NFTs</h3>
                        <p className='text-zinc-300'>Think LBC, but for NFTs. Secure, traceable, and ownership-verified.</p>
                    </div>

                    <div className='flex flex-wrap gap-8'>
                        {/* Card */}
                        <div className='flex-grow w-[450px] bg-zinc-800 rounded-xl p-8'>
                            <div className='flex flex-col gap-5'>
                                <div className='mb-14 relative'>
                                    <div className='absolute bg-blue-900 w-[30px] h-[40px] mt-2'></div>
                                    <h3 className='absolute bg-blue-400 w-[30px] h-[40px] flex items-center justify-center ml-2'>1</h3>
                                </div>

                                <h5>Trustless Delivery</h5>
                                <p>Send without relying on third parties blockchain handles everything.</p>
                            </div>
                        </div>

                        {/* Card */}
                        <div className='flex-grow w-[450px] bg-zinc-800 rounded-2xl p-8'>
                            <div className='flex flex-col gap-5'>
                                <div className='mb-14 relative'>
                                    <div className='absolute bg-blue-900 w-[30px] h-[40px] mt-2'></div>
                                    <h3 className='absolute bg-blue-400 w-[30px] h-[40px] flex items-center justify-center ml-2'>2</h3>
                                </div>
                                <h5>Real-Time Tracking</h5>
                                <p>Know when it&apos;s sent, received, and claimed — in one dashboard.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='flex-grow w-[450px] bg-zinc-800 rounded-2xl p-8'>
                            <div className='flex flex-col gap-5'>
                                <div className='mb-14 relative'>
                                    <div className='absolute bg-blue-900 w-[30px] h-[40px] mt-2'></div>
                                    <h3 className='absolute bg-blue-400 w-[30px] h-[40px] flex items-center justify-center ml-2'>3</h3>
                                </div>
                                <h5>Multi-Chain Support</h5>
                                <p>Works with Ethereum, Polygon, Solana, and more.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='flex-grow w-[450px] bg-zinc-800 rounded-2xl p-8'>
                            <div className='flex flex-col gap-5'>
                                <div className='mb-14 relative'>
                                    <div className='absolute bg-blue-900 w-[30px] h-[40px] mt-2'></div>
                                    <h3 className='absolute bg-blue-400 w-[30px] h-[40px] flex items-center justify-center ml-2'>4</h3>
                                </div>
                                <h5>Built-in Proof of Ownership</h5>
                                <p>Every item sent is wrapped in an NFT, ensuring verified transfer.</p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className='flex-grow w-[450px] bg-zinc-800 rounded-xl p-8'>
                            <div className='flex flex-col gap-5'>
                                <div className='mb-14 relative'>
                                    <div className='absolute bg-blue-900 w-[30px] h-[40px] mt-2'></div>
                                    <h3 className='absolute bg-blue-400 w-[30px] h-[40px] flex items-center justify-center ml-2'>5</h3>
                                </div>
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

function Hero() {
    return (
        <section className='h-[750px] flex items-center justify-center'>
            <Spotlight />
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
                <h1>
                    Send your items in a <AuroraText>smart</AuroraText> <br /> and <AuroraText>secured</AuroraText> way
                </h1>
                <p className='text-zinc-300'>Experience fast, secure, and trackable delivery powered by blockchain and NFTs.</p>
                <div className='flex items-center gap-2'>
                    <NeumorphButton
                        href='/dashboard'
                        intent='primary'
                        className='cursor-pointer'>
                        <div className='flex items-center gap-2'>
                            <Package size={18} />
                            Send your first padala
                        </div>
                    </NeumorphButton>
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
