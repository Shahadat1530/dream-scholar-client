/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#061013',
        'background': '#ffffff',
        'primary': '#2fa2ee',
        'secondary': '#9980ff',
        'accent': '#43cbf4',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
