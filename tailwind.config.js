/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#1c0107',
        'background': '#fff8f9',
        'primary': '#f61945',
        'secondary': '#faa37b',
        'accent': '#f8803f',
       },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
