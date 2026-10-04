/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sanity: {
          red: '#F03E2F',
          dark: '#111317',
          surface: '#1A1D23',
          border: '#2A2E39',
          accent: '#0F70F0',
        },
      },
    },
  },
  plugins: [],
};
