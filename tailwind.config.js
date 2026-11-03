/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102A36',
          900: '#0B1D26',
          800: '#102A36',
          700: '#153646',
          600: '#1A4356',
        },
        ocean: {
          DEFAULT: '#1E5365',
          light: '#2A728B',
          dark: '#143C49',
        },
        brandOrange: {
          DEFAULT: '#F47A38',
          hover: '#E06928',
          light: '#FFF2EB',
          50: '#FFF7F2',
          100: '#FFEEDE',
        },
        cream: {
          DEFAULT: '#FFFDF8',
          50: '#FFFFFF',
          100: '#FFFDF8',
          200: '#FAF6EE',
        },
        sand: {
          DEFAULT: '#F5EBDD',
          light: '#FAF3EA',
          dark: '#E7D8C4',
        },
        waGreen: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
          dark: '#128C7E',
          light: '#DCF8C6',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Bricolage Grotesque', 'sans-serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'coastal': '0 10px 30px -10px rgba(16, 42, 54, 0.12)',
        'coastal-lg': '0 20px 40px -15px rgba(16, 42, 54, 0.2)',
        'orange-glow': '0 10px 25px -5px rgba(244, 122, 56, 0.4)',
        'wa-glow': '0 8px 24px -4px rgba(37, 211, 102, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};

