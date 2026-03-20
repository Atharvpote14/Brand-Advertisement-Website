import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-outfit',
})

export const metadata: Metadata = {
    title: 'Smoodh by Atharv Agro — Real Fruit. Real Juice.',
    description: 'Experience the cinematic world of Smoodh — premium mango juice crafted by Atharv Agro with real fruit goodness in every sip.',
    keywords: ['Smoodh', 'Atharv Agro', 'Mango Juice', 'Premium Beverage', 'Real Fruit Juice'],
    openGraph: {
        title: 'Smoodh by Atharv Agro',
        description: 'Real Fruit. Real Juice. Real Smoodh.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className="font-outfit antialiased">{children}</body>
        </html>
    )
}
