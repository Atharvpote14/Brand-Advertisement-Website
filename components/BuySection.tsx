'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const retailers = [
    { name: 'Amazon', icon: '📦', url: '#' },
    { name: 'Flipkart', icon: '🛒', url: '#' },
    { name: 'BigBasket', icon: '🥬', url: '#' },
    { name: 'Swiggy Instamart', icon: '⚡', url: '#' },
    { name: 'Blinkit', icon: '🟡', url: '#' },
    { name: 'JioMart', icon: '🔵', url: '#' },
]

export default function BuySection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            ref={ref}
            id="buy-now"
            className="relative py-32 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0A0A0A 0%, #130800 40%, #1a0900 60%, #0A0A0A 100%)',
            }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.12, 0.22, 0.12],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B1A] blur-[150px]"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Main CTA block */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Pre-label */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A] animate-pulse" />
                        <span className="text-[#FFB800] text-xs font-semibold tracking-[0.25em] uppercase">
                            Available Everywhere
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-6xl sm:text-8xl font-black leading-[0.9] tracking-[-0.04em] text-white mb-6">
                        Get your{' '}
                        <span className="gradient-text-mango">Smoodh</span>{' '}
                        <br />
                        <span className="text-white/60 font-light text-5xl sm:text-6xl">today</span>
                    </h2>

                    <p className="text-white/40 text-lg font-light max-w-lg mx-auto mb-14 leading-relaxed">
                        Order online from your favorite platform or find us at
                        a store near you. The golden goodness of real mango awaits.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <motion.a
                            href="#"
                            whileHover={{
                                scale: 1.04,
                                boxShadow: '0 0 60px rgba(255,107,26,0.6)',
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-white font-bold text-base tracking-wide overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, #FF6B1A 0%, #FF8C00 50%, #FFB800 100%)',
                            }}
                        >
                            <span className="relative z-10">Order Now</span>
                            <motion.span
                                className="relative z-10 text-xl"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                            {/* Shimmer on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </motion.a>

                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full glass border border-white/15 text-white/70 font-medium text-base hover:text-white hover:border-[#FFB800]/30 transition-all duration-300"
                        >
                            Find a Store
                        </motion.a>
                    </div>

                    {/* Retailers grid */}
                    <div>
                        <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6 font-light">
                            Available on
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {retailers.map((r, i) => (
                                <motion.a
                                    key={r.name}
                                    href={r.url}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                                    whileHover={{ scale: 1.06, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/[0.08] hover:border-[#FF6B1A]/30 text-white/50 hover:text-white text-sm font-medium transition-all duration-300"
                                >
                                    <span>{r.icon}</span>
                                    <span>{r.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Bottom stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-24 grid grid-cols-3 gap-8 border-t border-white/[0.06] pt-12"
                >
                    {[
                        { num: '50M+', label: 'Happy Customers' },
                        { num: '65Yr', label: 'Atharv Agro Legacy' },
                        { num: '600+', label: 'Cities Served' },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="text-3xl sm:text-4xl font-black gradient-text-mango leading-none mb-2">
                                {s.num}
                            </div>
                            <div className="text-white/30 text-xs tracking-widest uppercase font-light">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
