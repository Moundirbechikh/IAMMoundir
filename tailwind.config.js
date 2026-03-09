/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // On définit nos deux polices ici
          'cartoon': ['Bangers', 'system-ui'],
          'body': ['Fredoka', 'sans-serif'],
          'lobster': ['"Lobster"', 'cursive'],
      'parisienne': ['"Parisienne"', 'cursive'],
      'pacifico': ['"Pacifico"', 'cursive'],
        },
      },
    },
    plugins: [],
  }