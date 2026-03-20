'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let dotX = 0, dotY = 0
        let ringX = 0, ringY = 0
        let isHovering = false
        let animFrame: number

        const onMouseMove = (e: MouseEvent) => {
            dotX = e.clientX
            dotY = e.clientY
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hoverable')
            ) {
                isHovering = true
            }
        }

        const onMouseOut = () => {
            isHovering = false
        }

        const animate = () => {
            const speed = isHovering ? 0.08 : 0.12

            ringX += (dotX - ringX) * speed
            ringY += (dotY - ringY) * speed

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
                dotRef.current.style.width = isHovering ? '16px' : '8px'
                dotRef.current.style.height = isHovering ? '16px' : '8px'
            }

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
                ringRef.current.style.width = isHovering ? '64px' : '40px'
                ringRef.current.style.height = isHovering ? '64px' : '40px'
                ringRef.current.style.opacity = isHovering ? '0.8' : '0.6'
            }

            animFrame = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseover', onMouseOver)
        window.addEventListener('mouseout', onMouseOut)
        animFrame = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', onMouseOver)
            window.removeEventListener('mouseout', onMouseOut)
            cancelAnimationFrame(animFrame)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}
