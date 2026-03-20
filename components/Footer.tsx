'use client'

import { motion } from 'framer-motion'

const footerLinks = {
    'Experience': ['The Story', 'Our Mangoes', 'Ingredients', 'Nutrition'],
    'Brand': ['About Atharv (Owner)', 'Sustainability', 'Careers', 'Press'],
    'Connect': ['Instagram', 'YouTube', 'Facebook', 'Twitter/X'],
    'Legal': ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
}

export default function Footer() {
    return (
        <footer
            className="relative pt-24 pb-12 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0A0A0A 0%, #050200 100%)',
            }}
        >
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B1A]/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Main footer content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B1A] to-[#FFB800] flex items-center justify-center shadow-[0_0_30px_rgba(255,107,26,0.5)]">
                                <span className="text-sm font-black text-white">S</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-black gradient-text-mango tracking-tight">Smoodh</span>
                                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light">by Atharv Agro</p>
                            </div>
                        </div>

                        <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-8 font-light">
                            Crafting premium mango juice experiences since 1959.
                            Real fruit. Real flavor. Real Smoodh.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3">
                            {['𝕏', '📸', '▶', '👥'].map((icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-9 h-9 rounded-full glass border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-[#FF6B1A]/30 transition-all duration-300 text-sm"
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-white/70 font-semibold text-xs tracking-[0.25em] uppercase mb-5">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-white/30 text-sm hover:text-white/70 transition-colors duration-200 font-light"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-white/40 text-sm font-light flex items-center gap-2">
                        <span>&copy; {new Date().getFullYear()} Atharv Agro Pvt. Ltd. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/15 text-xs">
                        <span className="w-1 h-1 rounded-full bg-[#FF6B1A]" />
                        <span>Made in India with 🥭</span>
                        <span className="w-1 h-1 rounded-full bg-[#FF6B1A]" />
                    </div>
                    <p className="text-white/15 text-xs font-light">
                        FSSAI License No: 11521999000085
                    </p>
                </div>
            </div>

            {/* Giant ambient brand text */}
            <div
                className="absolute bottom-0 left-0 right-0 text-center overflow-hidden pointer-events-none select-none"
                aria-hidden="true"
            >
                <p
                    className="text-[12vw] font-black tracking-[-0.05em] leading-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,107,26,0.04) 0%, transparent 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Smoodh
                </p>
            </div>
        </footer>
    )
}
