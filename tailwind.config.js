/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // FluxDevs palette
        primary: '#2176ff',
        navy: '#001A52',
        dark: '#1a1a1a',
        light: '#f7fafd',
        muted: '#E7EBEF',
        accent: '#F7A400',
      },
      fontFamily: {
        euclid: ['Euclid Circular A', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
      },
      boxShadow: {
        card: '0 8px 32px 0 rgba(20, 20, 43, 0.08)',
        nav: '0 2px 16px 0 rgba(20, 20, 43, 0.06)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

