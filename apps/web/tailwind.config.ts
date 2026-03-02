import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#05070A',
        foreground: '#E5ECF5',
        card: '#0B1220',
        muted: '#93A4BD',
        border: '#1B273A',
        accent: '#3B82F6',
        cyan: '#22D3EE',
        emerald: '#10B981',
        success: '#16A34A'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #2563EB 0%, #22D3EE 52%, #10B981 100%)',
        'mesh-gradient': 'radial-gradient(80% 50% at 0% 0%, rgba(37,99,235,0.35) 0%, transparent 55%), radial-gradient(80% 50% at 100% 0%, rgba(34,211,238,0.25) 0%, transparent 60%), radial-gradient(80% 80% at 50% 100%, rgba(16,185,129,0.18) 0%, transparent 70%)'
      },
      boxShadow: {
        soft: '0 10px 24px rgba(2, 6, 23, 0.36)',
        panel: '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px rgba(2, 6, 23, 0.42)',
        glow: '0 0 0 1px rgba(59,130,246,0.24), 0 0 32px rgba(34,211,238,0.14)'
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        pulseSoft: 'pulseSoft 1.6s ease-in-out infinite',
        floatIn: 'floatIn 0.3s ease-out'
      }
    }
  },
  plugins: []
};

export default config;
