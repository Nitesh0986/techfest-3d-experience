/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712',
        cyber: {
          blue: '#00f0ff',
          violet: '#8a2be2',
          purple: '#b026ff',
          cyan: '#00ffff',
          neon: '#39ff14',
          dark: '#070b19',
          card: 'rgba(10, 16, 38, 0.75)',
          border: 'rgba(0, 240, 255, 0.2)'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'neon-purple': '0 0 25px rgba(176, 38, 255, 0.45)',
        'neon-glow': '0 0 35px rgba(0, 240, 255, 0.25), inset 0 0 15px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
