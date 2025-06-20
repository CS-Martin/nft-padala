import { Footer } from '@/components/block/footer';
import BentoGrid from '@/components/custom/bento-grid';
import HowItWorks from '@/components/custom/how-it-works';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/kibo-ui/announcement';
import NeumorphButton from '@/components/ui/neumorph-button';
import { Spotlight } from '@/components/ui/spotlight-new';
import { ArrowUpRightIcon, CircleCheck, Gift, Package, PackageCheck } from 'lucide-react';

export default function Home() {
    return (
        <>
            <main className='px-5 md:px-0  relative overflow-hidden'>
                <Hero />

                <BentoGrid />

                <HowItWorks />
            </main>

            <Footer />
        </>
    );
}

const Hero = () => {
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

                <div className='flex flex-col items-center md:flex-row gap-3 md:gap-8'>
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
};
