/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray:{
          DEFAULT:"#8D8D8D",
          100:"#B3B3B3",
          200:"#808080",
          300:"#424242"
        },
        blue:"#0000FF",
        yellow: "#FFA500"
      }
    },
  },
  plugins: [],
}

