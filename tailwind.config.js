/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'h-lg' : { 'raw': '(min-height: 800px)' },
      },
      fontFamily: { 
        golos: ['Golos Text', 'sans-serif'],
      }, 
      colors: {
        background: '#CDCDCD',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ],
}
