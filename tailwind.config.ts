import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF6F00',
        'primary-blue': '#1E88E5',
        'dark-bg': '#121212',
        'dark-grey': '#1A1A1A',
        'text-primary': '#212121',
        'text-secondary': '#757575',
        'text-light': '#E0E0E0',
        'bg-light': '#FAFAFA',
        'bg-white': '#FFFFFF',
        'border-light': '#E0E0E0',
      },
      animation: {
        'message-slide': 'messageSlideIn 0.3s ease-out',
        'loading-bounce': 'loadingBounce 1.4s ease-in-out infinite both',
      },
      keyframes: {
        messageSlideIn: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        loadingBounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' }
        }
      },
      boxShadow: {
        'pro': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'pro-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
