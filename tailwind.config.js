/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E63946', // Red
          light: '#FF6B6B',
          dark: '#C1121F',
        },
        secondary: {
          DEFAULT: '#FFB703', // Yellow
          light: '#FFCE47',
          dark: '#FB8500', // Orange
        },
        dark: {
          DEFAULT: '#1D1D1D', // Black
          light: '#333333',
          lighter: '#555555',
        },
        light: {
          DEFAULT: '#FFFFFF', // White
          dark: '#F8F9FA',
          darker: '#E9ECEF',
        },
        accent: {
          DEFAULT: '#FB8500', // Orange
          light: '#FFA94D',
          dark: '#E67700',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #E63946 0%, #FB8500 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1D1D1D 0%, #333333 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
      },
    },
  },
  plugins: [],
}; 