/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                spiderman: {
                    red: '#E23636',
                    blue: '#005A9C',
                    dark: '#1B1B1B',
                    softRed: '#FF8A8A',
                    softBlue: '#82B1FF',
                    softDark: '#1A1A2E',
                },
                barbie: {
                    pink: '#E0218A',
                    lightPink: '#FF69B4',
                    gold: '#D4AF37',
                    softPink: '#FFB6C1',
                    softLightPink: '#FFF5F7', // Even lighter pink
                },
                pastel: {
                    blue: '#F0F9FF', // Lighter blue
                    lavender: '#F5F3FF', // Lighter lavender
                    white: '#FFFFFF',
                    yellow: '#FEFCE8',
                    peach: '#FFF7ED', // Lighter peach
                    mint: '#F0FDFA', // Lighter mint
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                cursive: ['"Dancing Script"', 'cursive'],
                hero: ['"Bangers"', 'cursive'], // Spiderman-like font
                glam: ['"Pacifico"', 'cursive'], // Barbie-like font
            },
        },
    },
    plugins: [],
}
