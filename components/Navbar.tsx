'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'

const navLinks = ['Experience', 'Story', 'Flavours', 'Buy Now']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-200 ${
                scrolled 
                    ? 'bg-black/80 border-b border-white/10' 
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B1A] to-[#FFB800] flex items-center justify-center glow-orange">
                        <span className="text-xs font-black text-white">S</span>
                    </div>
                    <span className="text-xl font-black gradient-text-mango tracking-tight">
                        Smoodh
                    </span>
                    <span className="hidden sm:block text-white/30 text-xs font-light tracking-[0.2em] uppercase ml-1">
                        by Atharv Agro
                    </span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                delay: 0.1 + i * 0.05, 
                                duration: 0.3
                            }}
                            className={`text-sm font-medium tracking-wide relative group ${
                                link === 'Buy Now'
                                    ? 'px-5 py-2 rounded-full bg-black/40 border border-[#FF6B1A]/40 text-[#FFB800] hover:bg-[#FF6B1A]/20'
                                    : 'text-white/70 hover:text-white'
                            }`}
                            whileHover={link !== 'Buy Now' ? { y: -1 } : { scale: 1.05 }}
                        >
                            {link}
                            {link !== 'Buy Now' && (
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#FF6B1A] to-[#FFB800] group-hover:w-full transition-all duration-200" />
                            )}
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                    <motion.span
                        animate={{ opacity: menuOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="block w-6 h-0.5 bg-white"
                    />
                    <motion.span
                        animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{ 
                    height: menuOpen ? 'auto' : 0, 
                    opacity: menuOpen ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl absolute top-full left-0 right-0"
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setMenuOpen(false)}
                            className="text-white/70 hover:text-white font-medium py-2 border-b border-white/5"
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    )
}
