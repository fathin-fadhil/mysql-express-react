/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      'customDesktopBp': '1400px',
      'maxSm': {'max': '768px'}
    }
  },
  plugins: [],
})
