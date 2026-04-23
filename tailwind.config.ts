import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        bone: '#F2ECE2',
        ink: '#1F1F1F',
        graphite: '#3A3A3A',
        mist: '#8A8275',
        gold: '#C9A96E',
        terracotta: '#B9674E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      transitionTimingFunction: {
        quiet: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
