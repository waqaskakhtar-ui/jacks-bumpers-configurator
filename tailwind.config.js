/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050608',
          900: '#0A0B0D',
          850: '#0F1115',
          800: '#14171D',
          700: '#1D212A',
          600: '#2A303C',
          500: '#3D4554',
          400: '#647087',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#F1F5F9'
        },
        steel: {
          dark: '#161920',
          metal: '#262B36',
          specular: '#3E4657',
          light: '#8893A6'
        },
        safety: {
          amber: '#F59E0B',
          orange: '#FF5E1E',
          glow: 'rgba(245, 158, 11, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
        'glow-amber': '0 0 35px -5px rgba(245, 158, 11, 0.4)',
        'glow-led': '0 0 60px 15px rgba(254, 240, 138, 0.8)'
      }
    },
  },
  plugins: [],
}
