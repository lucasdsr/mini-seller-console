import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class', // Habilita o modo dark baseado em classes
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a073fa',
          light: '#f2e7ef'
        },
        secondary: {
          DEFAULT: '#fcfcfa',
          dark: '#f2e7ef'
        },
        tertiary: {
          DEFAULT: '#f2e7ef',
          dark: '#a073fa'
        }
      }
    }
  },
  plugins: [flowbite]
}
