'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
    {
        icon: '🥭',
        title: '100% Real Mango',
        desc: 'Sourced from the finest Alphonso mango orchards across Maharashtra and Gujarat.',
        stat: '100%',
        statLabel: 'Real Fruit',
    },
    {
        icon: '🚫',
        title: 'No Artificial Flavors',
        desc: 'Zero preservatives, zero artificial colors. Just pure, honest mango goodness in every bottle.',
        stat: '0%',
        statLabel: 'Artificial',
    },
    {
        icon: '⚡',
        title: 'Packed with Vitamins',
        desc: 'Rich in Vitamin C, A and natural antioxidants. Nature\'s own energy drink.',
        stat: '3x',
        statLabel: 'Vitamins',
    },
    {
        icon: '🌿',
        title: 'Sustainably Sourced',
        desc: 'Partnering with local farmers, supporting sustainable agriculture across India.',
        stat: '500+',
        statLabel: 'Farmers',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export default function FeaturesSection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section
            ref={ref}
            id="flavours"
            className="relative py-32 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0500 50%, #0A0A0A 100%)',
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#FF6B1A]/5"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#FFB800]/5"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FF6B1A] opacity-[0.04] blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <p className="text-[#FF6B1A] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
                        Why Smoodh?
                    </p>
                    <h2 className="text-5xl sm:text-7xl font-black leading-[1] tracking-[-0.03em] text-white mb-6">
                        Pure in every{' '}
                        <span className="gradient-text-mango">dimension</span>
                    </h2>
                    <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
                        From the orchard to your hands — every step guided by uncompromising quality.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'show' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3, ease: 'easeOut' },
                            }}
                            className="group relative glass rounded-2xl p-8 border border-white/[0.06] hover:border-[#FF6B1A]/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Card glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,26,0.08) 0%, transparent 70%)',
                                }}
                            />

                            <div className="relative z-10">
                                <div className="text-4xl mb-5">{f.icon}</div>
                                <div className="mb-4">
                                    <span className="text-4xl font-black gradient-text-mango leading-none">
                                        {f.stat}
                                    </span>
                                    <p className="text-white/30 text-xs tracking-widest uppercase mt-1">
                                        {f.statLabel}
                                    </p>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3 leading-tight">
                                    {f.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed font-light">
                                    {f.desc}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial / Brand Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 text-center"
                >
                    <blockquote className="text-3xl sm:text-5xl font-black leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto">
                        <span className="text-white/20">"</span>
                        <span className="gradient-text-cool">
                            The taste of real mangoes, captured in every golden drop.
                        </span>
                        <span className="text-white/20">"</span>
                    </blockquote>
                    <span className="block text-white/40 text-sm sm:text-base font-medium tracking-[0.2em] uppercase mt-6">
                        — Atharv Agro, Est. 1959
                    </span>
                </motion.div>
            </div>
        </section>
    )
}
