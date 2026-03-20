'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

    return (
        <section
            ref={ref}
            id="experience"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 100%, #1a0800 0%, #0A0A0A 60%)',
            }}
        >
            {/* Ambient Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B1A] blur-[160px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#FFB800] blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.06, 0.12, 0.06],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FF4500] blur-[100px]"
                />
            </div>

            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,107,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.5) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Hero Content */}
            <motion.div
                style={{ opacity, y, scale }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    className="overflow-hidden mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full glass border border-[#FF6B1A]/20">
                        <span className="w-2 h-2 rounded-full bg-[#FFB800] glow-gold animate-pulse" />
                        <span className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
                            Atharv Agro Premium Collection
                        </span>
                    </div>
                </motion.div>
                {/* Main Headline */}
                <div className="overflow-hidden mb-4">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.04em] gradient-text-mango"
                    >
                        Smoodh
                    </motion.h1>
                </div>

                <div className="overflow-hidden mb-6">
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(1.5rem,4vw,3.5rem)] font-light text-white/80 tracking-tight"
                    >
                        Real Fruit.{' '}
                        <span className="font-semibold gradient-text-cool">Real Juice.</span>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-white/40 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
                >
                    A cinematic journey through the richest mango groves.
                    Pure. Refreshing. Unforgettable.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.a
                        href="#story"
                        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255,107,26,0.5)' }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B1A] to-[#FF8C00] text-white font-semibold text-sm tracking-wide shadow-lg shadow-orange-900/30 transition-all duration-300"
                    >
                        Discover the Experience
                    </motion.a>
                    <motion.a
                        href="#buy-now"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-full glass border border-white/20 text-white/80 font-medium text-sm tracking-wide hover:text-white hover:border-[#FF6B1A]/40 transition-all duration-300"
                    >
                        Buy Now ↗
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-light">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-px h-12 bg-gradient-to-b from-[#FF6B1A] to-transparent"
                    />
                </motion.div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
        </section>
    )
}
