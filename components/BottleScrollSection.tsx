'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const TOTAL_FRAMES = 118

function cinematicEase(t: number): number {
    if (t < 0.2) return t * t * 2.5
    if (t < 0.8) return 0.1 + ((t - 0.2) / 0.6) * 0.8
    const end = (t - 0.8) / 0.2
    return 0.9 + (1 - (1 - end) * (1 - end)) * 0.1
}

const storyScenes = [
    {
        range: [0, 0.25],
        title: 'Born from Nature',
        subtitle: 'Pure Mango Goodness',
        body: "Crafted from handpicked Alphonso mangoes at peak ripeness, every drop of Smoodh carries the soul of India's finest orchards.",
        align: 'left' as const,
    },
    {
        range: [0.25, 0.5],
        title: 'The Perfect Pour',
        subtitle: '100% Real Fruit',
        body: 'No artificial flavors. No preservatives. Just the honest, golden richness of real mango — bottled at the height of freshness.',
        align: 'right' as const,
    },
    {
        range: [0.5, 0.75],
        title: 'Smoodh Sensation',
        subtitle: 'Taste the Difference',
        body: "The velvety texture. The deep amber hue. The aroma that takes you straight to a sun-drenched mango grove. This is Smoodh.",
        align: 'left' as const,
    },
    {
        range: [0.75, 1.0],
        title: 'Indulge Every Sip',
        subtitle: 'Premium. Always.',
        body: "Smoodh by Atharv Agro — where every bottle is a celebration of nature's most magnificent fruit.",
        align: 'center' as const,
    },
]

