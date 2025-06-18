/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sora: ['var(--font-sora)'],
                inter: ['var(--font-inter)'],
            },
        },
    },
    plugins: [],
};
