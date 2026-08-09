/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#fff9ee',
        'surface-dim': '#e0d9cd',
        'surface-container-low': '#faf3e6',
        'surface-container': '#f4ede0',
        'surface-container-high': '#eee7db',
        'surface-variant': '#eee7db',
        'on-surface': '#1e1b14',
        'on-surface-variant': '#3f484a',
        'primary': '#004349',
        'on-primary': '#ffffff',
        'primary-container': '#0d5c63',
        'secondary-container': '#ffbe4f',
        'on-secondary-container': '#724d00',
        'tertiary': '#741a06',
        'tertiary-container': '#f4785c',
        'outline-variant': '#bfc8c9',
      },
      fontFamily: {
        headline: ['Domine', 'serif'],
        body: ['Karla', 'sans-serif'],
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px 0px #004349',
        'hard': '4px 4px 0px 0px #004349',
        'hard-lg': '6px 6px 0px 0px #004349',
      }
    },
  },
  plugins: [],
}