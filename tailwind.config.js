/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    container:{
      center: true,
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

