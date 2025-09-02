/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        pastel: {
          pink: '#ffd1dc',
          purple: '#e6e6fa',
          blue: '#b0e0e6',
          green: '#98fb98',
          yellow: '#fffacd',
          orange: '#ffdab9',
        },
        adhd: {
          cream: '#f7e9d7',
          sage: '#d4e4d7',
          lavender: '#e6e6fa',
          peach: '#ffdab9',
          mint: '#f0fff0',
        }
      },
      fontFamily: {
        'manjari': ['Manjari', 'sans-serif'],
        'summer-sun': ['Summer Sun', 'cursive'],
      },
      animation: {
        'blob': 'blob 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        }
      }
    },
  },
  plugins: [],
}
