import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                maza: {
                    mango: '#FF6B1A',
                    orange: '#FF8C00',
                    gold: '#FFB800',
                    red: '#E53E3E',
                    lime: '#7CFC00',
                    green: '#228B22',
                    purple: '#6B21A8',
                    dark: '#0A0A0A',
                },
            },
        },
    },
    plugins: [],
}
export default config
