import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32', // For main elements like buttons and headlines
          light: '#66BB6A', // For hover states or lighter backgrounds
          dark: '#1B5E20', // For text on dark backgrounds or footers
        },
        secondary: {
          DEFAULT: '#FFB300', // For accent elements like notifications, badges, etc.
          light: '#FFE082', // For highlights or hover effects
          dark: '#FF8F00', // For alerts or warnings
        },
        background: {
          light: '#F1F8E9', // Light background for the main content
          dark: '#C8E6C9', // Slightly darker background for sections
          DEFAULT: '#FFFFFF', // Default background (e.g., input fields, cards)
        },
        text: {
          primary: '#1B5E20', // Main text color (headlines, primary content)
          secondary: '#4E342E', // Subtext color (paragraphs, secondary info)
          light: '#FFFFFF', // Text on dark backgrounds or buttons
        },
        border: {
          DEFAULT: '#C5E1A5', // Border color for inputs, cards, etc.
          focus: '#81C784', // Border color on focus/hover
        },
        button: {
          bg: '#388E3C', // Default button background
          hover: '#2E7D32', // Button hover state
          text: '#FFFFFF', // Button text color
        },
        link: {
          DEFAULT: '#1976D2', // For links in content
          hover: '#1565C0', // Link hover color
        },
      },
      fontSize: {
        // Font sizes for headings and paragraphs
        h1: ['2.5rem', { lineHeight: '3rem' }], // 40px for mobile
        h2: ['2rem', { lineHeight: '2.5rem' }], // 32px for mobile
        h3: ['1.75rem', { lineHeight: '2.25rem' }], // 28px for mobile
        p: ['1rem', { lineHeight: '1.75rem' }], // 16px for mobile

        // Large screen font sizes
        'h1-lg': ['3.5rem', { lineHeight: '4rem' }], // 56px for large screens
        'h2-lg': ['3rem', { lineHeight: '3.5rem' }], // 48px for large screens
        'h3-lg': ['2.25rem', { lineHeight: '2.75rem' }], // 36px for large screens
        'p-lg': ['1.125rem', { lineHeight: '2rem' }], // 18px for large screens
      },
      // tailwind.config.js
      backgroundImage: {
        'gradient-heading':
          'linear-gradient(to right, #2E7D32, #66BB6A, #FFB300)', // More distinct colors
      },

      animation: {
        'button-hover': 'hoverEffect 1s ease-in-out', // Button hover animation
      },
      keyframes: {
        hoverEffect: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'neomorphic': '5px 5px 10px #c3c9c4, -5px -5px 10px #ffffff',
        'neomorphic-inset': 'inset 3px 3px 6px #000000, inset -3px -3px 6px #ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
