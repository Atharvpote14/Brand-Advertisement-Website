'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import BottleScrollSection from '@/components/BottleScrollSection'
import FeaturesSection from '@/components/FeaturesSection'
import BuySection from '@/components/BuySection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    useEffect(() => {
        // Simplified loading - just show loading screen briefly
        const timer = setTimeout(() => {
            setLoadingProgress(100)
            setTimeout(() => setIsLoaded(true), 300)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {/* Restore custom cursor - it was specially designed for this website */}
            <CustomCursor />
            
            <AnimatePresence mode="wait">
                {!isLoaded && (
                    <LoadingScreen key="loading" progress={loadingProgress} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLoaded && (
                    <motion.main
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative min-h-screen bg-[#0A0A0A]"
                    >
                        <Navbar />
                        <HeroSection />
                        <BottleScrollSection />
                        <FeaturesSection />
                        <BuySection />
                        <Footer />
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    )
}
