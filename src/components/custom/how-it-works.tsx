'use client';

import { motion } from 'framer-motion';
import { QrCode, Truck, HandHeart, ArrowRight, Sparkles, Package, FileText, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Mint & Generate QR',
            description: 'Create an NFT for your item and generate a unique QR code for secure tracking',
            icon: QrCode,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-500/10 to-cyan-500/10',
            details: ['Upload item details', 'Mint NFT on blockchain', 'Generate unique QR code', 'Secure ownership proof'],
        },
        {
            id: 2,
            title: 'Courier Pickup',
            description: 'Courier scans QR code to create a transfer contract and collect your item',
            icon: Truck,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/10 to-pink-500/10',
            details: ['Courier scans QR code', 'Transfer contract created', 'Item pickup confirmed', 'Blockchain record updated'],
        },
        {
            id: 3,
            title: 'Secure Delivery',
            description: 'Item delivered to recipient through verified transfer contract completion',
            icon: HandHeart,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-500/10 to-emerald-500/10',
            details: ['Recipient verification', 'Contract execution', 'NFT ownership transfer', 'Delivery confirmation'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const arrowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                delay: 0.5,
            },
        },
    };

    return (
        <section className='min-h-screen flex flex-col justify-center items-center gap-16 py-20 '>
            {/* Header */}
            <motion.div
                className='flex flex-col items-center gap-8 text-center max-w-4xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <div className='relative'>
                    <small className='border-b-2 border-blue-400 pb-1 tracking-wider uppercase text-blue-400 font-medium'>How it Works?</small>
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

                <h3 className='text-4xl md:text-6xl font-bold'>
                    <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-6xl md:text-8xl'>3</span>{' '}
                    <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Steps to Send a Padala</span>
                </h3>
                <p className='text-zinc-400 text-lg leading-relaxed'>Your NFT. Your rules. Fully on-chain.</p>
            </motion.div>

            {/* Steps */}
            <motion.div
                className='w-full max-w-7xl mx-auto'
                variants={containerVariants}
                initial='hidden'
                animate='visible'>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4'>
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <div
                                key={step.id}
                                className='flex items-center'>
                                {/* Step Card */}
                                <motion.div
                                    className='group relative'
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}>
                                    {/* Background Glow */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500`}
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: index * 0.5,
                                        }}
                                    />

                                    {/* Main Card */}
                                    <div
                                        className={`relative bg-gradient-to-br ${step.bgColor} backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 w-80 h-96 flex flex-col items-center text-center group-hover:border-zinc-700/50 transition-all duration-500`}>
                                        {/* Step Number */}
                                        <motion.div
                                            className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}>
                                            {step.id}
                                        </motion.div>

                                        {/* Icon */}
                                        <motion.div
                                            className='relative mb-6'
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}>
                                            <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-20 rounded-2xl blur-lg`} />
                                            <div className={`relative bg-gradient-to-br ${step.bgColor} p-4 rounded-2xl border border-zinc-700/30`}>
                                                <IconComponent className='w-12 h-12 text-white' />
                                            </div>
                                        </motion.div>

                                        {/* Content */}
                                        <div className='flex-1 flex flex-col justify-between'>
                                            <div className='space-y-4'>
                                                <h4 className='text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300'>{step.title}</h4>
                                                <p className='text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300'>{step.description}</p>
                                            </div>

                                            {/* Details List */}
                                            <div className='mt-6 space-y-2'>
                                                {step.details.map((detail, detailIndex) => (
                                                    <motion.div
                                                        key={detailIndex}
                                                        className='flex items-center gap-2 text-xs text-zinc-500'
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.3 + detailIndex * 0.1 }}>
                                                        <CheckCircle className='w-3 h-3 text-green-400' />
                                                        <span>{detail}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Animated Border */}
                                        <div className='absolute inset-0 rounded-3xl z-0 overflow-hidden pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500'>
                                            <motion.div
                                                className='absolute -inset-[2px] rounded-[inherit] bg-[conic-gradient(from_0deg,_#ffffff20,_transparent_50%,_#ffffff20)]'
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Arrow */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        variants={arrowVariants}
                                        className='hidden lg:flex items-center mx-8'>
                                        <motion.div
                                            animate={{
                                                x: [0, 10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'easeInOut',
                                            }}>
                                            <ArrowRight className='w-8 h-8 text-zinc-600' />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                className='text-center space-y-6'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}>
                <div className='flex items-center justify-center gap-4 text-zinc-400'>
                    <Package className='w-5 h-5' />
                    <span className='text-sm'>Secure • Traceable • Decentralized</span>
                    <FileText className='w-5 h-5' />
                </div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;
