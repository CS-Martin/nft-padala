'use client';

import { motion } from 'framer-motion';
import { Shield, Activity, Globe, FileCheck, Send, Zap, Lock, Users, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const BentoGrid = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const features = [
        {
            id: 1,
            title: 'Zero Trust Policy',
            description: 'No assumptions, no intermediaries—every action is verified on-chain.',
            icon: Shield,
            gradient: 'from-blue-500/20 to-cyan-500/20',
            size: 'large',
            delay: 0,
        },

        {
            id: 2,
            title: 'Real-Time Tracking',
            description: "Know when it's sent, received, and claimed — in one dashboard.",
            icon: Activity,
            gradient: 'from-purple-500/20 to-pink-500/20',
            size: 'medium',
            delay: 0.1,
        },
        {
            id: 3,
            title: 'Multi-Chain Support',
            description: 'Works with Ethereum, Polygon, Solana, and more.',
            icon: Globe,
            gradient: 'from-green-500/20 to-emerald-500/20',
            size: 'medium',
            delay: 0.2,
        },
        {
            id: 4,
            title: 'Immutable by Design',
            description: 'Once recorded, data is permanent—secured by blockchain immutability.',
            icon: Lock,
            gradient: 'from-red-500/20 to-pink-500/20',
            size: 'medium',
            delay: 0.6,
        },

        {
            id: 5,
            title: 'Send Anything',
            description: 'From NFT art, collectibles, access tokens, documents, or encrypted files.',
            icon: Send,
            gradient: 'from-indigo-500/20 to-blue-500/20',
            size: 'medium',
            delay: 0.4,
        },
        {
            id: 6,
            title: 'Proof of Ownership',
            description: 'Every item sent is wrapped in an NFT, ensuring verified transfer.',
            icon: FileCheck,
            gradient: 'from-orange-500/20 to-red-500/20',
            size: 'large',
            delay: 0.3,
        },

        {
            id: 7,
            title: 'Lightning Fast',
            description: 'Optimized for speed with instant confirmations.',
            icon: Zap,
            gradient: 'from-yellow-500/20 to-orange-500/20',
            size: 'large',
            delay: 0.5,
        },

        {
            id: 8,
            title: 'Growing Network',
            description: 'Join thousands of users already using NFTPadala.',
            icon: Users,
            gradient: 'from-teal-500/20 to-cyan-500/20',
            size: 'large',
            delay: 0.7,
        },
    ];

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'large':
                return 'col-span-2 row-span-2';
            case 'medium':
                return 'col-span-1 row-span-2';
            case 'small':
                return 'col-span-1 row-span-1';
            default:
                return 'col-span-1 row-span-1';
        }
    };

    return (
        <section className='flex flex-col justify-center items-center gap-12'>
            <motion.div
                className='flex flex-col items-center gap-8 text-center max-w-3xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <div className='relative'>
                    <small className='border-b-2 border-blue-400 pb-1 tracking-wider uppercase text-blue-400 font-medium'>WHY NFTPADALA</small>
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
                <h3 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>The Smarter Way to Send Items</h3>
                <p className='text-zinc-400 text-lg leading-relaxed'>
                    Think LBC or Shopee, but for NFTs. Secure, traceable, and ownership-verified with cutting-edge blockchain technology.
                </p>
            </motion.div>

            <motion.div
                className='w-full max-w-7xl mx-auto'
                variants={containerVariants}
                initial='hidden'
                animate='visible'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]'>
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                className={`
                  ${getSizeClasses(feature.size)}
                  group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.gradient}
                  border border-zinc-800/50 backdrop-blur-sm
                  hover:border-zinc-700/50 transition-all duration-500
                  cursor-pointer
                `}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}>
                                {/* Background Pattern */}
                                <div className='absolute inset-0 bg-zinc-900/80 backdrop-blur-sm' />
                                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20' />

                                {/* Animated Border */}
                                <motion.div
                                    className='absolute inset-0 rounded-2xl'
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent, ${feature.gradient.includes('blue') ? '#3b82f6' : feature.gradient.includes('purple') ? '#8b5cf6' : feature.gradient.includes('green') ? '#10b981' : feature.gradient.includes('orange') ? '#f97316' : feature.gradient.includes('yellow') ? '#eab308' : feature.gradient.includes('red') ? '#ef4444' : feature.gradient.includes('teal') ? '#14b8a6' : '#6366f1'}40, transparent)`,
                                        padding: '1px',
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: 'linear',
                                    }}>
                                    <div className='w-full h-full rounded-2xl bg-zinc-900' />
                                </motion.div>

                                {/* Content */}
                                <div className='relative group z-10 p-6 h-full flex flex-col justify-between'>
                                    <div className='flex flex-col justify-end h-full gap-4'>
                                        <motion.div
                                            className='relative w-fit translate-y-12 group-hover:translate-y-0 transition-transform duration-300'
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.2 }}>
                                            <div className='absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-blue-500/30 transition-all duration-300' />
                                            <div className='relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20'>
                                                <IconComponent className='w-6 h-6 text-blue-400' />
                                            </div>
                                        </motion.div>

                                        <div className='space-y-2 translate-y-12 group-hover:translate-0 *:transition-transform duration-300'>
                                            <h5 className='text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300'>{feature.title}</h5>
                                            <p className='text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300'>{feature.description}</p>
                                            <Button
                                                className='bg-transparent mt-3 text-xs px-1.5 cursor-pointer hover:bg-white/5'
                                                variant={'ghost'}
                                                type='button'
                                                size={'sm'}>
                                                Try it now!
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Hover Effect */}
                                    <motion.div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r to-blue-500 from-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
                                </div>

                                {/* Floating Particles */}
                                <motion.div
                                    className='absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full'
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: feature.delay,
                                    }}
                                />
                                <motion.div
                                    className='absolute bottom-6 right-6 w-1 h-1 bg-cyan-400/40 rounded-full'
                                    animate={{
                                        y: [0, -8, 0],
                                        opacity: [0.4, 0.8, 0.4],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: feature.delay + 0.5,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Stats Section */}
            {/* <motion.div
                className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                {[
                    { label: 'NFTs Delivered', value: '10K+', icon: TrendingUp },
                    { label: 'Active Users', value: '2.5K+', icon: Users },
                    { label: 'Success Rate', value: '99.9%', icon: Shield },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        className='text-center p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 border border-zinc-800/50'
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}>
                        <stat.icon className='w-8 h-8 text-blue-400 mx-auto mb-3' />
                        <div className='text-3xl font-bold text-white mb-1'>{stat.value}</div>
                        <div className='text-zinc-400 text-sm'>{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div> */}
        </section>
    );
};

export default BentoGrid;
