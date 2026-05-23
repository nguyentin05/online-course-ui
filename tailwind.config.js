/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          light: '#818cf8',
          dark: '#3730a3',
        },
        'bg-subtle': '#f9fafb',
      }
    },
  },
  plugins: [],
}

