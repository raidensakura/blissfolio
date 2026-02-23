/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // Use class strategy for toggle
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist Sans', 'sans-serif'],
                mono: ['Geist Mono', 'monospace'],
            },
        },
    },
    plugins: [],
};
