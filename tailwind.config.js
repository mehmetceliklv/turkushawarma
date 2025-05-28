/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#E34F33',
        'terracotta-dark': '#C4402A',
        beige: '#F1E4C3',
        darkBlue: '#235789',
        gold: '#F7B801',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-delay': 'fadeIn 1s ease-in-out 0.3s forwards',
        'fade-in-delay-2': 'fadeIn 1s ease-in-out 0.6s forwards',
        'scroll': 'scroll 2s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scroll: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};