import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: {
          light: '#ADD8E6',
          dark: '#5DADE2',
        },
        background: {
          light: '#F5F9FF',
          dark: '#1B1E23',
        },
        card: {
          light: '#FAFCFF',
          dark: '#2C2F33',
        },
        content: {
          light: '#2C3E50',
          dark: '#D1D5DB',
        },
        subtle: {
          light: '#6C757D',
          dark: '#A0AEC0',
        },
        highlight: '#32CD32',
        border: {
          light: '#B0C4DE',
          dark: '#3B3F44',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out 0.2s both',
        slideUp: 'slideUp 0.5s ease-out 0.3s both',
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(circle at center, rgba(173, 216, 230, 0.15) 0%, rgba(240, 248, 255, 0.05) 70%)',
        'radial-dark': 'radial-gradient(circle at center, rgba(93, 173, 226, 0.05) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;