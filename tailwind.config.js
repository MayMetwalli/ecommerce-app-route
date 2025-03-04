/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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

