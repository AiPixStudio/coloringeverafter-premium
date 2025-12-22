
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['Josefin Sans', 'sans-serif'],
        signature: ['Allura', 'cursive'],
      },
      colors: {
        mint: '#B2F7EF',
        peach: '#FFDAC1',
        cloud: '#F7F9FC',
        lavender: '#E2CFFF',
      }
    },
  },
  plugins: [],
}
