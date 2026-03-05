/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        gold: {
          500: "#D4AF37",
          600: "#C19B2E",
        },
        charcoal: "#1A1A1A",
        "charcoal-light": "#2D2D2D",
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
      },
    },
  },
  
  plugins: [require("tailwind-scrollbar-hide")],
}