export default function BottleScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const frameIndexRef = useRef(0)

    const [scene, setScene] = useState(0)
    const [scenePct, setScenePct] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    })

    const smoothProg = useSpring(scrollYProgress, { stiffness: 25, damping: 25, mass: 1.2, restDelta: 0.0005 })

    // Step 1: Preload images strictly into browser memory for the canvas
    useEffect(() => {
        let loadedCount = 0
        const imgs: HTMLImageElement[] = []
        
        console.log('Starting to load frames...')
        
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image()
            const frameNum = String(i).padStart(3, '0')
            img.src = `/frames/ezgif-frame-${frameNum}.jpg`
            // Removed crossOrigin attribute to prevent CORS issues on same-origin Netlify hosting
            
            img.onload = () => {
                loadedCount++
                console.log(`Loaded frame ${i}/${TOTAL_FRAMES}`)
                if (loadedCount === TOTAL_FRAMES) {
                    console.log('All frames loaded!')
                    setImagesLoaded(true)
                }
            }
            
            img.onerror = (error) => {
                console.error(`Failed to load frame ${i}:`, error)
                // Try alternative path
                img.src = `/frames/ezgif-frame-${frameNum}.jpg?v=1` // Add cache busting
                img.onload = () => {
                    loadedCount++
                    console.log(`Loaded frame ${i}/${TOTAL_FRAMES} (retry)`)
                    if (loadedCount === TOTAL_FRAMES) {
                        console.log('All frames loaded!')
                        setImagesLoaded(true)
                    }
                }
                img.onerror = () => {
                    loadedCount++
                    if (loadedCount === TOTAL_FRAMES) setImagesLoaded(true)
                }
            }
            
            imgs.push(img)
        }
        imagesRef.current = imgs
    }, [])

    // Step 2: Scroll subscription
    useEffect(() => {
        return smoothProg.on('change', (v) => {
            const c = Math.max(0, Math.min(1, v))
            const eased = cinematicEase(c)

            // Set precise frame index
            const fi = Math.min(Math.max(Math.round(eased * (TOTAL_FRAMES - 1)), 0), TOTAL_FRAMES - 1)
            frameIndexRef.current = fi

            // Set scene texts
            let si = storyScenes.findIndex(s => c >= s.range[0] && c < s.range[1])
            if (si === -1) si = c >= 0.75 ? 3 : 0
            setScene(si)
            const { range } = storyScenes[si]
            const pct = Math.max(0, Math.min(1, (c - range[0]) / (range[1] - range[0])))
            setScenePct(pct)
        })
    }, [smoothProg])

    // Step 3: Fast, bulletproof Canvas Rendering Loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: false }) // Optimize for opaque images
        if (!ctx) return

        let animationFrameId: number
        let lastDrawnFrame = -1

        const render = () => {
            animationFrameId = requestAnimationFrame(render)

            const currentFrame = Math.round(frameIndexRef.current) || 0

            // Force redraw on resize via window size check
            const w = canvas.parentElement?.clientWidth || window.innerWidth
            const h = canvas.parentElement?.clientHeight || window.innerHeight

            const sizeChanged = canvas.width !== w || canvas.height !== h

            // Only draw if frame changed or canvas resized
            if (currentFrame !== lastDrawnFrame || sizeChanged) {
                if (sizeChanged) {
                    canvas.width = w
                    canvas.height = h
                }

                const img = imagesRef.current[currentFrame]
                if (img && img.complete && img.naturalWidth > 0) {

                    // Object-fit: cover logic for Canvas
                    const imgRatio = img.naturalWidth / img.naturalHeight
                    const canvasRatio = w / h

                    let drawW = w
                    let drawH = h
                    let offsetX = 0
                    let offsetY = 0

                    if (imgRatio > canvasRatio) {
                        drawW = h * imgRatio
                        offsetX = (w - drawW) / 2
                    } else {
                        drawH = w / imgRatio
                        offsetY = (h - drawH) / 2
                    }

                    // Draw Frame
                    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)

                    // Draw Vignette directly onto Canvas (Huge performance boost over CSS overlays)
                    const gradient = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.8)
                    gradient.addColorStop(0, 'rgba(0,0,0,0)')
                    gradient.addColorStop(0.7, 'rgba(0,0,0,0.15)')
                    gradient.addColorStop(1, 'rgba(0,0,0,0.7)')
                    ctx.fillStyle = gradient
                    ctx.fillRect(0, 0, w, h)

                    lastDrawnFrame = currentFrame
                } else if (!imagesLoaded) {
                    // Fill black safely while loading
                    ctx.fillStyle = '#0A0A0A'
                    ctx.fillRect(0, 0, w, h)
                }
            }
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [imagesLoaded])

    const s = storyScenes[scene]

    return (
        <section
            ref={sectionRef}
            id="story"
            style={{ height: '600vh', position: 'relative' }}
        >
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    background: imagesLoaded ? '#0A0A0A' : 'linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 100%)',
                }}
            >
                {!imagesLoaded && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#FFB800',
                        fontSize: '18px',
                        fontWeight: '600',
                        textAlign: 'center',
                        zIndex: 20
                    }}>
                        Loading Animation...
                    </div>
                )}
                {/* Canvas Render Layer */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block'
                    }}
                />
                
                {/* Fallback image for static export */}
                {!imagesLoaded && (
                    <img
                        src="/frames/ezgif-frame-001.jpg"
                        alt="Smoodh Bottle"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '80%',
                            maxHeight: '80%',
                            objectFit: 'contain',
                            zIndex: 5
                        }}
                    />
                )}

                {/* Text overlays */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 4rem' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`txt-${scene}`}
                                initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -25, filter: 'blur(20px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    maxWidth: 400,
                                    marginLeft: s.align === 'right' ? 'auto' : s.align === 'center' ? 'auto' : 0,
                                    marginRight: s.align === 'left' ? 'auto' : s.align === 'center' ? 'auto' : 0,
                                    textAlign: s.align,
                                    textShadow: '0 2px 20px rgba(0,0,0,0.8)'
                                }}
                            >
                                <p style={{
                                    color: '#FFB800',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.3em',
                                    textTransform: 'uppercase',
                                    marginBottom: 12,
                                }}>
                                    {s.subtitle}
                                </p>
                                <h2 style={{
                                    color: '#ffffff',
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 900,
                                    lineHeight: 1.0,
                                    letterSpacing: '-0.03em',
                                    marginBottom: 20,
                                    fontFamily: 'var(--font-outfit), Outfit, sans-serif',
                                }}>
                                    {s.title}
                                </h2 >
                                <p style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 17,
                                    fontWeight: 300,
                                    lineHeight: 1.65,
                                }}>
                                    {s.body}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress sidebar */}
                <div style={{
                    position: 'absolute',
                    right: 24,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    zIndex: 10,
                }}>
                    {storyScenes.map((_, i) => (
                        <motion.div
                            key={i}
                            style={{ width: 2, borderRadius: 9999, overflow: 'hidden', background: 'rgba(255,255,255,0.12)' }}
                            animate={{ height: i === scene ? 60 : 24 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                style={{ width: '100%', background: 'linear-gradient(180deg, #FF6B1A, #FFB800)' }}
                                animate={{ height: i === scene ? `${Math.round(scenePct * 100)}%` : i < scene ? '100%' : '0%' }}
                                transition={{ duration: 0.08 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
