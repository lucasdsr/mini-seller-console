import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class', // Habilita o modo dark baseado em classes
  theme: {},
  plugins: [flowbite]
}
