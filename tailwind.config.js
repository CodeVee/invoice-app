/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFFFF'
    },
    extend: {},
  },
  plugins: ['@tailwindcss/forms'],
  darkMode: 'class'
}
