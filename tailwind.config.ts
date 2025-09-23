import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      colors: {
        // Light theme
        background: '#FEFEFE',
        foreground: '#000000',
        card: 'rgba(255, 255, 255, 0.8)',
        popover: 'rgba(255, 255, 255, 0.95)',
        primary: '#6B3E52',
        'primary-foreground': '#FFFFFF',
        secondary: '#0F0520',
        'secondary-foreground': '#FFFFFF',
        muted: 'rgba(107, 62, 82, 0.1)',
        'muted-foreground': 'rgba(0, 0, 0, 0.7)',
        accent: '#F97316',
        'accent-foreground': '#000000',
        destructive: '#7A1A1A',
        border: 'rgba(107, 62, 82, 0.2)',
        input: 'rgba(255, 255, 255, 0.8)',
        ring: 'rgba(107, 62, 82, 0.3)',
        'glass-primary': 'rgba(107, 62, 82, 0.1)',
        'glass-secondary': 'rgba(15, 5, 32, 0.1)',
        'glass-accent': 'rgba(249, 115, 22, 0.1)',
        'glass-border': 'rgba(107, 62, 82, 0.2)',
        'line-primary': '#6B3E52',
        'line-secondary': '#0F0520',
        'line-accent': '#F97316',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
