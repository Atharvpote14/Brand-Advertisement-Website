'use client'

import { motion } from 'framer-motion'

interface LoadingScreenProps {
    progress: number
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0A]"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-16 text-center"
            >
                <h1 className="text-7xl font-black tracking-[-0.04em] gradient-text-mango mb-3">
                    Smoodh
                </h1>
                <p className="text-white/40 text-sm font-light tracking-[0.3em] uppercase">
                    By Atharv Agro
                </p>
            </motion.div>

            {/* Progress */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-64 space-y-4"
            >
                <div className="relative h-[1px] bg-white/10 overflow-hidden rounded-full">
                    <motion.div
                        className="absolute inset-y-0 left-0 loading-bar rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-white/30 text-xs font-light tracking-widest uppercase">
                        Loading Experience
                    </span>
                    <span className="text-white/60 text-sm font-medium tabular-nums">
                        {progress}%
                    </span>
                </div>
            </motion.div>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FF6B1A] opacity-5 blur-[120px]" />
            </div>
        </motion.div>
    )
}
