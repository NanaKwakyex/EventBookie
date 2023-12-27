/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'orange-500': '#F97316',
        'orange-400': '#FB923C',
        'orange-300': '#FDBA74',
      },
      textColor: {
        'orange-600': '#FF6347', // Define the text color value
        'green-600' : '#38A169'
      },
      fontFamily: {
        'proxima-nova': ['Proxima Nova', 'sans-serif'],
      }
    },
  },
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.js",
  ],
  plugins: [],
}

