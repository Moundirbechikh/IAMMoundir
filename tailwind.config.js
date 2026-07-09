/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cartoon': ['Bangers', 'system-ui'],
        'body': ['Fredoka', 'sans-serif'],
        'lobster': ['"Lobster"', 'cursive'],
        'parisienne': ['"Parisienne"', 'cursive'],
        'pacifico': ['"Pacifico"', 'cursive'],
        // LES NOUVELLES POLICES POUR LE HERO
        'syne': ['"Syne"', 'sans-serif'],
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        'wave-subtil': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        'wave-subtil': 'wave-subtil 4s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
