import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        foreground: '#0F172A',
        card: '#FFFFFF',
        muted: '#64748B',
        accent: '#2563EB',
        success: '#16A34A'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2, 6, 23, 0.06)'
      }
    }
  },
  plugins: []
};

export default config;
